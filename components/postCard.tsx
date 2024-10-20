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
import Swal from "sweetalert2";

import { CommentCard } from "./commentCard";
import CommentPostCard from "./commentPostCard";

import { TComment, Tpost } from "@/types";
import {
  getAuthor,
  getUser,
  updateAuthor,
  updateUser,
} from "@/src/services/authService";
import {
  deleteComment,
  getComments,
  updateComment,
} from "@/src/services/commentService";
import {
  deletePost,
  getPostById,
  UpdatePost,
} from "@/src/services/postService";

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
  const [role, setRole] = useState("");
  const [visibleComments, setVisibleComments] = useState(false);
  const [comments, setComments] = useState<TComment[]>([]);
  const [upvotes, setUpvotes] = useState<string[]>([]);
  const [downvotes, setDownvotes] = useState<string[]>([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newContent, setNewContent] = useState(post.content);
  const [newTitle, setnewTitle] = useState(post.title);
  const [newCategory, setnewCategory] = useState(category);

  useEffect(() => {
    const SetStates = async () => {
      try {
        const User = await getUser();

        // console.log("eire eitai user", User);
        setRole(User.role);
        const Author = await getAuthor(author._id as string);
        const res = await getComments(postId as string);
        const data = await getPostById(author._id as string);
        const matchedPost = data.data.find((post: any) => post._id === postId);

        // console.log("voter jnno", data.data[0]); // data te array wise data ache tai
        // console.log("etaire bhai", data);
        // console.log("matchedpost", matchedPost);
        setCurrentVotes(matchedPost.votes);
        setDownvotes(matchedPost.downvotes);
        setUpvotes(matchedPost.upvotes);
        setComments(res.data);
        // console.log("asche comments:", res);
        // console.log("upvoted", Upvoted);
        // console.log("Author", Author.username);
        let userId;

        if (User) {
          userId = User._id;
        }
        // console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", userId);
        setUserId(userId);
        setFollowers(User.followers);
        setFollowing(User.following);
        // console.log("USERID", _id);
        // console.log("AUTHORID", author);
      } catch (error) {
        console.error("Failed fetching user:", error);
      }
    };

    SetStates();
  }, []);

  const handleFollow = async () => {
    if (userId === author._id) {
      Swal.fire({
        text: "You can't follow yourself!",
        icon: "error",
      });

      return;
    }

    const isAuthorFollowed = following.some(
      (following_) => following_ === author._id
    );

    if (isAuthorFollowed) {
      Swal.fire({
        text: "You are following him already!",
      });

      return;
    }

    Swal.fire({
      text: "You are following him!",
      icon: "success",
    });

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
      // console.log("You cannot follow yourself."); //actually don't need this karon nijer post e user button e dekhbena
    }
  };
  const toggleCommentsVisibility = async () => {
    const res = await getComments(postId as string);

    // console.log("asche comment?", res);
    setVisibleComments((prev) => !prev);
  };

  const handleEdit = async (commentId: string, newContent: string) => {
    const res = await updateComment(commentId, { content: newContent });

    // console.log(res);

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
    if (!userId) {
      Swal.fire({ text: "Log in first!", icon: "error" });

      return;
    }
    if (userId === author._id) {
      Swal.fire({ text: "You can't upvote your own post!", icon: "error" });

      return;
    }

    let updatedUpvotes = Array.isArray(upvotes) ? [...upvotes] : [];
    let updatedDownvotes = Array.isArray(downvotes) ? [...downvotes] : [];

    let newVotes = currentVotes;

    if (updatedUpvotes.includes(userId)) {
      // console.log("ase");
      updatedUpvotes = updatedUpvotes.filter((id) => id !== userId); //age click kore thakle
      newVotes -= 1;
    } else {
      updatedUpvotes.push(userId);
      newVotes += 1;

      if (updatedDownvotes.includes(userId)) {
        // console.log("??");
        updatedDownvotes = updatedDownvotes.filter((id) => id !== userId); // if downvote button is pressed
        newVotes += 1;
      }
    }
    setCurrentVotes(newVotes);
    setUpvotes(updatedUpvotes);
    setDownvotes(updatedDownvotes);

    try {
      await UpdatePost(
        {
          votes: newVotes,
          upvotes: updatedUpvotes,
          downvotes: updatedDownvotes,
        } as Partial<Tpost>,
        postId as string
      );
      setCurrentVotes(newVotes);
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  const handleDownvote = async () => {
    if (!userId) {
      Swal.fire({ text: "Log in first!", icon: "error" });

      return;
    }
    if (userId === author._id) {
      Swal.fire({ text: "You can't downvote your own post!", icon: "error" });

      return;
    }

    let updatedUpvotes = Array.isArray(upvotes) ? [...upvotes] : [];
    let updatedDownvotes = Array.isArray(downvotes) ? [...downvotes] : [];

    let newVotes = currentVotes;

    if (updatedDownvotes.includes(userId)) {
      // console.log("ase");
      updatedDownvotes = updatedDownvotes.filter((id) => id !== userId); //age click kore thakle
      newVotes += 1;
    } else {
      updatedDownvotes.push(userId);
      newVotes -= 1;

      if (updatedUpvotes.includes(userId)) {
        // console.log("??");
        updatedUpvotes = updatedUpvotes.filter((id) => id !== userId); // if upvote button is pressed
        newVotes -= 1;
      }
    }
    setCurrentVotes(newVotes);
    setUpvotes(updatedUpvotes);
    setDownvotes(updatedDownvotes);

    try {
      await UpdatePost(
        {
          votes: newVotes,
          upvotes: updatedUpvotes,
          downvotes: updatedDownvotes,
        } as Partial<Tpost>,
        postId as string
      );
      setCurrentVotes(newVotes);
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  const handleAddtoFavourite = async () => {
    // console.log("userId", userId);
    if (!userId) {
      Swal.fire({
        text: `Login first or Get registered!`,
        icon: "error",
      });

      return;
    }
    const User = await getUser();

    // console.log("User", User);
    if (!User._id) {
      Swal.fire({
        text: "User not found!",
        icon: "error",
      });

      return;
    } // console.log("Updated Following:", updatedFollowing);
    // console.log("Updated Followers:", updatedFollowers);

    // data update koro in database to add favourites to the database
    // part: after getting postId, Send an API request or update states as necessary, jodi states thake

    ///object entry nicchilo as i populated
    const favouriteIds = Array.isArray(User?.favourites)
      ? User.favourites.map((favourite: Tpost) =>
          typeof favourite === "string" ? favourite : favourite._id
        )
      : [];
    const updatedFavourites = favouriteIds.includes(postId)
      ? favouriteIds
      : [...favouriteIds, postId];

    // console.log("FAVOURITES", updatedFavourites);

    try {
      const res = await updateUser(userId, {
        favourites: updatedFavourites,
      });

      // console.log("res", res);
      if (res.success) {
        Swal.fire({
          title: "Success",
          text: "Post added to favourites!",
          icon: "success",
        });
      } else {
        throw new Error("Failed to update favourites");
      }
    } catch (error: any) {
      // console.error("API request error:", error.message);
      Swal.fire({
        text: "Failed to add post to favourites.",
        icon: "error",
      });
    }
  };

  const handleEditPost = async () => {
    // console.log(newContent);
    try {
      const res = await UpdatePost(
        { content: newContent, title: newTitle, category: newCategory },
        postId as string
      );

      // console.log("res ekhanei?", res);

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

        // console.log(res);
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
                  className="bg-blue-500 text-foreground border-default-200"
                  color="primary"
                  radius="full"
                  size="sm"
                  variant={isFollowed ? "bordered" : "solid"}
                  onPress={handleFollow}
                >
                  Follow
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
                <img key={index} alt="" className="w-full h-auto" src={image} />
              ))}
            </div>
          )}
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1 items-center justify-center">
            <p className="font-semibold text-default-500 text-small">
              {comments.length}
            </p>
            <button
              className="text-default-500 cursor-pointer"
              onClick={() => toggleCommentsVisibility()}
            >
              comments
            </button>
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
              className="bg-orange-500"
              size="sm"
              variant="bordered"
              onPress={() => handleUpvote()}
            >
              <FaArrowUp />
            </Button>
            <Button
              className="bg-blue-500"
              size="sm"
              variant="bordered"
              onPress={() => handleDownvote()}
            >
              <FaArrowDown />
            </Button>
          </div>

          {userId === author._id ? (
            <div className="relative">
              <button
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 ml-auto"
                onClick={onOpen}
              >
                <FaEllipsisV />
              </button>
            </div>
          ) : role === "admin" ? (
            <Button
              className="bg-red-500 font-bold"
              variant="flat"
              onPress={handleDeletePost}
            >
              Delete
            </Button>
          ) : null}
          <div>
            <button
              className="cursor-pointer text-orange-600 ml-96 font-semi-bold hover:text-orange-900"
              onClick={() => handleAddtoFavourite()}
            >
              Add to favourites
            </button>
          </div>
        </CardFooter>
      </Card>
      {comments.length > 0 ? (
        comments.map((comment: TComment) => (
          <CommentCard
            key={comment._id}
            comment={comment}
            visibleComments={visibleComments}
            onDelete={() => handleDelete(comment._id as string)}
            onEdit={(newContent) =>
              handleEdit(comment._id as string, newContent)
            }
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
          onDelete={() => {}}
          onEdit={() => {}}
        />
      )}
      {visibleComments && (
        <CommentPostCard
          postId={postId as string}
          setComments={setComments}
          setVisibleComments={(visible: boolean) => {
            setVisibleComments(visible);

            return visible;
          }}
          userId={userId}
        />
      )}

      <div className="max-w-6 mx-auto z-50">
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <ModalHeader>Edit Post</ModalHeader>
            <ModalBody>
              <Input
                label="Title"
                placeholder="Enter post title"
                value={newTitle}
                onChange={(e) => setnewTitle(e.target.value)}
              />
            </ModalBody>

            <ModalBody>
              <Input
                label="Category"
                placeholder="Enter post category"
                value={newCategory}
                onChange={(e) => setnewCategory(e.target.value)}
              />
            </ModalBody>

            <ModalBody>
              <Input
                label="Content"
                placeholder="Enter post content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
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
