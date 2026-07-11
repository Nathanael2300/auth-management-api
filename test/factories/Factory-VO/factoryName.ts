import { faker } from "@faker-js/faker";

export function factoryName() {
  return faker.person.fullName();
}
