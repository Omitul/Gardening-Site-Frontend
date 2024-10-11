"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      //   const response = await loginUser({ email, password });
      //   if (response.success) {
      //     toast.success("Login successful!", {
      //       position: "top-center",
      //     });
      //     console.log("Login successful!", response);
      //     setTimeout(() => {
      //       router.push("/");
      //     }, 2000);
      //   } else {
      //     toast.error(response.message || "Login failed", {
      //       position: "top-center",
      //     });
      //   }
    } catch (error) {
      toast.error("Incorrect email or password!", {
        position: "top-center",
      });
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
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              address
            </label>
            <input
              id="address"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="contactNo"
              className="block text-sm font-medium text-gray-700"
            >
              ContactNo
            </label>
            <input
              id="contactNo"
              type="text"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
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
              1 month subscription
            </span>
          </p>
        </div>
      </div>
      <ToastContainer transition={Slide} />
    </div>
  );
}
