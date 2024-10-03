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
      console.log("Selected files for upload:", files);

      const uploadedURLs = await Promise.all(
        files.map(async (file) => {
          console.log(`Uploading file: ${file.name}`);
          try {
            const uploadedUrl = await uploadImage(file); // uploadImage function imgbb te upload
            console.log("Uploaded image URL:", uploadedUrl);
            return uploadedUrl;
          } catch (error) {
            console.error("Error uploading image to ImgBB:", error);
            return null;
          }
        })
      );

      const successfulUploads = uploadedURLs.filter(
        (url): url is string => url !== null
      );

      console.log("Successful uploads:", successfulUploads);
      setImages((prevImages) => [...prevImages, ...successfulUploads]);
    } else {
      console.log("No files selected.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await getDecodedData();
      if (!data || !data.userId) {
        throw new Error("Failed to retrieve user data");
      }

      const parser = new DOMParser();
      const parsedContent =
        parser.parseFromString(content, "text/html").body.textContent || "";

      const postData = {
        title, // Assuming this is set somewhere in your state
        content: parsedContent,
        images: images,
        videos: [], // Initialize videos as an empty array
        author: data.userId,
        votes: 0,
        createdAt: new Date(),
        category: category,
        comments: [], // Initialize comments as an empty array
        isPremium: false,
      };

      console.log("Post Data: ", postData);

      // Move the API call inside the try block
      const res = await Post(postData); // Assuming Post is your API call

      console.log(res);
      toast.success("Post created successfully!");

      // Reset form fields
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
                  <SelectItem value="Vegetables" key="1">
                    Vegetables
                  </SelectItem>
                  <SelectItem value="Flowers" key="2">
                    Flowers
                  </SelectItem>
                  <SelectItem value="Landscaping" key="3">
                    Landscaping
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
