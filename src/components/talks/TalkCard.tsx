"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, ChevronRight, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Talk, TalkStatus } from "@/types/talk";
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

  const statusColors: Record<TalkStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };

  const presentationDate = talk.presentationDate
    ? new Date(talk.presentationDate)
    : new Date();
  const formattedPresentationDate = presentationDate.toLocaleDateString(
    "ja-JP",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

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
    if (!talk.presentationDate || !talk.presentationStartTime) {
      return false;
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const presentationDay = new Date(
      presentationDate.getFullYear(),
      presentationDate.getMonth(),
      presentationDate.getDate()
    );

    // 日付が一致するか確認
    if (today.getTime() !== presentationDay.getTime()) {
      return false;
    }

    // 開始時刻の時間と分を取得
    const [hours, minutes] = talk.presentationStartTime.split(":").map(Number);

    // 発表開始時刻を作成
    const startTime = new Date(now);
    startTime.setHours(hours, minutes, 0, 0);

    // 発表終了時刻を計算（開始時刻 + 発表時間）
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + talk.duration);

    // 現在時刻が開始時刻と終了時刻の間かどうかを確認
    return now >= startTime && now <= endTime;
  })();

  // 安全なstatus取得
  const getStatusColor = (status: string | null | undefined): string => {
    const validStatus = (status as TalkStatus) || "pending";
    return statusColors[validStatus] || statusColors.pending;
  };

  // リンクが有効かどうかを判定
  const isLinkEnabled = variant !== "featured";

  // カードコンテンツ
  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={cn(
        "transition-all duration-300",
        variant === "featured" ? "opacity-50" : "",
        isLinkEnabled ? "hover:scale-105 cursor-pointer" : ""
      )}
    >
      <div
        className={cn(
          "relative group overflow-hidden rounded-lg border border-border bg-card transition-all duration-300",
          variant === "featured" ? "h-full" : "h-full",
          isLinkEnabled ? "hover:shadow-lg hover:border-primary/20" : ""
        )}
      >
        {talk.imageUrl && (
          <div className="relative w-full aspect-video overflow-hidden">
            <Image
              src={talk.imageUrl}
              alt={talk.title}
              className="object-cover"
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
              className={cn("text-xs px-2 py-0.5", getStatusColor(talk.status))}
            >
              {talk.status
                ? talk.status.charAt(0).toUpperCase() + talk.status.slice(1)
                : "Pending"}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {talk.topic}
            </Badge>
          </div>

          <h3
            className={cn(
              "font-semibold mb-2 transition-colors",
              variant === "featured" ? "text-xl md:text-2xl" : "text-lg",
              isLinkEnabled ? "group-hover:text-primary" : ""
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
            <span>{formattedPresentationDate}</span>
            {talk.presentationStartTime && (
              <>
                <div className="mx-1 w-1 h-1 rounded-full bg-muted-foreground/30"></div>
                <span>{talk.presentationStartTime}</span>
              </>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-sm font-medium">{displayName}</div>
            </div>
            {isLinkEnabled && (
              <div>
                <ChevronRight
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform",
                    "group-hover:translate-x-1 group-hover:text-primary"
                  )}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  // リンクが有効な場合はLinkでラップ、無効な場合はそのまま返す
  if (isLinkEnabled) {
    return (
      <Link href={`/talk/${talk.id}`} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
