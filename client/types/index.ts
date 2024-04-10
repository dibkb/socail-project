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
export interface Threadsfull {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  posts: Post[];
}
export interface Comment {
  id: string;
  body: string;
  userId: string;
  createdAt: string;
}
enum ntype {
  LIKE = "LIKE",
  FOLLOW = "FOLLOW",
  COMMENT = "COMMENT",
}
export interface Notification {
  userId: string;
  id: string;
  createdAt: string;
  type: keyof typeof ntype;
  creatorId: string;
}
