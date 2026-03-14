import {
  isValidEmail,
  isValidPhoneJp,
  isValidPostalCode,
} from "./validators.js";

function IS_VALID_EMAIL(value: string): boolean {
  return isValidEmail(value);
}

function IS_VALID_PHONE_JP(value: string): boolean {
  return isValidPhoneJp(value);
}

function IS_VALID_POSTAL_CODE(value: string): boolean {
  return isValidPostalCode(value);
}
