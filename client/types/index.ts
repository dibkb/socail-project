export interface Post {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  threadId: string;
  likedIds: string[];
  image?: string;
  comments: string[];
}
export interface Threads {
  id: string;
  createdAt: string;
  updatedAt: string;
}
export interface Comment {
  id: string;
  body: string;
  userId: string;
  createdAt: string;
}
