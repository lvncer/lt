export interface Talk {
  id: string;
  title: string;
  presenter: string;
  email: string;
  duration: number;
  topic: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  dateSubmitted: string;
  imageUrl?: string;
}

export type TalkFormData = Omit<Talk, 'id' | 'status' | 'dateSubmitted'>;