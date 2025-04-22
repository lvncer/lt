"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Info } from "lucide-react";
import { TALK_TOPICS, TALK_DURATIONS } from "@/lib/data";
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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters",
    })
    .max(100, {
      message: "Title must not exceed 100 characters",
    }),
  presenter: z.string().min(2, {
    message: "Presenter name is required",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  duration: z.coerce
    .number()
    .min(5, {
      message: "Duration must be at least 5 minutes",
    })
    .max(20, {
      message: "Duration must not exceed 20 minutes",
    }),
  topic: z.string().min(1, {
    message: "Please select a topic",
  }),
  description: z
    .string()
    .min(20, {
      message: "Description must be at least 20 characters",
    })
    .max(500, {
      message: "Description must not exceed 500 characters",
    }),
});

export default function TalkForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      presenter: "",
      email: "",
      duration: 10,
      topic: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast.success("Talk submitted successfully!");
      setIsSubmitting(false);
      router.push("/talks");
    }, 1500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Talk Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your talk title" {...field} />
              </FormControl>
              <FormDescription>
                A catchy title that describes your talk
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="presenter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Presenter Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Talk Duration (minutes)</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value.toString()}
                    className="flex flex-wrap space-y-1"
                  >
                    {TALK_DURATIONS.map((duration) => (
                      <FormItem
                        key={duration}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={duration.toString()} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {duration} minutes
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TALK_TOPICS.map((topic) => (
                      <SelectItem key={topic} value={topic}>
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Talk Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe what your lightning talk will cover..."
                  className="resize-none min-h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a clear overview of what attendees will learn
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-4 flex gap-3">
          <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700 dark:text-blue-300">
            <p className="font-medium">Submission Guidelines</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Lightning talks should be concise and focused</li>
              <li>Prepare visual aids that are easy to read</li>
              <li>Practice your timing to fit within your selected duration</li>
              <li>Submissions are reviewed within 48 hours</li>
            </ul>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full md:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Lightning Talk"}
        </Button>
      </form>
    </Form>
  );
}
