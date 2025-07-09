"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { format, addDays, subDays, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useDailySchedule } from "@/hooks/useDailySchedule";
import { useScheduleData } from "@/hooks/useScheduleData";
import { EnhancedDatePicker } from "@/components/schedule/enhanced-date-picker";
import { EnhancedDateList } from "@/components/schedule/enhanced-date-list";
import { Talk } from "@/types/talk";

export default function SchedulePage() {
  // 利用可能な日付を取得
  const { dates, isDatesLoading, preloadScheduleData } = useScheduleData();

  // 初期日付の設定
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");

  // 初期日付を設定する
  useEffect(() => {
    if (dates && dates.length > 0 && !selectedDate) {
      const initialDate = parseISO(dates[0]);
      setSelectedDate(initialDate);
      setFormattedDate(format(initialDate, "yyyy-MM-dd"));
    }
  }, [dates, selectedDate]);

  // 選択された日付のスケジュールを取得
  const { talks, isLoading: isTalksLoading } = useDailySchedule(formattedDate);

  // 前の日に移動
  const handlePreviousDay = () => {
    if (!selectedDate) return;

    const prevDate = subDays(selectedDate, 1);
    setSelectedDate(prevDate);
    setFormattedDate(format(prevDate, "yyyy-MM-dd"));
    // プリロード
    preloadScheduleData(prevDate);
  };

  // 次の日に移動
  const handleNextDay = () => {
    if (!selectedDate) return;

    const nextDate = addDays(selectedDate, 1);
    setSelectedDate(nextDate);
    setFormattedDate(format(nextDate, "yyyy-MM-dd"));
    // プリロード
    preloadScheduleData(nextDate);
  };

  // 特定の日付に直接移動
  const handleDateSelect = (dateStr: string) => {
    // 日付文字列をそのままformattedDateに設定
    setFormattedDate(dateStr);
    // 日付オブジェクトをselectedDateに設定
    setSelectedDate(parseISO(dateStr));
  };

  // 日付変更時の処理
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setFormattedDate(format(date, "yyyy-MM-dd"));
      preloadScheduleData(date);
    }
  };

  // 現在実施中のトークかどうかを判定
  const isLiveTalk = (talk: Talk) => {
    if (!talk.presentationStartTime || !talk.presentationDate) return false;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const talkDate = parseISO(talk.presentationDate);
    const presentationDay = new Date(
      talkDate.getFullYear(),
      talkDate.getMonth(),
      talkDate.getDate()
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
  };

  // ローディング表示
  if (isDatesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <Info className="h-10 w-10 animate-spin text-blue-500" />
          <p className="mt-4 text-lg">スケジュール情報を読み込んでいます...</p>
        </div>
      </div>
    );
  }

  // 利用可能な日付がない場合
  if (!isDatesLoading && (!dates || dates.length === 0)) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            ホームに戻る
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-3xl font-bold tracking-tight mb-6">
            ライトニングトークスケジュール
          </h1>
          <p className="text-lg text-muted-foreground">
            現在予定されているトークはありません
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          ホームに戻る
        </Link>
      </Button>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          ライトニングトークスケジュール
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* 左側: 日付選択エリア */}
          <div className="lg:w-80 flex-shrink-0">
            <Card>
              <CardContent className="p-4">
                {/* 現在の日付表示と前後ボタン */}
                <div className="flex items-center justify-between mb-4">
                  <Button variant="outline" size="icon" onClick={handlePreviousDay}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-lg font-medium text-center px-4">
                    {selectedDate ? format(selectedDate, "yyyy年MM月dd日") : ""}
                  </div>
                  <Button variant="outline" size="icon" onClick={handleNextDay}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* 日付選択コンポーネント */}
                <EnhancedDatePicker
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                  scheduleDates={dates}
                />
              </CardContent>
            </Card>
          </div>

          {/* 右側: 予定がある日付リスト - 全面表示 */}
          <div className="flex-1 min-w-0">
            <Card className="h-full">
              <CardContent className="p-4 h-full">
                <div className="h-full max-h-[500px] overflow-y-auto">
                  <EnhancedDateList
                    dates={dates}
                    selectedDate={formattedDate}
                    onDateSelect={handleDateSelect}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {isTalksLoading ? (
          <div className="flex justify-center py-12">
            <Info className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : talks.length > 0 ? (
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {talks.map((talk) => (
                <Card key={talk.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="relative aspect-video md:aspect-square">
                        {talk.imageUrl && (
                          <Image
                            src={talk.imageUrl}
                            alt={talk.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="p-6 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge
                            variant="outline"
                            className="bg-purple-50 text-purple-700 border-purple-200"
                          >
                            発表時間: {talk.presentationStartTime || "時間未定"}
                          </Badge>
                          <Badge variant="outline">{talk.venue}</Badge>
                          {isLiveTalk(talk) && (
                            <Badge
                              variant="destructive"
                              className="animate-pulse"
                            >
                              ライブ配信中
                            </Badge>
                          )}
                        </div>

                        <h3 className="text-xl font-semibold mb-2">
                          {talk.title}
                        </h3>
                        <p className="text-md text-muted-foreground mb-4">
                          発表者: {(talk.fullname && talk.fullname !== 'anonymous') ? talk.fullname : talk.presenter}
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          {talk.description}
                        </p>

                        <div className="flex items-center text-sm text-muted-foreground mb-6">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{talk.duration} 分</span>
                          <div className="ml-3 px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                            {talk.topic}
                          </div>
                        </div>

                        <Button variant="outline" asChild>
                          <Link href={`/talk/${talk.id}`}>詳細を見る</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12 bg-accent rounded-lg">
              <p className="text-lg text-muted-foreground">
                この日に予定されているトークはありません
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
