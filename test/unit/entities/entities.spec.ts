import { describe, it } from "bun:test";
import { expect } from "chai";

import { User } from "../../../src/domain/entities/user.ts";
import { newUser } from "../../factories/factory-Entities/factoryEntities.ts";
import { Email } from "../../../src/domain/value-objects/Email.ts";
import { Password } from "../../../src/domain/value-objects/Password.ts";
import { UserFactoryDTO } from "../../dtos/user.factory.dto.ts";

describe("Entities", () => {
  const validUser = newUser();

  const properties: (keyof UserFactoryDTO)[] = [
    "id",
    "name",
    "email",
    "password",
    "createdAt",
  ];

  describe("Business Rules", () => {
    describe("Positive scenarios", () => {
      it("Should create a valid user", () => {
        expect(validUser).to.be.an("object");
        for (const property of properties) {
          expect(validUser).to.have.property(property);
        }
      });
    });

    describe("Negative scenarios", () => {
      it("Should throw an error when name is empty", () => {
        expect(() => newUser({ name: "" })).to.throw(Error, "Name is required");
      });

      it("Should throw an error when email is empty", () => {
        expect(() => newUser({ email: "" })).to.throw(
          Error,
          "Email is required",
        );
      });

      it("Should throw an error when password is empty", () => {
        expect(() => newUser({ password: "" })).to.throw(
          Error,
          "Password is required",
        );
      });
    });
  });

  describe("Validations", () => {
    describe("Positive scenarios", () => {
      it("Should create an instance of User", () => {
        expect(validUser).to.be.instanceOf(User);
      });

      it("Should have Email as a Value Object", () => {
        expect(validUser._email).instanceOf(Email);
      });

      it("Should have Password as a Value Object", () => {
        expect(validUser._password).instanceOf(Password);
      });

      it("Should have createdAt as a Date", () => {
        expect(validUser._createdAt).instanceOf(Date);
      });

      it("Id should return a string", () => {
        expect(validUser._id).to.be.an("string");
      });

      it("Name should return a string", () => {});

      it("Email should return a string", () => {
        expect(validUser._email.getValue()).to.be.an("string");
      });

      it("Password should return a string", () => {
        expect(validUser._password.getValue()).to.be.an("string");
      });

      it("Date should return a string", () => {
        expect(validUser._createdAt.toISOString()).to.be.an("string");
      });
    });
    describe("Negative scenarios", () => {});
  });
});
