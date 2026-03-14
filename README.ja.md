# apps-script-custom-functions

[![CI](https://github.com/h13/apps-script-custom-functions/actions/workflows/ci.yml/badge.svg)](https://github.com/h13/apps-script-custom-functions/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/h13/apps-script-custom-functions/blob/main/LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D24-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-Custom%20Functions-4285F4.svg)](https://developers.google.com/apps-script)

[English](README.md)

Google スプレッドシート向けの日本語データバリデーションカスタム関数 — [apps-script-fleet](https://github.com/h13/apps-script-fleet) テンプレートから生成。

## 提供するカスタム関数

| 関数 | 説明 | 例 |
|------|------|----|
| `=IS_VALID_EMAIL(value)` | メールアドレスの形式を検証 | `=IS_VALID_EMAIL(A1)` |
| `=IS_VALID_PHONE_JP(value)` | 日本の電話番号形式を検証（固定・携帯・フリーダイヤル） | `=IS_VALID_PHONE_JP(B1)` |
| `=IS_VALID_POSTAL_CODE(value)` | 日本の郵便番号形式を検証（ハイフンあり・なし） | `=IS_VALID_POSTAL_CODE(C1)` |

## 使用例

スプレッドシートのセルに以下のように入力します:

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

## セットアップ

1. このリポジトリをクローン（または [apps-script-fleet](https://github.com/h13/apps-script-fleet) テンプレートから生成）
2. Google Apps Script プロジェクトを作成し、`scriptId` を取得
3. `.clasp-dev.json` と `.clasp-prod.json` に `scriptId` を設定:
   ```json
   { "scriptId": "YOUR_SCRIPT_ID_HERE" }
   ```
4. CI/CD シークレット `CLASPRC_JSON` を GitHub リポジトリまたは Org レベルに設定
5. `pnpm run deploy` でデプロイ

## 開発コマンド

| コマンド | 説明 |
|----------|------|
| `pnpm run check` | lint + typecheck + test を一括実行 |
| `pnpm run test` | Jest でテスト実行（カバレッジ付き） |
| `pnpm run test -- --watch` | Jest ウォッチモード |
| `pnpm run build` | TypeScript をバンドルして `dist/` に出力 |
| `pnpm run deploy` | check -> build -> dev 環境へデプロイ |
| `pnpm run deploy:prod` | check -> build -> 本番環境へデプロイ |

**要件**: Node.js >= 24, pnpm

## プロジェクト構成

```
src/
├── index.ts          # GAS エントリポイント（IS_VALID_EMAIL 等）— export キーワードなし
└── validators.ts     # バリデーションロジック（純粋関数）
test/
└── validators.test.ts  # ユニットテスト（カバレッジ 100%）
```

- `src/index.ts`: GAS カスタム関数を定義。`export` キーワードなし（GAS ランタイムは ES モジュール構文を認識しない）。
- `src/validators.ts`: 純粋関数としてビジネスロジックを実装。Node.js で完全にテスト可能。

## 注意事項

- `src/index.ts` の GAS エントリポイント関数には `export` キーワードをつけない。GAS ランタイムは ES モジュール構文を認識できず、`clasp push` 時にエラーになる。
- `src/index.ts` は Jest カバレッジ対象外。`HtmlService` 等の GAS グローバルは Node.js で実行できないため。
- カバレッジ閾値は `jest.config.json` で全メトリクス 80% に設定。このスコープ（関数 5〜10 個）のプロジェクトであれば、100% への引き上げも現実的。

## テンプレートについて

このプロジェクトは [h13/apps-script-fleet](https://github.com/h13/apps-script-fleet) テンプレートから生成されました。

テンプレートが提供するもの:

- TypeScript strict モード
- Rollup バンドラー（GAS 互換出力）
- Jest テスト（80% カバレッジ閾値）
- ESLint / Prettier / Stylelint / HTMLHint
- GitHub Actions + GitLab CI/CD
- Renovate による依存関係自動更新
- テンプレート同期ワークフロー

## ライセンス

[MIT](LICENSE)
