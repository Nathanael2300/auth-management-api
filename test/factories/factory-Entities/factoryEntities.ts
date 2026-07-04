import { faker } from "@faker-js/faker";

import { User } from "../../../src/domain/entities/user.ts";
import { Email } from "../../../src/domain/value-objects/Email.ts";
import { Password } from "../../../src/domain/value-objects/Password.ts";

import { UserFactoryDTO } from "../../dtos/user.factory.dto.ts";

export const newUser = ({
  id = faker.string.uuid(),
  name = faker.person.fullName(),
  email = faker.internet.email(),
  password = "Password1!",
  createdAt = faker.date.recent(),
}: UserFactoryDTO = {}) => {
  return new User(
    id,
    name,
    new Email(email),
    new Password(password),
    createdAt,
  );
};
