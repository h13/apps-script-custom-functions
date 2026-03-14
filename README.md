# Google Sheets Custom Functions

[![CI](https://github.com/h13/apps-script-custom-functions/actions/workflows/ci.yml/badge.svg)](https://github.com/h13/apps-script-custom-functions/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/h13/apps-script-custom-functions/blob/main/LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D24-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4.svg)](https://developers.google.com/apps-script)

[日本語](README.ja.md)

**Google Sheets custom functions for Japanese data validation — email, phone number, and postal code.**

Built from [apps-script-fleet](https://github.com/h13/apps-script-fleet) template.

## Available Functions

| Function                       | Description                                                          | Example                     |
| ------------------------------ | -------------------------------------------------------------------- | --------------------------- |
| `=IS_VALID_EMAIL(value)`       | Validates email address format                                       | `=IS_VALID_EMAIL(A1)`       |
| `=IS_VALID_PHONE_JP(value)`    | Validates Japanese phone number format (landline, mobile, toll-free) | `=IS_VALID_PHONE_JP(B1)`    |
| `=IS_VALID_POSTAL_CODE(value)` | Validates Japanese postal code format (with or without hyphen)       | `=IS_VALID_POSTAL_CODE(C1)` |

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

## Apps Script Projects

| Environment | Link                                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------- |
| dev         | [custom-functions-dev](https://script.google.com/d/1tu6F2RRcjnmmeA-5GyRTD51eXOO6O7qlEuNSe9jr48H_T8ehUV1aQN00/edit)  |
| prod        | [custom-functions-prod](https://script.google.com/d/1gXPZE_wfAOXPLG6-gpoS5pB7w4Vwe3ERtk6NF14oLh1a_K6Ocm9I1l4I/edit) |

## Quick Start

### 1. Create a Google Apps Script Project

Open [Google Apps Script](https://script.google.com) → create a new project → copy the `scriptId` from the project URL.

### 2. Configure clasp

Set the `scriptId` in `.clasp-dev.json` and `.clasp-prod.json`:

```json
{ "scriptId": "YOUR_SCRIPT_ID_HERE" }
```

### 3. Set CI/CD Secret

Set the `CLASPRC_JSON` secret in your GitHub repository or at the organization level.

### 4. Deploy

Run `pnpm run deploy` to deploy to the dev environment.

## Project Structure

```
src/
├── index.ts          # GAS entry points (IS_VALID_EMAIL, etc.) — no export keyword
└── validators.ts     # Validation logic as pure functions
test/
└── validators.test.ts  # Unit tests (100% coverage)
```

## Development

| Command                    | Description                             |
| -------------------------- | --------------------------------------- |
| `pnpm run check`           | lint + typecheck + test (all checks)    |
| `pnpm run build`           | Bundle TypeScript and output to `dist/` |
| `pnpm run test`            | Jest with coverage                      |
| `pnpm run test -- --watch` | Jest watch mode                         |
| `pnpm run deploy`          | check → build → deploy to dev           |
| `pnpm run deploy:prod`     | check → build → deploy to production    |

## CI/CD

CI runs on every push and PR. CD deploys on merge to `dev` or `main` — configured via GitHub Actions secrets/variables per environment. See [apps-script-fleet docs](https://github.com/h13/apps-script-fleet#cicd-pipeline) for details.

## Notes

- Functions in `src/index.ts` must not have the `export` keyword — the GAS runtime does not support ES module syntax
- `src/index.ts` is excluded from test coverage (GAS globals cannot run in Node.js)
- Coverage threshold: 80% for all metrics (configurable in `jest.config.json`)

## License

[MIT](LICENSE)
