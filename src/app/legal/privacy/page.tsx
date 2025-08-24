"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
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
          プライバシーポリシー
        </h1>

        <p className="text-lg text-muted-foreground mb-8">
          最終更新日: {new Date().toLocaleDateString("ja-JP")}
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>個人情報の取り扱いについて</h2>
          <p>
            このLT会では、参加者の皆様に安心してご参加いただくため、
            個人情報の取り扱いについて以下のとおり定めます。
          </p>

          <h3>収集する情報</h3>
          <ul>
            <li>お名前（ハンドルネーム可）</li>
            <li>連絡先（学内メールアドレスなど）</li>
            <li>発表テーマとその概要</li>
            <li>発表資料（公開に同意いただいた場合のみ）</li>
          </ul>

          <h3>情報の利用目的</h3>
          <ul>
            <li>LT会の運営・管理</li>
            <li>発表者との連絡・調整</li>
            <li>タイムスケジュールの作成・共有</li>
            <li>次回開催の案内（希望者のみ）</li>
          </ul>

          <h2>情報の共有について</h2>
          <p>
            収集した個人情報は、LT会の運営目的以外では使用いたしません。
            また、参加者の同意なく第三者に提供することはありません。
          </p>

          <h3>発表資料の公開について</h3>
          <ul>
            <li>発表資料の公開は発表者の任意です</li>
            <li>公開する場合は学内メンバー限定とします</li>
            <li>OneDriveや学内共有スペースを利用予定</li>
            <li>公開範囲や内容は各発表者にお任せします</li>
          </ul>

          <h2>情報の管理</h2>
          <p>
            個人情報は適切に管理し、LT会終了後は必要に応じて
            安全に削除いたします。
          </p>

          <h2>お問い合わせ</h2>
          <p>
            個人情報の取り扱いについてご質問がございましたら、
            LT会運営者までお気軽にお問い合わせください。
          </p>
        </div>
      </div>
    </div>
  );
}
