import axios from "axios";

const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append("image", image);

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  const response = await axios.post(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    formData
  );

  return response.data.data.url; // Returns the image URL
};

export default uploadImage;
