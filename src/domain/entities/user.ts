import { Email } from "../value-objects/Email";
import { Password } from "../value-objects/Password";
import { Name } from "../value-objects/Name";

export class User {
  constructor(
    public readonly id: string,
    public name: Name,
    public email: Email,
    public password: Password,
    public readonly createdAt: Date,
  ) {}

  get _id(): string {
    return this.id;
  }

  get _name(): Name {
    return this.name;
  }

  get _email(): Email {
    return this.email;
  }

  get _password(): Password {
    return this.password;
  }

  get _createdAt(): Date {
    return this.createdAt;
  }
}
