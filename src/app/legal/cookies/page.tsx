"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </Button>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          Cookieポリシー
        </h1>

        <p className="text-lg text-muted-foreground mb-8">
          最終更新日: {new Date().toLocaleDateString("ja-JP")}
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Cookieについて</h2>
          <p>
            このLT会サイトでは、ユーザーの体験を向上させるために
            Cookie（クッキー）を使用しています。
          </p>

          <h2>Cookieとは</h2>
          <p>
            Cookieは、ウェブサイトを訪問した際にブラウザに保存される
            小さなテキストファイルです。ユーザーの設定や行動を記憶し、
            より便利なサービスを提供するために使用されます。
          </p>

          <h2>使用するCookieの種類</h2>

          <h3>必須Cookie</h3>
          <p>
            サイトの基本的な機能を提供するために必要なCookieです。
            ページナビゲーションやセキュアエリアへのアクセスなどに使用されます。
          </p>

          <h3>機能Cookie</h3>
          <p>
            ユーザーの設定や選択を記憶し、カスタマイズされた体験を
            提供するためのCookieです。ログイン状態の維持などに使用されます。
          </p>

          <h2>Cookieの管理</h2>
          <p>
            ブラウザの設定でCookieを無効にすることができます。
            ただし、Cookieを無効にするとサイトの一部機能が
            正常に動作しない場合があります。
          </p>

          <h3>ブラウザ設定</h3>
          <p>
            ほとんどのウェブブラウザでは、設定メニューから
            Cookieの受け入れや削除を制御できます。
          </p>

          <h2>第三者Cookie</h2>
          <p>
            このサイトでは、第三者サービス（Google Analyticsなど）が
            設定するCookieを使用する場合があります。
            これらのCookieについては、各サービスのプライバシーポリシーを
            ご確認ください。
          </p>

          <h2>ポリシーの更新</h2>
          <p>
            このCookieポリシーは必要に応じて更新される場合があります。
            更新があった場合は、このページでお知らせいたします。
          </p>

          <h2>お問い合わせ</h2>
          <p>
            Cookieの使用についてご質問がございましたら、
            LT会運営者までお気軽にお問い合わせください。
          </p>
        </div>
      </div>
    </div>
  );
}
