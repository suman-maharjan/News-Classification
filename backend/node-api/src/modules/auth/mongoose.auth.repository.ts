import AuthModel from "./auth.model";
import { Auth, AuthRepository } from "./auth.type";

export class MongooseAuthRepository implements AuthRepository {
  private toDomain(doc: any): Auth {
    return {
      id: doc._id.toString(),
      email: doc.email,
      otp: doc.otp,
      tokenExpiry: doc.token_expiry,
      createdAt: doc.created_at,
      updatedAt: doc.updated_at,
    };
  }
  async getOtpByEmail(email: string) {
    const doc = await AuthModel.findOne({
      email,
    });
    if (!doc) {
      return null;
    }
    return this.toDomain(doc);
  }
  async getValidOtpByEmail(email: string) {
    const doc = await AuthModel.findOne({
      email: email,
      token_expiry: { gt: new Date() },
    });
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async createOtp(email: string, otp: number, token_expiry: Date) {
    const doc = await AuthModel.create({ email, otp, token_expiry });
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async updateOtpByEmail(email: string, otp: number, token_expiry: Date) {
    const doc = await AuthModel.findOneAndUpdate(
      { email },
      {
        otp,
        token_expiry,
      },
      { new: true },
    );
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async deleteOtpByEmail(email: string) {
    const result = await AuthModel.deleteOne({ email });
    return result.deletedCount == 1;
  }
  async deleteOtpsByEmail(email: string) {
    const result = await AuthModel.deleteMany({ email });
    return result.deletedCount;
  }
}
