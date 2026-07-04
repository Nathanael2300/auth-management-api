import { faker } from "@faker-js/faker";

export function factoryEmail(): string {
  return faker.internet.email({
    provider: "gmail.com",
  });
}
