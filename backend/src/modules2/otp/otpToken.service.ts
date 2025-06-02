// import { AppDataSource } from "../../../config/datasource";
// import { ApiError } from "../../../utils/ApiError";
import { AppDataSource } from "../../config/datasource";
import { ApiError } from "../../utils/ApiError";
import { OtpToken, OtpTypeEnum } from "./otpToken.entity";
import { TCreateOtpSchema } from "./otpToken.schema";

class OtpTokenService {
  private otpRepository = AppDataSource.getRepository(OtpToken);

  private generateOtpToken() {
    // TODO: STATIC
    return 123456;
  }

  private generateExpiryDate() {
    const tokenExpiry = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiration
    return tokenExpiry;
  }
  async create(payload: TCreateOtpSchema) {
    try {
      const { email, type } = payload;
      const token = this.generateOtpToken();
      const tokenExpiry = this.generateExpiryDate();

      const otpToken = await this.otpRepository.findOne({
        where: { email, type: type as OtpTypeEnum },
      });

      if (otpToken) {
        otpToken.token = token;
        otpToken.tokenExpiry = tokenExpiry;
        return await this.otpRepository.save(otpToken);
      }

      const savedToken = await this.otpRepository.save({
        email,
        token,
        type: type as OtpTypeEnum,
        tokenExpiry,
      });

      return savedToken;
    } catch (error) {
      console.error("Error in OTP creation:", error);
      throw new ApiError(500, "Error generating OTP");
    }
  }

  async get(payload: TCreateOtpSchema) {
    const { email } = payload;

    const savedToken = await this.otpRepository.findOneBy({ email });

    if (!savedToken) {
      throw new ApiError(404, "OTP not found");
    }

    return savedToken;
  }

  async regenerate(payload: TCreateOtpSchema) {
    const otpToken = await this.get(payload);
    const otp = this.generateOtpToken();
    const tokenExpiry = this.generateExpiryDate();
    otpToken.token = otp;
    otpToken.tokenExpiry = tokenExpiry;
    return this.otpRepository.save(otpToken);
  }

  async delete(payload: TCreateOtpSchema) {
    const token = await this.get(payload);
    return this.otpRepository.delete(token.id);
  }
}

export default OtpTokenService;
