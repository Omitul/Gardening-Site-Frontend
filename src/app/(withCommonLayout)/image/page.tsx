import { getPosts } from "@/src/services/postService";
import { Tpost } from "@/types";
import React from "react";

const ImageGalleryPage = async () => {
  const { data } = await getPosts();
  console.log(data);

  if (data.length === 0) {
    return (
      <div className="p-10">
        <p>No images available</p>
        return;
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-center text-3xl mt-10 mb-10 font-serif font-semibold">
        Image Gallery
      </h4>
      <div className="grid grid-cols-2 gap-4 p-10">
        {data.map((post: Tpost) => (
          <div key={post._id}>
            <div>
              {post.images.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  className="image w-full h-96 object-cover"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGalleryPage;
