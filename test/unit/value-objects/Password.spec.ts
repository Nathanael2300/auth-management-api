import { describe, it } from "bun:test";
import { expect } from "chai";

import { factoryPassword } from "../../factories/Factory-VO/factoryPassword.ts";
import { Password } from "../../../src/domain/value-objects/Password.ts";

describe("Password", () => {
  const validPassword = () => new Password(factoryPassword());
  const passwordWithoutNumber = () => new Password("Abcdef!@#");
  const passwordWithoutSpecialCharacter = () => new Password("Abc12345");
  const passwordTooShort = () => new Password("Ab1!");
  const passwordTooLong = () => new Password("Abc123!@Def45");
  const emptyPassword = () => new Password("");

  describe("Business Rules", () => {
    describe("Positive scenarios", () => {
      it("Should create a valid password", () => {
        expect(validPassword().getValue().length).to.eql(12);
        expect(validPassword().getValue()).to.match(/[A-Z]/);
        expect(validPassword().getValue()).to.match(/[^A-Za-z0-9]/);
        expect(validPassword().getValue()).to.match(/[0-9]/);
      });
    });

    describe("Negative scenarios", () => {
      it("Should return an error when password does not contain a number", () => {
        expect(passwordWithoutNumber).to.throw(
          Error,
          "Password must have at least one number",
        );
      });

      it("Should return an error when password does not contain a special character ", () => {
        expect(passwordWithoutSpecialCharacter).to.throw(
          Error,
          "Password must have at least one special character",
        );
      });

      it("Should return an error when password is too short", () => {
        expect(passwordTooShort).to.throw(
          Error,
          "Password must have at least 6 characters.",
        );
      });

      it("Should return an error when password is too long", () => {
        expect(passwordTooLong).to.throw(
          Error,
          "Password must have at most 12 characters.",
        );
      });

      it("Should return an error when password is empty", () => {
        expect(emptyPassword).to.throw(Error, "Password is required");
      });
    });
  });

  describe("Validations", () => {
    describe("Positive scenarios", () => {});
    describe("Negative scenarios", () => {});
  });
});
