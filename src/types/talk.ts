export type Talk = {
  id: number;
  title: string;
  presenter: string;
  email: string;
  duration: number;
  topic: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  date_submitted: string;
  image_url: string;
  user_id: number;
};
