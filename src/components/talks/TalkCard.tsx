"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ChevronRight, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Talk } from "@/types/talk";
import { useUser } from "@clerk/nextjs";

interface TalkCardProps {
  talk: Talk;
  variant?: "default" | "featured";
  index?: number;
}

export default function TalkCard({
  talk,
  variant = "default",
  index = 0,
}: TalkCardProps) {
  const { user } = useUser();

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };

  const presention_date = new Date(talk.presentation_date);
  const formattedPresentionDate = presention_date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // ユーザーのメールアドレスとトークのメールアドレスが条件を満たすかチェック
  const isSIWUser =
    user?.primaryEmailAddress?.emailAddress &&
    talk.email &&
    user.primaryEmailAddress.emailAddress.startsWith("siw") &&
    user.primaryEmailAddress.emailAddress.endsWith("@class.siw.ac.jp") &&
    talk.email.startsWith("siw") &&
    talk.email.endsWith("@class.siw.ac.jp");

  // 表示する名前を決定
  const displayName = isSIWUser ? talk.fullname : talk.presenter;

  // ライブ中かどうかを判断するロジック
  const isLive = (() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const presentationDay = new Date(
      presention_date.getFullYear(),
      presention_date.getMonth(),
      presention_date.getDate()
    );

    // 日付が一致するか確認
    if (today.getTime() !== presentationDay.getTime()) {
      return false;
    }

    // 開始時刻が設定されているか確認
    if (!talk.presentation_start_time) {
      return false;
    }

    // 開始時刻の時間と分を取得
    const [hours, minutes] = talk.presentation_start_time
      .split(":")
      .map(Number);

    // 発表開始時刻を作成
    const startTime = new Date(now);
    startTime.setHours(hours, minutes, 0, 0);

    // 発表終了時刻を計算（開始時刻 + 発表時間）
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + talk.duration);

    // 現在時刻が開始時刻と終了時刻の間かどうかを確認
    return now >= startTime && now <= endTime;
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/talk/${talk.id}`}>
        <div
          className={cn(
            "relative group overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-md",
            variant === "featured" ? "h-full" : "h-full"
          )}
        >
          {talk.image_url && (
            <div className="relative w-full aspect-video overflow-hidden">
              <Image
                src={talk.image_url}
                alt={talk.title}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black/50"></div>

              {isLive && (
                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 bg-red-600 text-white text-xs font-medium rounded-full animate-pulse">
                  <Radio className="h-3 w-3" />
                  <span>LIVE</span>
                </div>
              )}
            </div>
          )}

          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <Badge
                variant="outline"
                className={cn("text-xs px-2 py-0.5", statusColors[talk.status])}
              >
                {talk.status.charAt(0).toUpperCase() + talk.status.slice(1)}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {talk.topic}
              </Badge>
            </div>

            <h3
              className={cn(
                "font-semibold mb-2 transition-colors",
                variant === "featured" ? "text-xl md:text-2xl" : "text-lg",
                "group-hover:text-purple-600"
              )}
            >
              {talk.title}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {talk.description}
            </p>

            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <Clock className="w-4 h-4 mr-1" />
              <span>{talk.duration} min</span>
              <div className="mx-2 w-1 h-1 rounded-full bg-muted-foreground/30"></div>
              <Calendar className="w-4 h-4 mr-1" />
              <span>{formattedPresentionDate}</span>
              {talk.presentation_start_time && (
                <>
                  <div className="mx-1 w-1 h-1 rounded-full bg-muted-foreground/30"></div>
                  <span>{talk.presentation_start_time}</span>
                </>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-sm font-medium">{displayName}</div>
              </div>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-purple-600 transition-colors" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
