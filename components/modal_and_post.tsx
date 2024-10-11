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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import uploadImage from "@/src/lib/imageUpload";
import { getDecodedData } from "@/src/lib/jwtDecode";
import { Post } from "@/src/services/postService";
import { toast } from "react-toastify";
import { Tpost } from "@/types";
import Swal from "sweetalert2";

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
      console.log("Selected files:", files);

      const uploadedURLs = await Promise.all(
        files.map(async (file) => {
          console.log(`Uploading file: ${file.name}`);
          try {
            const uploadedUrl = await uploadImage(file);
            console.log("Uploaded image URL:", uploadedUrl); // checking url asche kina
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

      console.log("uploads:", successfulUploads);
      setImages((prevImages) => [...prevImages, ...successfulUploads]);
    } else {
      console.log("No files selected man!");
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

      console.log("Post Data: ", postData);

      const res = await Post(postData as Tpost);
      console.log(res);
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
        console.log("there was a problem craeting post");
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
    console.log("Images state updated:", images);
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
                  type="text"
                  placeholder="Enter Post Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mt-2 mb-4 border border-gray-300 rounded-lg p-2"
                />
                <Select
                  placeholder="Select a category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <SelectItem value="Vegetables" key="Vegetables">
                    Vegetables
                  </SelectItem>
                  <SelectItem value="Flowers" key="Flowers">
                    Flowers
                  </SelectItem>
                  <SelectItem value="Landscaping" key="Landscaping">
                    Landscaping
                  </SelectItem>
                  <SelectItem value="Fruit Trees" key="Fruit Trees">
                    Fruit Trees
                  </SelectItem>
                  <SelectItem value="Shade Trees" key="Shade Trees">
                    Shade Trees
                  </SelectItem>
                  <SelectItem value="Deciduous Trees" key="Deciduous Trees">
                    Deciduous Trees
                  </SelectItem>
                  <SelectItem value="Medicinal Trees" key="Medicinal Trees">
                    Medicinal Trees
                  </SelectItem>
                </Select>
                <input
                  type="file"
                  multiple
                  className="mt-2 border border-gray-300 rounded-lg p-2"
                  onChange={handleImageUpload}
                />
                <ReactQuill
                  value={content}
                  onChange={setContent}
                  placeholder="Write your gardening tips and guides here..."
                  className="mt-4"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="faded" onPress={onClose}>
                  Close
                </Button>
                <Button type="submit" color="primary">
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
