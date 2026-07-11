import { describe, it } from "bun:test";
import { expect } from "chai";

import { factoryEmail } from "../../factories/Factory-VO/factoryEmail.ts";
import { Email } from "../../../src/domain/value-objects/Email.ts";

describe("Email", () => {
  const validEmail = (value = factoryEmail()) => new Email(value);

  describe("Business Rules", () => {
    describe("Positive scenarios", () => {
      it("Should create a valid email", () => {
        const email = validEmail().getValue();

        expect(email).to.include("@");
      });
    });

    describe("Negative scenarios", () => {
      it("Should return an error when email is empty", () => {
        expect(() => validEmail("")).to.throw(Error, "Email is required");
      });

      it("Should return an error when email does not contain '@'", () => {
        expect(() => validEmail(factoryEmail().replace("@", ""))).to.throw(
          Error,
          "Invalid Email",
        );
      });

      it("Should return an error when email format is invalid", () => {
        expect(() => validEmail("not-an-email")).to.throw(
          Error,
          "Invalid Email",
        );
      });
    });
  });

  describe("Validations", () => {
    describe("Positive scenarios", () => {
      it("Email should return a string", () => {
        expect(validEmail().getValue()).to.be.a("string");
      });

      it("Should create a valid Email Value Object", () => {
        expect(validEmail()).to.be.instanceOf(Email);
      });
    });

    describe("Negative scenarios", () => {
      it("Should return an error when email type is not string", () => {
        expect(() => validEmail(123 as any)).to.throw(
          Error,
          "Email must be string",
        );
      });
    });
  });
});
