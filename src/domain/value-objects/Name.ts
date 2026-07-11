export class Name {
  constructor(private readonly value: string) {
    this.validateType(value);
    this.validateRequired(value);
    this.validateMinLength(value);
    this.validateMaxLength(value);
  }

  private validateType(value: unknown) {
    if (typeof value !== "string") {
      throw new Error("Name must be string");
    }
  }

  private validateRequired(value: string) {
    if (!value) {
      throw new Error("Name is required");
    }
  }

  private validateMinLength(value: string) {
    if (value.length < 3) {
      throw new Error("Name must have at least 3 characters.");
    }
  }

  private validateMaxLength(value: string) {
    if (value.length > 50) {
      throw new Error("Name must have at most 12 characters.");
    }
  }

  getValue(): string {
    return this.value;
  }
}
