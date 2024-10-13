"use client";
import { CreateOrder } from "@/src/services/OrderService";
import { Torder } from "@/types";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const order = {
      name: username,
      email: email,
      contactNo: contactNo,
      price: price,
      address: address,
    };

    try {
      const response = await CreateOrder(order as Torder);

      if (response.success) {
        Swal.fire({
          title: "Success!",
          text: "Your order has been placed successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        // console.log("Order successfully Created!", response);
        window.location.href = response?.data?.payment_url;
        // setTimeout(() => {
        //   router.push("/dashboard/profile");
        // }, 2000);
      } else {
        toast.error(response.message || "Failed to Create Order ", {
          position: "top-center",
        });
      }
    } catch (error: any) {
      toast.error("Failed to Create Order", {
        position: "top-center",
      });
      // console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h3 className="text-center text-2xl font-semibold mb-6">
          Buy Subscription
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="Username"
            >
              Name
            </label>
            <input
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500 focus:border-green-500"
              id="name"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500 focus:border-green-500"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="contactNo"
            >
              ContactNo
            </label>
            <input
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500 focus:border-green-500"
              id="contactNo"
              type="text"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="contactNo"
            >
              Price
            </label>
            <input
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500 focus:border-green-500"
              id="price"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="address"
            >
              Address
            </label>
            <input
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500 focus:border-green-500"
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button
            className={`w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
            type="submit"
          >
            {loading ? "order placing..." : "place order"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            <span className="font-serif font-semibold">Total Price: </span>
            100BDT
          </p>
          <p>
            <span className="font-serif font-semibold">
              to get 1 month subscription
            </span>
          </p>
        </div>
      </div>
      <ToastContainer transition={Slide} />
    </div>
  );
}
