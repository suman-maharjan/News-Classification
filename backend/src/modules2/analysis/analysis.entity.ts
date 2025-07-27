import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user/user.entity";

@Entity("text_analysis")
export class TextAnalysis {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "input_text" })
  inputText: string;

  @Column()
  result: string;

  @ManyToOne(() => User, (user) => user.texts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}
