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
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  role: "user" | "admin";
  following?: string[];
  followers?: string[];
  verified?: boolean;
  posts?: string[];
  accountType?: "basic" | "premium";
};

export type Tpost = {
  _id?: string;
  title: string;
  content: string;
  author: string;
  category: string;
  votes: number;
  createdAt: Date;
  isPremium: boolean;
  images: string[];
  videos: string[];
  comments: TComment[];
};

export type TComment = {
  _id?: string;
  content: string;
  author: string;
  post: string;
  createdAt?: Date;
};
