import { describe, it } from "bun:test";
import { expect } from "chai";

import { factoryEmail } from "../../factories/Factory-VO/factoryEmail.ts";
import { Email } from "../../../src/domain/value-objects/Email.ts";

describe("Email", () => {
  const validEmail = new Email(factoryEmail());
  const emptyEmail = () => new Email("");
  const emailWithoutAt = () => new Email(factoryEmail().replace("@", ""));
  const invalidEmail = () => new Email("not-an-email");
  const emailIvalidType = () => new Email(123 as any);

  describe("Business Rules", () => {
    describe("Positive Scenarios", () => {
      it("should create a valid email", () => {
        expect(validEmail.getValue()).to.includes("@");
      });
    });

    describe("Negative Scenarios", () => {
      it("should return a error when email is empty", () => {
        expect(emptyEmail).to.throw(Error, "Email is required");
      });
      it("should return a error when email does not contain '@'", () => {
        expect(emailWithoutAt).to.throw(Error, "Invalid Email");
      });
      it("should return a error when email format is invalid", () => {
        expect(invalidEmail).to.throw(Error, "Invalid Email");
      });
    });
  });

  describe("Validations", () => {
    describe("Positive scenarios", () => {
      it("Email Should be a string", () => {
        expect(validEmail.getValue()).to.be.an("string");
      });
    });

    describe("Negative scenarios", () => {
      it("Should return a error when email type is not string", () => {
        expect(emailIvalidType).to.throw(Error, "Email must be string");
      });
    });
  });
});
