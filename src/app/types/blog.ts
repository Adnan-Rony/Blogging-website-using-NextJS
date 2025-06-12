export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
    email: string;
  } | string;
  image: string;
  categories: string[];
  tags: string[];
  comments: string[]; // Or Comment[]
  status: 'published' | 'pending' | 'rejected';
  likes: string[];
  createdAt: string;
}
