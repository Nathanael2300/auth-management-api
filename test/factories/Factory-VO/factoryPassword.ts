import { faker } from "@faker-js/faker";

type PasswordProps = {
  length?: number;
};

export function factoryPassword({ length = 12 }: PasswordProps = {}) {
  const required = "A1@";

  return required + faker.string.alphanumeric(length - required.length);
}
