import { User } from './../models/User';
import { RoleType } from './../models/Role';

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

/** Contains the results of a user registration attempt. */
export class RegistrationResult {
  public succeeded: boolean;
  public failureReason: FailureReason;
  public registeredUser: User;

  constructor(succeeded: boolean, registeredUser: User, failureReason: FailureReason = null) {
    this.succeeded = succeeded;
    this.registeredUser = registeredUser;
    this.failureReason = failureReason;
  }
}

export enum FailureReason {
  BadUsername = "BAD_USERNAME",
  UsernameTaken = "USERNAME_TAKEN",
  BadPassword = "BAD_PASSWORD",
  BadEmail = "BAD_EMAIL",
  EmailTaken = "EMAIL_TAKEN"
}
