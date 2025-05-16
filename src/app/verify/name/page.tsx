"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useUpdateFullname } from "@/hooks/useUpdateFullname";
import { useUserId } from "@/hooks/useUserId";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, "フルネームは2文字以上で入力してください")
    .regex(
      /^[A-Za-zぁ-んァ-ン一-龯]+\s+[A-Za-zぁ-んァ-ン一-龯]+$/,
      "姓と名の間にスペースを入れて入力してください"
    ),
});

export default function ProfilePage() {
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const { neonid, isLoading: isLoadingUserId } = useUserId();
  const { updateFullname, isLoading, error: updateError } = useUpdateFullname();

  useEffect(() => {
    if (isSignedIn === false) {
      router.push("/");
      return;
    }

    const isSIWUser = user?.emailAddresses?.some(
      (email) =>
        email.emailAddress.startsWith("siw") &&
        email.emailAddress.endsWith("@class.siw.ac.jp")
    );

    if (!isSIWUser) {
      router.push("/");
    }
  }, [isSignedIn, user, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!user || !neonid) {
        throw new Error("ユーザー情報が取得できません。");
      }

      await updateFullname(user.id, neonid, values.fullName);

      router.push("/register");
    } catch (error) {
      console.error("Error updating fullname:", error);
    }
  }

  // ローディング状態の表示
  if (isSignedIn === undefined || !user || isLoadingUserId) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Button variant="ghost" disabled>
          <ArrowLeft className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </Button>
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

      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-3">
              本名の登録
            </h1>
            <p className="text-muted-foreground">
              SIWのユーザーは、ライトニングトークの投稿にあたり本名の登録が必要です。
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>本名（フルネーム）</FormLabel>
                    <div className="mb-2" />
                    <FormControl>
                      <Input {...field} placeholder="例：山田 太郎" />
                    </FormControl>
                    <FormDescription>
                      公的書類に記載されている通りの本名を入力してください。姓と名の間にスペースを入れてください。
                    </FormDescription>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button variant="outline" type="submit" disabled={isLoading}>
                  {isLoading ? "更新中..." : "登録する"}
                </Button>
              </div>

              {updateError && (
                <div className="p-4">
                  <p className="text-red-400 text-sm">Error: {updateError}</p>
                </div>
              )}
            </form>
          </Form>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-xl">
          <h3 className="text-yellow-800 dark:text-yellow-200 font-medium mb-2">
            重要なお知らせ
          </h3>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm">
            個人情報の取り扱いについては、
            <Link href="/legal/privacy" className="underline mx-1">
              プライバシーポリシー
            </Link>
            をご参照ください。
          </p>
        </div>
      </div>
    </div>
  );
}
