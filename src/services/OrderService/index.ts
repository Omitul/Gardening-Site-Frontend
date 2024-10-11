import { Torder } from "@/types";

export const CreateOrder = async (payload: Torder) => {
  console.log(payload);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response}`);
    }

    const data = await response.json();
    console.log("data", data);

    return data;
  } catch (error: any) {
    console.log("Error occurred:", error.message || error);
    throw new Error(error);
  }
};
