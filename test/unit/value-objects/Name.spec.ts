import { describe, it } from "bun:test";
import { expect } from "chai";

import { factoryName } from "../../factories/Factory-VO/factoryName.ts";
import { Name } from "../../../src/domain/value-objects/Name.ts";

describe("Name", () => {
  const validName = (value = factoryName()) => new Name(value);
  describe("Business Rules", () => {
    describe("Positive scenarios", () => {
      it("Should have at least 3 characters", () => {
        expect(validName().getValue()).to.have.lengthOf.at.least(3);
      });

      it("Should have at most 50 characters", () => {
        expect(validName().getValue()).to.have.lengthOf.at.most(50);
      });
    });
    describe("Negative scenarios", () => {});
  });

  describe("Validation", () => {
    describe("Positive scenarios", () => {
      it(" should return a string", () => {});
    });
    describe("Negative scenarios", () => {});
  });
});
