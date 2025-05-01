"use client";

import { useState } from "react";
import { Talk } from "@/types/talk";
import { SAMPLE_TALKS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Mail,
  ExternalLink,
  Clock,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Link from "next/link";

export default function AdminPage() {
  const [talks, setTalks] = useState<Talk[]>(SAMPLE_TALKS);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter talks based on search query
  const filteredTalks = talks.filter(
    (talk) =>
      talk.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talk.presenter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talk.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Count by status
  const pendingCount = talks.filter((talk) => talk.status === "pending").length;
  const approvedCount = talks.filter(
    (talk) => talk.status === "approved"
  ).length;
  const rejectedCount = talks.filter(
    (talk) => talk.status === "rejected"
  ).length;

  // Change talk status
  const updateTalkStatus = (
    id: number,
    status: "approved" | "rejected" | "pending"
  ) => {
    setTalks(
      talks.map((talk) => (talk.id === id ? { ...talk, status } : talk))
    );

    toast.success(
      `Talk ${status === "approved" ? "approved" : "rejected"} successfully`
    );
  };

  const renderStatusBadge = (status: string) => {
    if (status === "approved") {
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 border-green-200"
        >
          Approved
        </Badge>
      );
    } else if (status === "rejected") {
      return (
        <Badge
          variant="outline"
          className="bg-red-100 text-red-800 border-red-200"
        >
          Rejected
        </Badge>
      );
    } else {
      return (
        <Badge
          variant="outline"
          className="bg-yellow-100 text-yellow-800 border-yellow-200"
        >
          Pending
        </Badge>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          Manage lightning talk submissions, approve or reject talks, and
          oversee the schedule.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{pendingCount}</div>
              <div className="text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 w-8 h-8 rounded-full flex items-center justify-center">
                <AlertCircle className="h-5 w-5" />
              </div>
            </div>
            <CardDescription className="text-xs mt-2">
              Awaiting review
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{approvedCount}</div>
              <div className="text-green-500 bg-green-100 dark:bg-green-900/30 w-8 h-8 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
            <CardDescription className="text-xs mt-2">
              Ready for presentation
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{rejectedCount}</div>
              <div className="text-red-500 bg-red-100 dark:bg-red-900/30 w-8 h-8 rounded-full flex items-center justify-center">
                <XCircle className="h-5 w-5" />
              </div>
            </div>
            <CardDescription className="text-xs mt-2">
              Not approved
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="relative w-full max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search talks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 w-full"
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Talks</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Presenter</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTalks.map((talk) => (
                    <TableRow key={talk.id}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {talk.title}
                      </TableCell>
                      <TableCell className="max-w-[150px]">
                        <div className="truncate">{talk.presenter}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Mail className="h-3 w-3" />
                          {talk.email}
                        </div>
                      </TableCell>
                      <TableCell>{talk.topic}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          {talk.duration} min
                        </div>
                      </TableCell>
                      <TableCell>{renderStatusBadge(talk.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="ghost" asChild>
                            <Link href={`/talks/${talk.id}`} target="_blank">
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>

                          {talk.status !== "approved" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                              onClick={() =>
                                updateTalkStatus(talk.id, "approved")
                              }
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                          )}

                          {talk.status !== "rejected" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                              onClick={() =>
                                updateTalkStatus(talk.id, "rejected")
                              }
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}

                  {filteredTalks.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="text-muted-foreground">
                          No talks found
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Presenter</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTalks
                    .filter((talk) => talk.status === "pending")
                    .map((talk) => (
                      <TableRow key={talk.id}>
                        <TableCell className="font-medium max-w-[200px] truncate">
                          {talk.title}
                        </TableCell>
                        <TableCell className="max-w-[150px]">
                          <div className="truncate">{talk.presenter}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Mail className="h-3 w-3" />
                            {talk.email}
                          </div>
                        </TableCell>
                        <TableCell>{talk.topic}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            {talk.duration} min
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="ghost" asChild>
                              <Link href={`/talks/${talk.id}`} target="_blank">
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                              onClick={() =>
                                updateTalkStatus(talk.id, "approved")
                              }
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                              onClick={() =>
                                updateTalkStatus(talk.id, "rejected")
                              }
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                  {filteredTalks.filter((talk) => talk.status === "pending")
                    .length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="text-muted-foreground">
                          No pending talks
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Presenter</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTalks
                    .filter((talk) => talk.status === "approved")
                    .map((talk) => (
                      <TableRow key={talk.id}>
                        <TableCell className="font-medium max-w-[200px] truncate">
                          {talk.title}
                        </TableCell>
                        <TableCell className="max-w-[150px]">
                          <div className="truncate">{talk.presenter}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Mail className="h-3 w-3" />
                            {talk.email}
                          </div>
                        </TableCell>
                        <TableCell>{talk.topic}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            {talk.duration} min
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="ghost" asChild>
                              <Link href={`/talks/${talk.id}`} target="_blank">
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                              onClick={() =>
                                updateTalkStatus(talk.id, "rejected")
                              }
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                  {filteredTalks.filter((talk) => talk.status === "approved")
                    .length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="text-muted-foreground">
                          No approved talks
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Presenter</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTalks
                    .filter((talk) => talk.status === "rejected")
                    .map((talk) => (
                      <TableRow key={talk.id}>
                        <TableCell className="font-medium max-w-[200px] truncate">
                          {talk.title}
                        </TableCell>
                        <TableCell className="max-w-[150px]">
                          <div className="truncate">{talk.presenter}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Mail className="h-3 w-3" />
                            {talk.email}
                          </div>
                        </TableCell>
                        <TableCell>{talk.topic}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            {talk.duration} min
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="ghost" asChild>
                              <Link href={`/talks/${talk.id}`} target="_blank">
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                              onClick={() =>
                                updateTalkStatus(talk.id, "approved")
                              }
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                  {filteredTalks.filter((talk) => talk.status === "rejected")
                    .length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="text-muted-foreground">
                          No rejected talks
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
