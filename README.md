# apps-script-custom-functions

[![CI](https://github.com/h13/apps-script-custom-functions/actions/workflows/ci.yml/badge.svg)](https://github.com/h13/apps-script-custom-functions/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/h13/apps-script-custom-functions/blob/main/LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D24-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-Custom%20Functions-4285F4.svg)](https://developers.google.com/apps-script)

[日本語](README.ja.md)

Google Sheets custom functions for Japanese data validation — built from the [apps-script-fleet](https://github.com/h13/apps-script-fleet) template.

## Available Functions

| Function | Description | Example |
|----------|-------------|---------|
| `=IS_VALID_EMAIL(value)` | Validates email address format | `=IS_VALID_EMAIL(A1)` |
| `=IS_VALID_PHONE_JP(value)` | Validates Japanese phone number format (landline, mobile, toll-free) | `=IS_VALID_PHONE_JP(B1)` |
| `=IS_VALID_POSTAL_CODE(value)` | Validates Japanese postal code format (with or without hyphen) | `=IS_VALID_POSTAL_CODE(C1)` |

## Usage Examples

Enter the following formulas in spreadsheet cells:

```
=IS_VALID_EMAIL("user@example.com")      -> TRUE
=IS_VALID_EMAIL("invalid")               -> FALSE

=IS_VALID_PHONE_JP("03-1234-5678")       -> TRUE
=IS_VALID_PHONE_JP("090-1234-5678")      -> TRUE
=IS_VALID_PHONE_JP("0120-123-456")       -> TRUE
=IS_VALID_PHONE_JP("1234567890")         -> FALSE

=IS_VALID_POSTAL_CODE("123-4567")        -> TRUE
=IS_VALID_POSTAL_CODE("1234567")         -> TRUE
=IS_VALID_POSTAL_CODE("123-456")         -> FALSE
```

## Setup

1. Clone this repository (or generate from the [apps-script-fleet](https://github.com/h13/apps-script-fleet) template)
2. Create a Google Apps Script project and obtain its `scriptId`
3. Set the `scriptId` in `.clasp-dev.json` and `.clasp-prod.json`:
   ```json
   { "scriptId": "YOUR_SCRIPT_ID_HERE" }
   ```
4. Set the `CLASPRC_JSON` secret in your GitHub repository or at the organization level
5. Run `pnpm run deploy` to deploy

## Development Commands

| Command | Description |
|---------|-------------|
| `pnpm run check` | Run lint + typecheck + test all at once |
| `pnpm run test` | Run Jest with coverage |
| `pnpm run test -- --watch` | Jest watch mode |
| `pnpm run build` | Bundle TypeScript and output to `dist/` |
| `pnpm run deploy` | check -> build -> deploy to dev environment |
| `pnpm run deploy:prod` | check -> build -> deploy to production |

**Requirements**: Node.js >= 24, pnpm

## Project Structure

```
src/
├── index.ts          # GAS entry points (IS_VALID_EMAIL, etc.) — no export keyword
└── validators.ts     # Validation logic as pure functions
test/
└── validators.test.ts  # Unit tests (100% coverage)
```

- `src/index.ts`: Defines GAS custom functions. No `export` keyword (GAS runtime does not support ES module syntax).
- `src/validators.ts`: Implements business logic as pure functions, fully testable in Node.js.

## Notes

- GAS entry point functions in `src/index.ts` must not use the `export` keyword. The GAS runtime does not understand ES module syntax and will error on `clasp push`.
- `src/index.ts` is excluded from Jest coverage because GAS globals such as `HtmlService` cannot run in Node.js.
- Coverage threshold is set to 80% for all metrics in `jest.config.json`. For a project of this scope (5-10 functions), raising it to 100% is realistic.

## Generated From

This project was generated from the [h13/apps-script-fleet](https://github.com/h13/apps-script-fleet) template, which provides:

- TypeScript strict mode
- Rollup bundler (GAS-compatible output)
- Jest tests (80% coverage threshold)
- ESLint / Prettier / Stylelint / HTMLHint
- GitHub Actions + GitLab CI/CD
- Renovate for automated dependency updates
- Template sync workflow

## License

[MIT](LICENSE)
