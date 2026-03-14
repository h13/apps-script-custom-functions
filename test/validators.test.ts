import {
  isValidEmail,
  isValidPhoneJp,
  isValidPostalCode,
} from "../src/validators.js";

describe("isValidEmail", () => {
  it.each([
    ["user@example.com", true],
    ["user.name+tag@example.co.jp", true],
    ["user@subdomain.example.com", true],
  ])("returns true for valid email: %s", (input, expected) => {
    expect(isValidEmail(input)).toBe(expected);
  });

  it.each([
    ["", false],
    ["plaintext", false],
    ["@no-local.com", false],
    ["no-domain@", false],
    ["spaces in@email.com", false],
    ["missing@.com", false],
  ])("returns false for invalid email: %s", (input, expected) => {
    expect(isValidEmail(input)).toBe(expected);
  });
});

describe("isValidPhoneJp", () => {
  it.each([
    ["03-1234-5678", true],
    ["0312345678", true],
    ["090-1234-5678", true],
    ["09012345678", true],
    ["0120-123-456", true],
    ["0120123456", true],
    ["080-1234-5678", true],
    ["070-1234-5678", true],
    ["045-123-4567", true],
    ["0451234567", true],
  ])("returns true for valid JP phone: %s", (input, expected) => {
    expect(isValidPhoneJp(input)).toBe(expected);
  });

  it.each([
    ["", false],
    ["1234567890", false],
    ["03-1234-567", false],
    ["+81-3-1234-5678", false],
    ["abc-defg-hijk", false],
    ["03-1234-56789", false],
  ])("returns false for invalid JP phone: %s", (input, expected) => {
    expect(isValidPhoneJp(input)).toBe(expected);
  });
});

describe("isValidPostalCode", () => {
  it.each([
    ["123-4567", true],
    ["1234567", true],
    ["000-0000", true],
  ])("returns true for valid postal code: %s", (input, expected) => {
    expect(isValidPostalCode(input)).toBe(expected);
  });

  it.each([
    ["", false],
    ["123-456", false],
    ["12-34567", false],
    ["1234-567", false],
    ["abcdefg", false],
    ["123-45678", false],
  ])("returns false for invalid postal code: %s", (input, expected) => {
    expect(isValidPostalCode(input)).toBe(expected);
  });
});
