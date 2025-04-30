import { useState } from "react";
import { Talk } from "@/types/talk";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Pencil, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
});

interface EditableTalkCardProps {
  talk: Talk;
}

export default function EditableTalkCard({ talk }: EditableTalkCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };

  const startEditing = () => {
    setIsEditing(true);
    form.reset({ title: talk.title, description: talk.description });
  };

  const cancelEditing = () => {
    setIsEditing(false);
    form.reset();
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast.success("Talk updated successfully!");
    setIsEditing(false);
  };

  return (
    <Card>
      <CardContent className="p-6">
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Talk title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Talk description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-2">
                <Button type="submit" size="sm">
                  <Save className="h-4 w-4 mr-1" />
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={cancelEditing}
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <>
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge variant="outline" className={statusColors[talk.status]}>
                  {talk.status.charAt(0).toUpperCase() + talk.status.slice(1)}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={startEditing}>
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{talk.title}</h3>
              <p className="text-muted-foreground">{talk.description}</p>
            </div>

            {talk.image_url && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
                <Image
                  src={talk.image_url}
                  alt={talk.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div>Topic: {talk.topic}</div>
              <div>Duration: {talk.duration} minutes</div>
              <div>
                Submitted: {new Date(talk.date_submitted).toLocaleDateString()}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
