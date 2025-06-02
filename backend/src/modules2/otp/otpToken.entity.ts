import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum OtpTypeEnum {
  "VERIFY_EMAIL" = "verify_email",
  "RESET_PASSWORD" = "reset_password",
}

@Entity("otp_token")
export class OtpToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  token: number;

  @Column({
    type: "enum",
    enum: OtpTypeEnum,
    array: false,
  })
  type: OtpTypeEnum;

  @Column({ type: "timestamp" })
  tokenExpiry: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
