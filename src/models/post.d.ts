export type PostBody = {
  id: string;
  userId: string;
  userName: string;
  userImg?: string;
  postTime: { _seconds: number; _nanoseconds: number };
  post: string;
  postImg?: string;
  liked?: boolean;
  likes?: number;
  comments?: null;
};
