"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import { Tpost } from "@/types";
import { getAuthor, getUser } from "@/src/services/authService";
import axios from "axios";

export default function PostCard({ post }: { post: Tpost }) {
  const {
    _id,
    title,
    content,
    author,
    category,
    votes,
    isPremium,
    images,
    comments,
  } = post;

  const [isFollowed, setIsFollowed] = useState(false);
  const [Authorname, setAuthorname] = useState("");
  const [Authoremail, setAuthoremail] = useState("");
  const [currentVotes, setCurrentVotes] = useState(votes);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const setUser = async () => {
      try {
        const User = await getUser();
        const Author = await getAuthor(author);
        console.log("Author", Author.username);
        const { email, _id } = User;
        setAuthorname(Author?.username);
        setAuthoremail(Author?.email);
        setUserId(_id);
        console.log("USERID", _id);
        console.log("AUTHORID", author);
        console.log("EMAIL", email);
      } catch (error) {
        console.error("Failed fetching user:", error);
      }
    };
    setUser();
  }, []);

  const handleUpvote = () => {
    setCurrentVotes((prev) => prev + 1);
  };

  const handleDownvote = () => {
    setCurrentVotes((prev) => Math.max(0, prev - 1));
  };

  return (
    <Card className="mx-auto max-w-[1000px] mt-10 p-8">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="https://nextui.org/avatars/avatar-1.png"
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {Authorname}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @{Authoremail}
            </h5>
          </div>
        </div>
        {userId && author && userId.toString() !== author.toString() && (
          <div>
            <Button
              className={
                isFollowed
                  ? "bg-blue-700 text-foreground border-default-200"
                  : ""
              }
              color="primary"
              radius="full"
              size="sm"
              variant={isFollowed ? "bordered" : "solid"}
              //   onPress={handleFollow}
            >
              {isFollowed ? "Unfollow" : "Follow"}
            </Button>
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <h4 className="font-semibold text-default-600">{title}</h4>
        <p>{content}</p>
        {images.length > 0 && (
          <div className="my-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className="w-full h-auto"
              />
            ))}
          </div>
        )}
        <span className="pt-2">#{category}</span>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">
            {comments.length}
          </p>
          <p className="text-default-400 text-small">comments</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">
            {currentVotes}
          </p>
          <p className="text-default-400 text-small">votes</p>
        </div>
        {isPremium && (
          <span className="text-red-600 font-semibold">Premium Post</span>
        )}
        <div className="flex gap-2">
          <Button size="sm" variant="bordered" onPress={handleUpvote}>
            Upvote
          </Button>
          <Button size="sm" variant="bordered" onPress={handleDownvote}>
            Downvote
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
