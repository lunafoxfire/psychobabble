import { Repository, getRepository } from 'typeorm';
import { User } from './../models/User';
import { RoleType } from './../models/Role';
import { ValidationToken } from './../models/ValidationToken';
import { PassResetToken } from './../models/PassResetToken';
import { UserService } from './user.service';
import { RoleService } from './role.service';
import { randomBytes } from 'crypto';
import * as sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export interface AuthServiceDependencies {
  validationTokenRepo: Repository<ValidationToken>;
  passResetTokenRepo: Repository<PassResetToken>;
  userService: UserService;
  roleService: RoleService;
}

export class AuthService {
  private validationTokenRepo: Repository<ValidationToken>;
  private passResetTokenRepo: Repository<PassResetToken>;
  private userService: UserService;
  private roleService: RoleService;

  constructor (dependencies: AuthServiceDependencies = null) {
    this.validationTokenRepo = dependencies ? dependencies.validationTokenRepo : getRepository(ValidationToken);
    this.passResetTokenRepo = dependencies ? dependencies.passResetTokenRepo : getRepository(PassResetToken);
    this.userService = dependencies ? dependencies.userService : new UserService();
    this.roleService = dependencies ? dependencies.roleService : new RoleService();
  }

  /** Registers a new User to the database. */
  // TODO: Return some results object with more info on failures (taken username, etc.)
  public async registerAsync(regOptions: UserRegistrationOptions): Promise<User> {
    let usernameTaken = await this.userService.findByEmailAsync(regOptions.username);
    let emailTaken = await this.userService.findByEmailAsync(regOptions.email);
    if (!usernameTaken && !emailTaken) {
      let user = new User();
        user.username = regOptions.username;
        user.normalized_username = User.normalizeField(user.username);
        user.email = regOptions.email;
        user.normalized_email = User.normalizeField(user.email);
        user.salt = User.genSalt();
        user.hash = User.hashPassword(regOptions.password, user.salt);
        user.date_created = new Date().getTime();
        user.role = await this.roleService.findByNameAsync(regOptions.roleType);
        user.validated = regOptions.preValidated || false;
      if (!user.validated) {
        user.validationToken = await this.generateValidTokenAsync();
        this.sendValidationEmail(user);
      }
      await this.userService.saveAsync(user);
      return user;
    }
    else {
      return null;
    }
  }

  /** Registers a new admin to the database. */
  public async registerAdminAsync(username: string, email: string, password: string): Promise<User> {
    return this.registerAsync({
      username: username,
      email: email,
      password: password,
      roleType: RoleType.Admin
    });
  }

  /** Registers a new client to the database. */
  public async registerClientAsync(username: string, email: string, password: string): Promise<User> {
    return this.registerAsync({
      username: username,
      email: email,
      password: password,
      roleType: RoleType.Client
    });
  }

  /** Registers a new subject to the database. */
  public async registerSubjectAsync(username: string, email: string, password: string): Promise<User> {
    return this.registerAsync({
      username: username,
      email: email,
      password: password,
      roleType: RoleType.Subject
    });
  }

  /** Generates the default admin account if no admin account currently exists. */
  public async generateDefaultAdminIfNoAdminAsync(): Promise<User> {
    if (await this.userService.doesAdminExistAsync()) {
      return null;
    }
    else {
      return this.generateDefaultAdminAsync();
    }
  }

  /** Registers the default admin account to the database. */
  public async generateDefaultAdminAsync(): Promise<User> {
    return this.registerAsync({
      username: process.env.DEFAULT_ADMIN_USERNAME,
      email: null,
      password: process.env.DEFAULT_ADMIN_PASSWORD,
      roleType: RoleType.Admin,
      preValidated: true
    });
  }

  public async changePassword(newPass, userId) {
    let user = await this.userService.findByIdAsync(userId);
    if(user.passResetToken.expiration <= new Date().getTime()) {
      return 0;
    } else {
      let newHash = User.hashPassword(newPass, user.salt);
      if(newHash === user.hash) {
        return 1;
      } else {
        user.hash = newHash;
        await this.userService.saveAsync(user);
        return 2;
      }
    }
  }

  /** Generates a new token not yet associated with any User. */
  public async generateValidTokenAsync() {
    let minBeforeExpire = 15;
    let newToken = new ValidationToken();
    newToken.code = randomBytes(3).toString('hex');
    newToken.expiration = new Date().getTime() + (minBeforeExpire * 60 * 1000);
    await this.validationTokenRepo.save(newToken);
    return newToken;
  }

  /** Checks if the code provided matches the user's token. */
  public async checkValidationCode(code: string, userId: string) {
    let currentUser = await this.userService.findByIdAsync(userId);
    if(currentUser.validationToken.code === code && currentUser.validationToken.expiration >= new Date().getTime()) {
      currentUser.validated = true;
      this.userService.saveAsync(currentUser);
      return currentUser;
    } else {
      return currentUser;
    }
  }

  public async generatePassTokenAsync() {
    let minBeforeExpire = 15;
    let newToken = new PassResetToken();
    newToken.code = randomBytes(8).toString('hex');
    newToken.expiration = new Date().getTime() + (minBeforeExpire * 60 * 1000);
    await this.passResetTokenRepo.save(newToken);
    return newToken;
  }

  /** Sends the user an email containing their validation token code. */
  public sendValidationEmail(user: User) {
    console.log(`Sending validation email to ${user.email}`);
    let msg = {
      to: user.email,
      from: process.env.NOREPLY_EMAIL,
      subject: 'Account Activation',
      html: `<h3>Please enter this code: ${user.validationToken.code}<h3>`,
    };
    sgMail.send(msg).catch((err) => {
      console.error(`SendGrid Error: ${err.code} - ${err.message}`);
    });
  }

  public async resendValidationEmail(email) {
    let user = await this.userService.findByEmailAsync(email);
    user.validationToken = await this.generateValidTokenAsync();
    this.sendValidationEmail(user);
  }

  /** Sends the user an email to reset their password if they exist in database */
  public async sendPassResetEmail(email, host) {
    let user = await this.userService.findByEmailAsync(email);
    if(!user) {
      return false;
    } else {
      let url = await this.generateResetUrl(user, host);
      let msg = {
        to: email,
        from: process.env.NOREPLY_EMAIL,
        subject: 'Password Reset',
        html: `
        <h3>Password Reset</h3>
        <p>If you didn't request a password reset, ignore this email</p>
        <br>
        <strong><a href=${url}>Reset your password here</a><strong>
        `
      };
      sgMail.send(msg).catch((err) => {
        console.log(`SendGrid Error: ${err.code} - ${err.message}`);
      });
      return true;
    }
  }

  public async resendPasswordResetEmail(userId, host) {
    let user = await this.userService.findByIdAsync(userId);
    return await this.sendPassResetEmail(user.email, host);
  }

  /** Generates the url to be sent for password reset */
  public async generateResetUrl(user: User, host) {
    user.passResetToken = await this.generatePassTokenAsync();
    await this.userService.saveAsync(user);
    let url = `http://${host}/reset/${user.id}/${user.passResetToken.code}`;
    console.log(url);
    return url;
  }
}

/** All options required to register a new User. */
export interface UserRegistrationOptions {
  /** The User's username. */
  username: string;
  /** The User's email. */
  email: string;
  /** The User's password. */
  password: string;
  /** The User's role. */
  roleType: RoleType;
  /** Whether the user can skip email validation. Optional. */
  preValidated?: boolean;
}
