"use client";

import { resetPassword } from "@/src/services/passwordService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await resetPassword(email);
      console.log(response);
      if (response.success) {
        toast.success("password reset link sent!", {
          position: "top-center",
        });
        console.log("password reset link sent!", response);
        setTimeout(() => {
          router.push("/forget-password/new-password");
        }, 2000);
      } else {
        toast.error(response.message || "resetting failed", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Incorrect email", {
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
          Reset Password
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

          <button
            type="submit"
            className={`w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset"}
          </button>
        </form>
        {/* <div className="mt-4 text-center">
          <Link
            href="/login/forget-password"
            className="text-blue-500 font-sans font-semibold hover:underline"
          >
            password reset
          </Link>
        </div> */}
      </div>
      <ToastContainer transition={Slide} />
    </div>
  );
}
