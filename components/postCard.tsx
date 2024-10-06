"use client";

import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import { TComment, Tpost } from "@/types";
import {
  getAuthor,
  getUser,
  updateAuthor,
  updateUser,
} from "@/src/services/authService";
import { CommentCard } from "./commentCard";
import { getComments } from "@/src/services/commentService";
import CommentPostCard from "./commentPostCard";
import { getPostById, UpdatePost } from "@/src/services/postService";

export default function PostCard({ post }: { post: Tpost }) {
  const {
    _id: postId,
    title,
    content,
    author,
    category,
    votes,
    isPremium,
    images,
  } = post;

  const [isFollowed, setIsFollowed] = useState(false);
  const [Authorname, setAuthorname] = useState("");
  const [Authoremail, setAuthoremail] = useState("");
  const [currentVotes, setCurrentVotes] = useState<number>(votes | 0);
  const [following, setFollowing] = useState<string[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);
  const [userId, setUserId] = useState("");
  const [visibleComments, setVisibleComments] = useState(false);
  const [comments, setComments] = useState<TComment[]>([]);
  const [Upvoted, setUpvoted] = useState(false);
  const [Downvoted, setDownvoted] = useState(false);

  useEffect(() => {
    const setUser = async () => {
      try {
        const User = await getUser();
        const Author = await getAuthor(author);
        const res = await getComments(postId as string);
        const data = await getPostById(author as string);
        console.log("voter jnno", data.data[0]); // data te array wise data ache tai
        setCurrentVotes(data?.data[0].votes);
        setDownvoted(data?.data[0].downvoted);
        setUpvoted(data?.data[0].upvoted);
        setComments(res.data);
        console.log("asche comments:", res);
        console.log("upvoted", Upvoted);
        console.log("Author", Author.username);
        const { email, _id } = User;
        setAuthorname(Author?.username);
        setAuthoremail(Author?.email);
        setUserId(_id);
        setFollowers(User.followers);
        setFollowing(User.followers);
        console.log("USERID", _id);
        console.log("AUTHORID", author);
      } catch (error) {
        console.error("Failed fetching user:", error);
      }
    };

    setUser();
  }, []);

  const handleFollow = async () => {
    if (userId && userId !== author) {
      const FollowOrNot = !isFollowed;
      setIsFollowed(FollowOrNot);

      let updatedFollowing;
      let updatedFollowers;

      if (FollowOrNot) {
        updatedFollowing = [...following, author];
        updatedFollowers = [...followers, userId];
      } else {
        updatedFollowing = following.filter((f) => f !== author);
        updatedFollowers = followers.filter((f) => f !== userId);
      }

      console.log("Updated Following:", updatedFollowing);
      console.log("Updated Followers:", updatedFollowers);

      try {
        await updateUser(userId, {
          following: updatedFollowing,
        });
      } catch (error) {
        console.error("Failed to update user:", error);
      }

      try {
        await updateAuthor(author, {
          followers: updatedFollowers,
        });
      } catch (error) {
        console.error("Failed to update Author:", error);
      }

      setFollowing(updatedFollowing);
      setFollowers(updatedFollowers);
    } else {
      console.log("You cannot follow yourself."); //actually don't need this karon nijer post e user button e dekhbena
    }
  };
  const toggleCommentsVisibility = async () => {
    const res = await getComments(postId as string);
    console.log("asche comment?", res);
    setVisibleComments((prev) => !prev);
  };

  const handleUpvote = async () => {
    const newVoteCount = Upvoted ? currentVotes - 1 : currentVotes + 1;
    let updatedVoteCount = Math.max(newVoteCount, 0);
    setCurrentVotes(updatedVoteCount);
    setUpvoted(!Upvoted);
    if (Downvoted) {
      setDownvoted(false);
      updatedVoteCount += 1;
      setCurrentVotes(updatedVoteCount);
    }

    try {
      await UpdatePost(
        { votes: updatedVoteCount, upvoted: !Upvoted, downvoted: false },
        postId as string
      );
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  const handleDownvote = async () => {
    const newVoteCount = Downvoted ? currentVotes + 1 : currentVotes - 1;
    let updatedVoteCount = newVoteCount;
    setCurrentVotes(updatedVoteCount);
    setDownvoted(!Downvoted);
    if (Upvoted) {
      setUpvoted(false);
      updatedVoteCount -= 1;
      setCurrentVotes(updatedVoteCount);
    }

    try {
      await UpdatePost(
        { votes: updatedVoteCount, downvoted: !Downvoted, upvoted: false },
        postId as string
      );
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  return (
    <div>
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
                {Authoremail}
              </h5>
            </div>
          </div>
          {userId && author && userId.toString() !== author.toString() && (
            <div>
              <Button
                className={
                  !isFollowed
                    ? "bg-blue-500 text-foreground border-default-200"
                    : "bg-gray-500 text-foreground border-default-200"
                }
                color="primary"
                radius="full"
                size="sm"
                variant={isFollowed ? "bordered" : "solid"}
                onPress={handleFollow}
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
          <span className="pt-2">{category}</span>
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1 items-center justify-center">
            <p className="font-semibold text-default-500 text-small">
              {comments.length}
            </p>
            <span
              className="text-default-500 cursor-pointer"
              onClick={() => toggleCommentsVisibility()}
            >
              comments
            </span>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold text-default-500 text-small">
              {currentVotes}
            </p>
            <p className="text-default-500 text-small">votes</p>
          </div>
          {isPremium && (
            <span className="text-red-600 font-semibold">Premium Post</span>
          )}
          <div className="flex">
            <Button
              size="sm"
              variant="bordered"
              onPress={handleUpvote}
              className={Upvoted ? "bg-orange-500" : ""}
            >
              <FaArrowUp />
            </Button>
            <Button
              size="sm"
              variant="bordered"
              onPress={handleDownvote}
              className={Downvoted ? "bg-blue-500" : ""}
            >
              <FaArrowDown />
            </Button>
          </div>
        </CardFooter>
      </Card>
      {comments.length > 0 ? (
        comments.map((comment: TComment) => (
          <CommentCard
            key={comment._id}
            comment={comment}
            visibleComments={visibleComments}
          />
        ))
      ) : (
        <CommentCard ///no comments
          comment={{
            _id: "",
            content: "",
            author: "",
            post: "",
            createdAt: new Date(),
          }}
          visibleComments={visibleComments}
        />
      )}
      {visibleComments && (
        <CommentPostCard userId={userId} postId={postId as string} />
      )}
    </div>
  );
}
