"use client";

import { useState, useEffect, ChangeEvent } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import uploadImage from "@/src/lib/imageUpload";
import { getDecodedData } from "@/src/lib/jwtDecode";
import { Post } from "@/src/services/postService";
import { Tpost } from "@/types";

interface PostModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onOpenChange }) => {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // console.log("Selected files:", files);

      const uploadedURLs = await Promise.all(
        files.map(async (file) => {
          // console.log(`Uploading file: ${file.name}`);
          try {
            const uploadedUrl = await uploadImage(file);

            // console.log("Uploaded image URL:", uploadedUrl); // checking url asche kina

            return uploadedUrl;
          } catch (error) {
            console.error("Error uploading to ImgBB:", error);

            return null;
          }
        })
      );

      const successfulUploads = uploadedURLs.filter(
        (url): url is string => url !== null
      );

      // console.log("uploads:", successfulUploads);
      setImages((prevImages) => [...prevImages, ...successfulUploads]);
    } else {
      // console.log("No files selected man!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await getDecodedData();

      if (!data || !data.userId) {
        throw new Error("Failed to fetch user data");
      }

      const parser = new DOMParser();
      const parsedContent =
        parser.parseFromString(content, "text/html").body.textContent || "";

      const postData = {
        title,
        content: parsedContent,
        images: images,
        videos: [],
        author: data.userId,
        votes: 0,
        createdAt: new Date(),
        category: category,
        comments: [],
        upvotes: [],
        downvotes: [],
        upvoted: false,
        downvoted: false,
        isPremium: false,
      };

      // console.log("Post Data: ", postData);

      const res = await Post(postData as Tpost);

      // console.log(res);
      if (res.success) {
        Swal.fire({
          title: "Success",
          text: "Post uploaded successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          window.location.reload();
        });
      } else {
        // console.log("there was a problem craeting post");
        Swal.fire({
          title: "Error",
          text: "Error creating post!",
          icon: "error",
        });
      }

      // Reset form fields.........
      setContent("");
      setCategory("");
      setImages([]);
      onOpenChange(false);
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("Error creating post. Please try again.");
    }
  };

  useEffect(() => {
    // console.log("Images state updated:", images);
  }, [images]);

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader>Create a New Post</ModalHeader>
              <ModalBody>
                <input
                  className="w-full mt-2 mb-4 border border-gray-300 rounded-lg p-2"
                  placeholder="Enter Post Title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Select
                  placeholder="Select a category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <SelectItem key="Vegetables" value="Vegetables">
                    Vegetables
                  </SelectItem>
                  <SelectItem key="Flowers" value="Flowers">
                    Flowers
                  </SelectItem>
                  <SelectItem key="Landscaping" value="Landscaping">
                    Landscaping
                  </SelectItem>
                  <SelectItem key="Fruit Trees" value="Fruit Trees">
                    Fruit Trees
                  </SelectItem>
                  <SelectItem key="Shade Trees" value="Shade Trees">
                    Shade Trees
                  </SelectItem>
                  <SelectItem key="Deciduous Trees" value="Deciduous Trees">
                    Deciduous Trees
                  </SelectItem>
                  <SelectItem key="Medicinal Trees" value="Medicinal Trees">
                    Medicinal Trees
                  </SelectItem>
                </Select>
                <input
                  multiple
                  className="mt-2 border border-gray-300 rounded-lg p-2"
                  type="file"
                  onChange={handleImageUpload}
                />
                <ReactQuill
                  className="mt-4"
                  placeholder="Write your gardening tips and guides here..."
                  value={content}
                  onChange={setContent}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="faded" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PostModal;
