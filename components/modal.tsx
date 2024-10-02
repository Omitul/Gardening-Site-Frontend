"use client";

import { useState } from "react";
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

interface PostModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onOpenChange }) => {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const postData = {
      content,
      category,
      images,
    };
    console.log("Post Data: ", postData);

    setContent("");
    setCategory("");
    setImages([]);
    onOpenChange(false);
  };

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader>Create a New Post</ModalHeader>
              <ModalBody>
                <Select
                  placeholder="Select a category"
                  value={category}
                  onChange={(value: any) => setCategory(value)}
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
