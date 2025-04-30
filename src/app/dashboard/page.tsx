"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SAMPLE_TALKS } from "@/lib/data";
import EditableTalkCard from "@/components/talks/EditableTalkCard";

export default function DashboardPage() {
  const userTalks = SAMPLE_TALKS.filter(
    (talk) => talk.email === "alex.j@example.com"
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </Button>

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              My Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your lightning talks and track their status
            </p>
          </div>
          <Button asChild>
            <Link href="/register">Submit New Talk</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Talks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userTalks.length}</div>
              <CardDescription>提出済み</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userTalks.filter((talk) => talk.status === "approved").length}
              </div>
              <CardDescription>準備済み</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userTalks.filter((talk) => talk.status === "pending").length}
              </div>
              <CardDescription>レビュー待ち</CardDescription>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Talks</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-6">
              {userTalks.map((talk) => (
                <EditableTalkCard key={talk.id} talk={talk} />
              ))}

              {userTalks.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No talks found</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="approved">
            <div className="space-y-6">
              {userTalks
                .filter((talk) => talk.status === "approved")
                .map((talk) => (
                  <EditableTalkCard key={talk.id} talk={talk} />
                ))}

              {userTalks.filter((talk) => talk.status === "approved").length ===
                0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No talks found</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="pending">
            <div className="space-y-6">
              {userTalks
                .filter((talk) => talk.status === "pending")
                .map((talk) => (
                  <EditableTalkCard key={talk.id} talk={talk} />
                ))}

              {userTalks.filter((talk) => talk.status === "pending").length ===
                0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No talks found</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="rejected">
            <div className="space-y-6">
              {userTalks
                .filter((talk) => talk.status === "rejected")
                .map((talk) => (
                  <EditableTalkCard key={talk.id} talk={talk} />
                ))}

              {userTalks.filter((talk) => talk.status === "rejected").length ===
                0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No talks found</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
