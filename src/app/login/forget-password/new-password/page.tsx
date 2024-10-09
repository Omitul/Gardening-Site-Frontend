"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function newPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      toast.error("passwords do not match", {
        position: "top-center",
      });
      setLoading(false);
      return;
    }
  };

  //     try {
  //       //   const response = await updateUser(
  //       //     { passoword: newPassword },
  //       //     id as string
  //       //   );
  //       console.log(response);
  //       if (response.success) {
  //         toast.success("Password updated successfully!", {
  //           position: "top-center",
  //         });
  //         console.log("Password updated!", response);
  //         setTimeout(() => {
  //           router.push("/login");
  //         }, 2000);
  //       } else {
  //         toast.error(response.message || "Updating password failed", {
  //           position: "top-center",
  //         });
  //       }
  //     } catch (error) {
  //       toast.error("An error occurred while updating the password", {
  //         position: "top-center",
  //       });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h3 className="text-center text-2xl font-semibold mb-6">
          Update Password
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="old-password"
              className="block text-sm font-medium text-gray-700"
            >
              Old Password
            </label>
            <input
              id="old-password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

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
