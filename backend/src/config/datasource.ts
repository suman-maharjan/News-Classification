import { DataSource } from "typeorm";
import {
  POSTGRES_DATABASE_HOST,
  POSTGRES_DATABASE_NAME,
  POSTGRES_DATABASE_PASSWORD,
  POSTGRES_DATABASE_PORT,
  POSTGRES_DATABASE_USER,
} from "../constants/envConstants";
import { OtpToken } from "../modules2/otp/otpToken.entity";
import { User } from "../modules2/user/user.entity";
import { TextAnalysis } from "../modules2/analysis/analysis.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_DATABASE_HOST,
  port: POSTGRES_DATABASE_PORT,
  username: POSTGRES_DATABASE_USER,
  password: POSTGRES_DATABASE_PASSWORD,
  database: POSTGRES_DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [User, OtpToken, TextAnalysis],
  subscribers: [],
  migrations: [],
});

export const initPostgresDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Postgres Database Connected!!");
  } catch (error) {
    console.log(`Postgres Database Connection Error:`, error);
  }
};
