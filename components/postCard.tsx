"use client";

import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown, FaEllipsisV } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { TComment, Tpost, TUser } from "@/types";
import {
  getAuthor,
  getUser,
  updateAuthor,
  updateUser,
} from "@/src/services/authService";
import { CommentCard } from "./commentCard";
import {
  deleteComment,
  getComments,
  updateComment,
} from "@/src/services/commentService";
import CommentPostCard from "./commentPostCard";
import {
  deletePost,
  getPostById,
  UpdatePost,
} from "@/src/services/postService";
import Swal from "sweetalert2";

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
  const [AuthorId, setAuthorId] = useState("");
  const [currentVotes, setCurrentVotes] = useState<number>(votes | 0);
  const [following, setFollowing] = useState<string[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);
  const [userId, setUserId] = useState("");
  const [visibleComments, setVisibleComments] = useState(false);
  const [comments, setComments] = useState<TComment[]>([]);
  const [Upvoted, setUpvoted] = useState(false);
  const [Downvoted, setDownvoted] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newContent, setNewContent] = useState(post.content);
  const [newTitle, setnewTitle] = useState(post.title);
  const [newCategory, setnewCategory] = useState(category);

  useEffect(() => {
    const SetStates = async () => {
      try {
        const User = await getUser();
        const Author = await getAuthor(author._id as string);
        const res = await getComments(postId as string);
        const data = await getPostById(author._id as string);
        // console.log("voter jnno", data.data[0]); // data te array wise data ache tai
        setCurrentVotes(data?.data[0].votes);
        setDownvoted(data?.data[0].downvoted);
        setUpvoted(data?.data[0].upvoted);
        setComments(res.data);
        // console.log("asche comments:", res);
        // console.log("upvoted", Upvoted);
        // console.log("Author", Author.username);
        let userId;
        if (User !== undefined) {
          userId = User._id;
        }
        // console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", userId);
        setUserId(userId);
        setFollowers(User.followers);
        setFollowing(User.followers);
        // console.log("USERID", _id);
        // console.log("AUTHORID", author);
      } catch (error) {
        console.error("Failed fetching user:", error);
      }
    };

    SetStates();
  }, []);

  const handleFollow = async () => {
    if (userId && userId !== author._id) {
      const FollowOrNot = !isFollowed;
      setIsFollowed(FollowOrNot);

      let updatedFollowing: string[];
      let updatedFollowers: string[];

      if (FollowOrNot) {
        updatedFollowing = [...following, ...(author?._id ? [author._id] : [])];
        updatedFollowers = [...followers, userId];
      } else {
        updatedFollowing = following.filter((f) => f !== author?._id);
        updatedFollowers = followers.filter((f) => f !== userId);
      }

      // console.log("Updated Following:", updatedFollowing);
      // console.log("Updated Followers:", updatedFollowers);

      try {
        await updateUser(userId as string, {
          following: updatedFollowing,
        });
      } catch (error) {
        console.error("Failed to update user:", error);
      }

      try {
        await updateAuthor(author._id as string, {
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

  const handleEdit = async (commentId: string, newContent: string) => {
    const res = await updateComment(commentId, { content: newContent });
    console.log(res);

    if (res.success)
      ///setting newly added comment, id check kore
      setComments((prevComments) =>
        prevComments.map((comment: TComment) =>
          comment._id === commentId
            ? { ...comment, content: newContent }
            : comment
        )
      );
  };

  const handleDelete = (commentId: string) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteComment(commentId);
        if (res.success) {
          Swal.fire({
            title: "Success",
            text: "Comment deleted successfully!",
            icon: "success",
          });
          setComments(
            (prev) => prev.filter((comment) => comment._id !== commentId) //state update kore dicchi
          );
        } else {
          Swal.fire({
            title: "Error",
            text: "Error deleting comment!",
            icon: "error",
          });
        }
      }
    });
  };

  const handleUpvote = async () => {
    if (userId === author._id) {
      Swal.fire({
        text: "You can't upvote your post!",
        icon: "error",
      });
      return;
    }
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
    if (!userId) {
      Swal.fire({
        text: "You can't downvote! login first!",
        icon: "error",
      });
      return;
    }
    if (userId === author._id) {
      Swal.fire({
        text: "You can't downvote your post!",
        icon: "error",
      });
      return;
    }
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

  const handleAddtoFavourite = async () => {
    if (!userId) {
      Swal.fire({
        text: `Login first or Get registered!`,
        icon: "error",
      });
      return;
    }
    const User = await getUser();
    console.log("User", User);

    try {
      // data update koro in database to add favourites to the database
      // part: after getting postId, Send an API request or update states as necessary, jodi states thake

      const updatedFavourites = User.favourites.includes(postId)
        ? User.favourites
        : [...User.favourites, postId];

      const res = await updateUser(userId as string, {
        favourites: updatedFavourites,
      });

      console.log("res", res);
      if (res.success) {
        Swal.fire({
          title: "Success",
          text: "Post added to favourites!",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error adding to favourites:", error);
      Swal.fire({
        title: "Already Added",
        text: `Error adding to favourites or the post is already added!`,
      });
    }
  };

  const handleEditPost = async () => {
    console.log(newContent);
    try {
      const res = await UpdatePost({ content: newContent }, postId as string);
      console.log("res ekhanei?", res);

      if (res?.success) {
        Swal.fire({
          title: "Success",
          text: "Post updated successfully!",
          icon: "success",
        });
      }
      onOpenChange();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error updating post!",
        icon: "error",
      });
    }
  };
  const handleDeletePost = async () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deletePost(postId as string);
        console.log(res);
        if (res.success) {
          Swal.fire({
            title: "Success",
            text: "Post deleted successfully!",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Error deleting post!",
            icon: "error",
          });
        }
      }
    });
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
              src={post.author?.profilePicture}
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {post.author?.username}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                {post.author?.email}
              </h5>
            </div>
          </div>
          {userId &&
            author._id &&
            userId.toString() !== author._id.toString() && (
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
          <h4 className="text-black font-semi-bold text-3xl">{newTitle}</h4>
          <h5 className="pt-2 text-gray-500 text-2xl font-semibold">
            {newCategory}
          </h5>

          <p className="mt-8 text-black text-xl">{newContent}</p>
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

          {userId === author._id && (
            <div className="relative">
              <button
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 ml-auto"
                onClick={onOpen}
              >
                <FaEllipsisV />
              </button>
            </div>
          )}

          <div>
            <span
              className="cursor-pointer text-orange-600 ml-96 font-semi-bold hover:text-orange-900"
              onClick={() => handleAddtoFavourite()}
            >
              Add to favourites
            </span>
          </div>
        </CardFooter>
      </Card>
      {comments.length > 0 ? (
        comments.map((comment: TComment) => (
          <CommentCard
            key={comment._id}
            comment={comment}
            visibleComments={visibleComments}
            onEdit={(newContent) =>
              handleEdit(comment._id as string, newContent)
            }
            onDelete={() => handleDelete(comment._id as string)}
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
          onEdit={() => {}}
          onDelete={() => {}}
          visibleComments={visibleComments}
        />
      )}
      {visibleComments && (
        <CommentPostCard
          userId={userId}
          postId={postId as string}
          setVisibleComments={(visible: boolean) => {
            setVisibleComments(visible);
            return visible;
          }}
          setComments={setComments}
        />
      )}

      <div className="max-w-6 mx-auto z-50">
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <ModalHeader>Edit Post</ModalHeader>
            <ModalBody>
              <Input
                value={newTitle}
                onChange={(e) => setnewTitle(e.target.value)}
                label="Title"
                placeholder="Enter post title"
              />
            </ModalBody>

            <ModalBody>
              <Input
                value={newCategory}
                onChange={(e) => setnewCategory(e.target.value)}
                label="Category"
                placeholder="Enter post category"
              />
            </ModalBody>

            <ModalBody>
              <Input
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                label="Content"
                placeholder="Enter post content"
              />
            </ModalBody>

            <ModalFooter>
              <Button onPress={onOpenChange}>Cancel</Button>
              <Button onPress={handleEditPost}>Save Changes</Button>
              <Button onPress={handleDeletePost}>Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
