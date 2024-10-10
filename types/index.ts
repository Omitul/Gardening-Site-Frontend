import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type LoginData = {
  email: string;
  password: string;
};

export type registerData = {
  username: string;
  email: string;
  password: string;
};

export type TUser = {
  _id?: string;
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  role: "user" | "admin";
  following?: string[];
  followers?: string[];
  verified?: boolean;
  posts?: string[];
  favourites?: string[];
  accountType?: "basic" | "premium";
};

export type Tpost = {
  _id?: string;
  title: string;
  content: string;
  author: TUser;
  category: string;
  votes: number;
  createdAt: Date;
  isPremium: boolean;
  images: string[];
  videos: string[];
  upvoted: boolean;
  downvoted: boolean;
  comments: TComment[];
  upvotes: string[];
  downvotes: string[];
};

export type TComment = {
  _id?: string;
  content: string;
  author: string;
  post: string;
  createdAt?: Date;
};
