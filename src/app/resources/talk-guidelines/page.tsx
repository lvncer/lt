"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const GUIDELINES = [
  {
    title: "行動規範",
    items: [
      "発表者・参加者を尊重すること",
      "どんな発表でも、あたたかく見守る姿勢",
      "失敗や緊張もOK！みんなで応援し合える空気を大事に",
      "他人を馬鹿にしたり、傷つけるような発言は禁止",
      "差別的・攻撃的な言動（性別・国籍・見た目などに関するもの）は禁止",
    ],
  },
  {
    title: "発表ルール",
    items: [
      "発表時間：5〜10分程度",
      "テーマ：自由（公序良俗の範囲内）",
      "スライド：あってもなくてもOK",
      "発表スタイル：自由（真面目でもネタでもOK）",
      "質問は口頭でもチャットでもOK",
    ],
  },
  {
    title: "発表テーマの例",
    items: [
      "Pythonで簡単なツールを作った話",
      "paizaを使ってみた感想",
      "情報処理技術者試験の勉強法",
      "自作PC組んでみた話",
      "最近気になっている技術やニュース",
      "おすすめのアニメ・ゲーム紹介（技術に絡めてもOK）",
    ],
  },
  {
    title: "LT会の流れ",
    items: [
      "オープニング：主催者からあいさつ・趣旨説明（5分程度）",
      "発表タイム：発表者が順番に登壇（5〜10分/人）",
      "発表後に簡単な質問・感想タイム（1〜2分）",
      "クロージング：ふりかえり、発表者へのお礼（5分）",
    ],
  },
];

export default function TalkGuidelinesPage() {
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
          トークガイドライン
        </h1>

        <p className="text-lg text-muted-foreground mb-8">
          ライトニングトークに参加する前に、これらのガイドラインをご確認ください。
          みんなが安心して参加・発表できる場を目指しています。
        </p>

        <div className="space-y-8">
          {GUIDELINES.map((section, index) => (
            <div key={index} className="p-6 border rounded-lg bg-card">
              <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-purple-50 dark:bg-purple-700 rounded-lg">
          <h2 className="text-xl text-white font-semibold mb-4">
            アイデアを共有する準備はできましたか？
          </h2>
          <p className="text-white/80 mb-4">
            ガイドラインをご理解いただけましたら、ぜひライトニングトークの提案をお聞かせください。
            あなたのアイデアを共有して、スピーカーコミュニティに参加しましょう！
          </p>
          <Button asChild className="bg-white text-black">
            <Link href="/register">トークを提出する</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
