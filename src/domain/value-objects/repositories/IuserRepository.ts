import { User } from "../../entities/user";

export interface IUserRepository {
  getAll(user: User): Promise<User[]>;

  getById(id: string): Promise<User | null>;

  create(user: User): Promise<void>;

  update(id: string, user: User): Promise<void>;

  delete(id: string): Promise<void>;
}
