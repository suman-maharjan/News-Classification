import UserModel, { UserDocument } from "./user.model";
import { User, UserRepository } from "./user.types";

export class MongooseUserRepository implements UserRepository {
  private toDomain(doc: UserDocument): User {
    if (!doc?._id) {
      return null;
    }
    return {
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      password: doc.password,
      roles: doc.roles,
      isActive: doc.isActive,
      created_at: doc.created_at,
      updated_at: doc.updated_at,
      isEmailVerified: doc.isEmailVerified,
      interests: doc.interests,
      accessToken: doc.accessToken,
      refreshToken: doc.refreshToken,
    };
  }

  async checkUserIdActiveAndVerified(id: string) {
    const exists = await UserModel.exists({
      _id: id,
      isActive: true,
      isEmailVerified: true,
    });
    return !!exists;
  }
  async getActiveUserById(id: string) {
    const doc = await UserModel.findOne({ _id: id });
    return this.toDomain(doc);
  }
  async getUserByEmail(email: string) {
    const doc = await UserModel.findOne({ email });
    return this.toDomain(doc);
  }
  async getUserById(id: string) {
    const doc = await UserModel.findOne({ _id: id });
    return this.toDomain(doc);
  }
  async getActiveUserByEmail(email: string) {
    const doc = await UserModel.findOne({ email, isActive: true });
    return this.toDomain(doc);
  }
  async getNonVerifiedUserByEmail(email: string) {
    const doc = await UserModel.findOne({ email, isEmailVerified: false });
    return this.toDomain(doc);
  }
  async getUserWithPasswordByEmail(email: string) {
    const doc = await UserModel.findOne({ email }).select("+password");
    return this.toDomain(doc);
  }

  async createUser(payload: {
    email: string;
    password: string;
    name: string;
    interests: string[];
    isEmailVerified: boolean;
  }) {
    const doc = await UserModel.create(payload);
    return this.toDomain(doc);
  }

  async updateEmailVerifiedByUser(email: string, isEmailVerified: boolean) {
    const doc = await UserModel.findOneAndUpdate(
      { email },
      { isEmailVerified },
      { new: true },
    );
    return this.toDomain(doc);
  }

  async updateUserPasswordByEmail(email: string, password: string) {
    const doc = await UserModel.findOneAndUpdate(
      { email },
      { password },
      { new: true },
    );
    return this.toDomain(doc);
  }
  async updateAccessRefreshToken(
    email: string,
    accessToken: string,
    refreshToken: string,
  ) {
    await UserModel.findOneAndUpdate({ email }, { accessToken, refreshToken });
  }
}
