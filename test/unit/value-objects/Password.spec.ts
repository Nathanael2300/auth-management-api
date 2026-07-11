import { describe, it } from "bun:test";
import { expect } from "chai";

import { factoryPassword } from "../../factories/Factory-VO/factoryPassword.ts";
import { Password } from "../../../src/domain/value-objects/Password.ts";

describe("Password", () => {
  const validPassword = (value = factoryPassword()) => new Password(value);

  describe("Business Rules", () => {
    describe("Positive scenarios", () => {
      it("Should create a valid password", () => {
        const password = validPassword();
        const value = password.getValue();

        expect(value).to.have.lengthOf(12);
        expect(value).to.match(/[A-Z]/);
        expect(value).to.match(/[0-9]/);
        expect(value).to.match(/[^A-Za-z0-9]/);
      });
    });

    describe("Negative scenarios", () => {
      it("Should return an error when password does not contain a number", () => {
        expect(() => validPassword("Abcdef!@#")).to.throw(
          Error,
          "Password must have at least one number",
        );
      });

      it("Should return an error when password does not contain a special character", () => {
        expect(() => validPassword("Abc12345")).to.throw(
          Error,
          "Password must have at least one special character",
        );
      });

      it("Should return an error when password is too short", () => {
        expect(() => validPassword("Ab1!")).to.throw(
          Error,
          "Password must have at least 6 characters.",
        );
      });

      it("Should return an error when password is too long", () => {
        expect(() => validPassword("Abc123!@Def45")).to.throw(
          Error,
          "Password must have at most 12 characters.",
        );
      });

      it("Should return an error when password is empty", () => {
        expect(() => validPassword("")).to.throw(Error, "Password is required");
      });
    });
  });

  describe("Validations", () => {
    describe("Positive scenarios", () => {
      it("Password should return a string", () => {
        expect(validPassword().getValue()).to.be.a("string");
      });

      it("Should create a valid Password Value Object", () => {
        expect(validPassword()).to.be.instanceOf(Password);
      });
    });

    describe("Negative scenarios", () => {
      it("Should return an error when password type is not string", () => {
        expect(() => validPassword(123 as any)).to.throw(
          Error,
          "Password must be string",
        );
      });
    });
  });
});
