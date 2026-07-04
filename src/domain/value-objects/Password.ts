const PASSWORD_PATTERNS = {
  uppercase: /[A-Z]/,
  specialCharacter: /[^A-Za-z0-9]/,
  number: /[0-9]/,
};

export class Password {
  constructor(private readonly value: string) {
    this.validateType(value);
    this.validateRequired(value);
    this.validateMinLength(value);
    this.validateMaxLength(value);
    this.validateUppercase(value);
    this.validateSpecialCharacter(value);
    this.validateNumber(value);
  }

  private validateType(value: unknown): void {
    if (typeof value !== "string") {
      throw new Error("Password must be string");
    }
  }

  private validateRequired(value: string): void {
    if (!value) {
      throw new Error("Password is required");
    }
  }

  private validateMinLength(value: string): void {
    if (value.length < 6) {
      throw new Error("Password must have at least 6 characters.");
    }
  }

  private validateMaxLength(value: string): void {
    if (value.length > 12) {
      throw new Error("Password must have at most 12 characters.");
    }
  }

  private validateUppercase(value: string): void {
    if (!PASSWORD_PATTERNS.uppercase.test(value)) {
      throw new Error("Password must have at least one uppercase letter");
    }
  }

  private validateSpecialCharacter(value: string): void {
    if (!PASSWORD_PATTERNS.specialCharacter.test(value)) {
      throw new Error("Password must have at least one special character");
    }
  }

  private validateNumber(value: string): void {
    if (!PASSWORD_PATTERNS.number.test(value)) {
      throw new Error("Password must have at least one number");
    }
  }

  getValue(): string {
    return this.value;
  }
}
