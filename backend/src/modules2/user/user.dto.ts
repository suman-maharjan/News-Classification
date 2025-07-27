import { RoleEnum } from "../../enum/RoleEnum";
import { User } from "./user.entity";

export class UserResponseDTO {
  id: string;
  name: string;
  username: string;
  email: string;
  role: RoleEnum[];
  isActive: boolean;
  created_at: Date;
  update_at: Date;
  isEmailVerified: boolean;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.isActive = user.isActive;
    this.isEmailVerified = user.isEmailVerified;
  }
}
