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

import { randomBytes, pbkdf2Sync } from 'crypto';
import * as jwt from 'jsonwebtoken';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  normalized_email: string;

  @Column()
  salt: string;

  @Column()
  hash: string;

  @Column({ nullable: true})
  company_name: string;

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

  // Registers new client user
  public static async registerClientAsync(email: string, password: string, company_name: string = null): Promise<User> {
    let userRepo = getRepository(User);
    let userExists = await User.findByEmailAsync(email);
    if (!userExists) {
      let user = new User();
      user.email = email;
      user.normalized_email = User.normalizeEmail(email);
      user.salt = User.genSalt();
      user.hash = User.hashPassword(password, user.salt);
      user.date_created = new Date().getTime();
      user.company_name = company_name;
      user.role = await Role.findByNameAsync(RoleName.Client);

      await userRepo.save(user);
      return user;
    }
    else {
      return null;
    }
  }

  public validateLogin(password: string): boolean {
    return User.hashPassword(password, this.salt) == this.hash;
  }

  public generateJwt() {
    let expiration = new Date();
    expiration.setDate(expiration.getDate() + 7); // Expire in one week
    return jwt.sign({
      id: this.id,
      email: this.email,
      role: this.role.name,
      exp: expiration.getTime() / 1000
    }, process.env.JWT_SECRET);
  }

  // Finds a user by email accounting for normalization
  public static async findByEmailAsync(email: string): Promise<User> {
    return getRepository(User).findOne({normalized_email: User.normalizeEmail(email)});
  }

  private static genSalt(): string {
    return randomBytes(16).toString('hex');
  }

  private static hashPassword(password: string, salt: string): string {
    return pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  }

  private static normalizeEmail(email: string): string {
    return email.toUpperCase();
  }
}
