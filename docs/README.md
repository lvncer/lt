# 🌟 Github Rules

このファイルは、チームでの効率的な Git 作業のためのガイドラインを提供します。

## 📁 フォルダ構造

```bash
.
├── .github/
│   ├── PULL_REQUEST_TEMPLATE/  # PRテンプレート
│   └── ISSUE_TEMPLATE/         # イシューテンプレート
└── docs/
    ├── README.md              # プロジェクトの概要とガイドライン
    ├── CONTRIBUTING.md         # 貢献ガイドライン
    └── COMMIT_CONVENTION.md    # コミット規約
```

## 🔄 作業の流れ

1. 📝 **イシューの作成**

   - [イシューテンプレート](../.github/ISSUE_TEMPLATE/default.md)に従って作成
   - 作業内容を明確に記述

2. 🌿 **ブランチの作成**

   - [ブランチ命名規則](CONTRIBUTING.md#ブランチ名テンプレート)に準拠
   - イシューと関連付け

3. 💻 **開発作業**

   - ローカルで作業を実施
   - 定期的にコミット

4. 📤 **コミット＆プッシュ**

   - [コミットメッセージ規約](COMMIT_CONVENTION.md)に従う
   - 変更内容を明確に説明

5. 🔍 **プルリクエスト**

   - [PR テンプレート](../.github/PULL_REQUEST_TEMPLATE/default.md)に従って作成
   - レビュワーにレビューを依頼

6. ✅ **マージ完了**
   - レビュー承認後にマージ
   - ブランチのクリーンアップ

## 💡 重要な作業ルール

### チーム協力の原則

1. 👥 **ペアワークの推奨**

   - 可能な限り、チームメイトと協力して作業を進める
   - 知識共有を積極的に行う

2. 💬 **オープンなコミュニケーション**

   - 不明点や疑問点は遠慮なく相談
   - チーム全体での知識共有を推進

3. ⚠️ **インシデント報告**

   - 重要な問題が発生した場合は即時報告
   - 解決に向けてチームで協力

4. 👀 **コードレビュー**
   - 作業完了後は必ずプルリクエストを作成
   - 建設的なレビューを心がける
