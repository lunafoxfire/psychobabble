import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn,
  getRepository
} from "typeorm";
import { Role, RoleName } from "./Role";
import { Playlist } from "./Playlist";
import { ProgramRequest } from "./ProgramRequest";
import { Program } from "./Program";
import { Response } from "./Response";
import { Token } from "./Token";
import * as sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
import { randomBytes, pbkdf2Sync } from 'crypto';
import * as jwt from 'jsonwebtoken';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  normalized_username: string;

  @Column({nullable: true})
  email: string;

  @Column({nullable: true})
  normalized_email: string;

  @Column()
  salt: string;

  @Column()
  hash: string;

  @Column({type: 'bigint'})
  date_created: number;

  @ManyToOne(type => Role, role => role.users, {eager: true})
  role: Role;

  @OneToMany(type => Playlist, playlists => playlists.user)
  playlists: Playlist[];

  @OneToMany(type => ProgramRequest, programRequests => programRequests.user)
  programRequests: ProgramRequest[];

  @OneToMany(type => Program, programsMade => programsMade.user)
  programsMade: Program[];

  @OneToMany(type => Program, programsUsed => programsUsed.user)
  programsUsed: Program[];

  @OneToMany(type => Response, responses => responses.user)
  responses: Response[];

  @OneToOne(type => Token)
  @JoinColumn()
  token: Token;

  @Column()
  validated: boolean;

  // Registers new user
  // TODO: Return some results object with more info on failures
  public static async registerAsync(regOptions: UserRegistrationOptions): Promise<User> {
    let userRepo = getRepository(User);
    let usernameTaken = await User.findByEmailAsync(regOptions.username);
    let emailTaken = await User.findByEmailAsync(regOptions.email);
    if (!usernameTaken && !emailTaken) {
      let user = new User();
        user.username = regOptions.username;
        user.normalized_username = User.normalizeField(user.username);
        user.email = regOptions.email;
        user.normalized_email = User.normalizeField(user.email);
        user.salt = User.genSalt();
        user.hash = User.hashPassword(regOptions.password, user.salt);
        user.date_created = new Date().getTime();
        user.role = await Role.findByNameAsync(regOptions.roleName);
        user.validated = regOptions.preValidated || false;
      await userRepo.save(user);
      if (!user.validated) {
        user.token = await Token.generateTokenAsync();
        user.sendTokenMail();
      }
      return user;
    }
    else {
      return null;
    }
  }

  public static async registerAdminAsync(username: string, email: string, password: string): Promise<User> {
    return User.registerAsync({
      username: username,
      email: email,
      password: password,
      roleName: RoleName.Admin
    });
  }

  public static async registerClientAsync(username: string, email: string, password: string): Promise<User> {
    return User.registerAsync({
      username: username,
      email: email,
      password: password,
      roleName: RoleName.Client
    });
  }

  public static async registerSubjectAsync(username: string, email: string, password: string): Promise<User> {
    return User.registerAsync({
      username: username,
      email: email,
      password: password,
      roleName: RoleName.Subject
    });
  }

  public static async generateDefaultAdminIfNoAdminAsync(): Promise<User> {
    let adminRole = await Role.findByNameAsync(RoleName.Admin);
    let adminExists = await getRepository(User).findOne({role: adminRole.id}); // Ignore this type error. TypeORM apparently has some "quirks".
    if (adminExists) {
      return null;
    }
    else {
      return User.generateDefaultAdminAsync();
    }
  }

  public static async generateDefaultAdminAsync(): Promise<User> {
    return User.registerAsync({
      username: process.env.DEFAULT_ADMIN_USERNAME,
      email: null,
      password: process.env.DEFAULT_ADMIN_PASSWORD,
      roleName: RoleName.Admin,
      preValidated: true
    });
  }

  public sendTokenMail() {
    let msg = {
      to: this.email,
      from: process.env.NOREPLY_EMAIL,
      subject: 'Account Activation',
      html: `Please enter this code: ${this.token.code}`,
    };
    sgMail.send(msg).catch((err) => {
      console.log(err);
    })
  }

  public validateLogin(password: string): boolean {
    return User.hashPassword(password, this.salt) == this.hash;
  }

  public generateJwt() {
    let expiration = new Date();
    expiration.setDate(expiration.getDate() + 7); // Expire in one week
    return jwt.sign({
      id: this.id,
      username: this.username,
      email: this.email,
      role: this.role.name,
      validated: this.validated,
      exp: expiration.getTime() / 1000
    }, process.env.JWT_SECRET);
  }

  // Finds a user by username accounting for normalization
  public static async findByUsernameAsync(username: string): Promise<User> {
    return getRepository(User).findOne({normalized_username: User.normalizeField(username)});
  }

  // Finds a user by email accounting for normalization
  public static async findByEmailAsync(email: string): Promise<User> {
    return getRepository(User).findOne({normalized_email: User.normalizeField(email)});
  }

  // Finds a user by username or email for login puposes
  public static async findByLoginNameAsync(loginName: string): Promise<User> {
    let userByName = await User.findByUsernameAsync(loginName);
    let userByEmail = await User.findByEmailAsync(loginName);
    return (userByName || userByEmail);
  }

  private static genSalt(): string {
    return randomBytes(16).toString('hex');
  }

  private static hashPassword(password: string, salt: string): string {
    return pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  }

  private static normalizeField(field: string): string {
    return field.toUpperCase();
  }
}

interface UserRegistrationOptions {
  username: string;
  email: string;
  password: string;
  roleName: RoleName;
  preValidated?: boolean;
}
