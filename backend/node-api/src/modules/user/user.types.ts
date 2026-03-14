import { MongooseUserRepository } from "./mongoose.user.repository";

export enum RoleEnum {
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: RoleEnum[];
  isActive: boolean;
  created_at: Date;
  updated_at: Date;
  isEmailVerified: boolean;
  interests: string[];
  accessToken?: string;
  refreshToken?: string;
}

export interface UserRepository {
  checkUserIdActiveAndVerified(id: string): Promise<boolean>;
  getActiveUserById(id: string): Promise<User | null>;
  getUserByEmail(id: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
  getActiveUserByEmail(id: string): Promise<User | null>;
  getNonVerifiedUserByEmail(id: string): Promise<User | null>;
  getUserWithPasswordByEmail(id: string): Promise<User | null>;
  createUser(payload: {
    email: string;
    password: string;
    name: string;
    interests: string[];
    isEmailVerified: boolean;
  }): Promise<User | null>;
  updateEmailVerifiedByUser(
    email: string,
    isEmailVerified: boolean,
  ): Promise<User | null>;
  updateUserPasswordByEmail(
    email: string,
    password: string,
  ): Promise<User | null>;
  updateAccessRefreshToken(
    email: string,
    accessToken: string,
    refreshToken: string,
  ): Promise<void>;
}

export const userRepository = new MongooseUserRepository();
