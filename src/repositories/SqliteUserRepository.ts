import { User } from "../domain/entities/user";
import { Name } from "../domain/value-objects/Name";
import { Email } from "../domain/value-objects/Email";
import { Password } from "../domain/value-objects/Password";
import type { IUserRepository } from "../domain/value-objects/repositories/IuserRepository";
import { db } from "../infra/repositories/database";

export class SqliteUserRepository implements IUserRepository {
  async getAll(): Promise<User[]> {
    const users = db.query(`SELECT * FROM users`).all();
    return users as User[];
  }

  async getById(id: string): Promise<User | null> {
    const user = db.query(`SELECT * FROM Users WHERE ID = ?`).get(id) as any;

    if (!user) {
      return null;
    }

    return new User(
      user.id,
      new Name(user.name),
      new Email(user.email),
      new Password(user.password),
      new Date(user.created_at),
    );
  }

  async create(user: User): Promise<void> {
    db.query(
      `
    INSERT INTO Users (
      id,
      name,
      email,
      password,
      created_at
    )
    VALUES (?, ?, ?, ?, ?)
  `,
    ).run(
      user._id,
      user._name.getValue(),
      user._email.getValue(),
      user._password.getValue(),
      user._createdAt.toISOString(),
    );
  }

  async update(id: string, userData: User): Promise<void> {
    db.query(`UPDATE Users set name=?, email=?, password=?, created_at=?`).run(
      id,
      userData._name.getValue(),
      userData._email.getValue(),
      userData._password.getValue(),
      userData._createdAt.toISOString(),
    );
  }

  async delete(id: string): Promise<void> {
    db.query(`DELETE FROM Users WHERE id = ?`).run(id);
  }
}
