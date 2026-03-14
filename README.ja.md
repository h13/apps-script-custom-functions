# Google Sheets Custom Functions

[![CI](https://github.com/h13/apps-script-custom-functions/actions/workflows/ci.yml/badge.svg)](https://github.com/h13/apps-script-custom-functions/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/h13/apps-script-custom-functions/blob/main/LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D24-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4.svg)](https://developers.google.com/apps-script)

[English](README.md)

**Google スプレッドシート向けの日本語データバリデーションカスタム関数 — メールアドレス、電話番号、郵便番号。**

[apps-script-fleet](https://github.com/h13/apps-script-fleet) テンプレートから生成。

## 提供するカスタム関数

| 関数                           | 説明                                                   | 例                          |
| ------------------------------ | ------------------------------------------------------ | --------------------------- |
| `=IS_VALID_EMAIL(value)`       | メールアドレスの形式を検証                             | `=IS_VALID_EMAIL(A1)`       |
| `=IS_VALID_PHONE_JP(value)`    | 日本の電話番号形式を検証（固定・携帯・フリーダイヤル） | `=IS_VALID_PHONE_JP(B1)`    |
| `=IS_VALID_POSTAL_CODE(value)` | 日本の郵便番号形式を検証（ハイフンあり・なし）         | `=IS_VALID_POSTAL_CODE(C1)` |

## 使用例

スプレッドシートのセルに以下のように入力:

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

## Apps Script プロジェクト

| 環境 | リンク                                                                                                              |
| ---- | ------------------------------------------------------------------------------------------------------------------- |
| dev  | [custom-functions-dev](https://script.google.com/d/1tu6F2RRcjnmmeA-5GyRTD51eXOO6O7qlEuNSe9jr48H_T8ehUV1aQN00/edit)  |
| prod | [custom-functions-prod](https://script.google.com/d/1gXPZE_wfAOXPLG6-gpoS5pB7w4Vwe3ERtk6NF14oLh1a_K6Ocm9I1l4I/edit) |

## クイックスタート

### 1. Google Apps Script プロジェクトの作成

[Google Apps Script](https://script.google.com) を開く → 新しいプロジェクトを作成 → プロジェクト URL から `scriptId` をコピー。

### 2. clasp の設定

`.clasp-dev.json` と `.clasp-prod.json` に `scriptId` を設定:

```json
{ "scriptId": "YOUR_SCRIPT_ID_HERE" }
```

### 3. CI/CD シークレットの設定

`CLASPRC_JSON` シークレットを GitHub リポジトリまたは Org レベルに設定。

### 4. デプロイ

`pnpm run deploy` で dev 環境にデプロイ。

## プロジェクト構成

```
src/
├── index.ts          # GAS エントリポイント（IS_VALID_EMAIL 等）— export キーワードなし
└── validators.ts     # バリデーションロジック（純粋関数）
test/
└── validators.test.ts  # ユニットテスト（カバレッジ 100%）
```

## 開発

| コマンド                   | 説明                                     |
| -------------------------- | ---------------------------------------- |
| `pnpm run check`           | lint + typecheck + test（全チェック）    |
| `pnpm run build`           | TypeScript をバンドルして `dist/` に出力 |
| `pnpm run test`            | Jest（カバレッジ付き）                   |
| `pnpm run test -- --watch` | Jest ウォッチモード                      |
| `pnpm run deploy`          | check → build → dev にデプロイ           |
| `pnpm run deploy:prod`     | check → build → 本番にデプロイ           |

## CI/CD

CI は全 push と PR で実行。CD は `dev` または `main` へのマージで自動デプロイ — GitHub Actions の environment 別 secrets/variables で設定済み。詳細は [apps-script-fleet のドキュメント](https://github.com/h13/apps-script-fleet#cicd-パイプライン)を参照。

## 注意事項

- `src/index.ts` の関数に `export` キーワードは付けない（GAS ランタイムは ES モジュール構文を認識できない）
- `src/index.ts` はテストカバレッジ対象外（GAS グローバルが Node.js で実行不可のため）
- カバレッジ閾値: 全メトリクス 80%（`jest.config.json` で変更可）

## ライセンス

[MIT](LICENSE)
