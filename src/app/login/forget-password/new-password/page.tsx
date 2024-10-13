"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUser } from "@/src/services/authService";
import bcrypt from "bcryptjs";
import { jwtDecode } from "jwt-decode";

export default function NewPassword() {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
      });
      setLoading(false);
      return;
    }

    try {
      const token = new URLSearchParams(window.location.search).get("token");
      //   const userId = "6706aed504c0991bf5dec3f4"; // Replace with the actual user ID

      const decodedToken: any = jwtDecode(token as string);
      console.log("decoded token", decodedToken);
      const userId = decodedToken.id;
      const hashedPassword: string = await bcrypt.hash(newPassword, 10);

      const response = await updateUser(userId, {
        password: hashedPassword,
      });

      if (response.success) {
        toast.success("Password updated successfully!", {
          position: "top-center",
        });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(response.message || "Updating password failed", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("An error occurred while updating the password", {
        position: "top-center",
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h3 className="text-center text-2xl font-semibold mb-6">
          Update Password
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
      <ToastContainer transition={Slide} />
    </div>
  );
}
