import { Talk } from './types';

export const SAMPLE_TALKS: Talk[] = [
  {
    id: '1',
    title: 'The Future of React Server Components',
    presenter: 'Alex Johnson',
    email: 'alex.j@example.com',
    duration: 10,
    topic: 'React',
    description: 'An exploration of React Server Components and how they change the way we build React applications.',
    status: 'approved',
    dateSubmitted: '2025-01-15T12:00:00Z',
    imageUrl: 'https://images.pexels.com/photos/7108/notebook-computer-chill-relax.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    title: 'Building Accessible UIs',
    presenter: 'Samantha Lee',
    email: 'sams@example.com',
    duration: 15,
    topic: 'Accessibility',
    description: 'Best practices for creating web applications that are accessible to everyone.',
    status: 'approved',
    dateSubmitted: '2025-01-18T14:30:00Z',
    imageUrl: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    title: 'Next.js App Router Tips and Tricks',
    presenter: 'Michael Chen',
    email: 'mchen@example.com',
    duration: 5,
    topic: 'Next.js',
    description: 'Learn advanced techniques for working with the Next.js App Router for better performance and DX.',
    status: 'pending',
    dateSubmitted: '2025-01-20T09:15:00Z',
    imageUrl: 'https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '4',
    title: 'The Power of TypeScript Generics',
    presenter: 'Emma Rodriguez',
    email: 'emmar@example.com',
    duration: 10,
    topic: 'TypeScript',
    description: 'A deep dive into TypeScript generics and how they can make your code more flexible and reusable.',
    status: 'approved',
    dateSubmitted: '2025-01-19T16:45:00Z',
    imageUrl: 'https://images.pexels.com/photos/7115104/pexels-photo-7115104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '5',
    title: 'Client-side State Management in 2025',
    presenter: 'David Kwon',
    email: 'dkwon@example.com',
    duration: 15,
    topic: 'State Management',
    description: 'Comparing modern state management solutions and when to use each one.',
    status: 'rejected',
    dateSubmitted: '2025-01-17T11:20:00Z',
    imageUrl: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
];

// Helper function to get talks by status
export function getTalksByStatus(status?: 'pending' | 'approved' | 'rejected') {
  if (!status) return SAMPLE_TALKS;
  return SAMPLE_TALKS.filter(talk => talk.status === status);
}

// Helper function to get a talk by ID
export function getTalkById(id: string): Talk | undefined {
  return SAMPLE_TALKS.find(talk => talk.id === id);
}

// Topics for the dropdown
export const TALK_TOPICS = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'CSS',
  'Accessibility',
  'Performance',
  'Testing',
  'DevOps',
  'State Management',
  'Mobile Development',
  'AI/ML',
  'Data Visualization',
  'Web3',
  'Other'
];

// Duration options in minutes
export const TALK_DURATIONS = [5, 10, 15, 20];