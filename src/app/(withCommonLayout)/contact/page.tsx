"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted", formData);

    Swal.fire({
      title: "Message Sent!",
      text: "Thank you for contacting us. We will get back to you soon!",
      icon: "success",
      confirmButtonText: "Ok",
      background: "#f0fdf4",
      confirmButtonColor: "#34d399",
    });

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-500 flex flex-col justify-center items-center py-8 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full transform transition duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6 animate-fadeIn">
          Contact Us
        </h1>
        <p className="text-center text-lg text-gray-600 mb-4">
          Email: <span className="font-semibold">admin@gmail.com</span>
        </p>
        <p className="text-center text-lg text-gray-600 mb-8">
          Contact Number: <span className="font-semibold">(+88)0123456789</span>
        </p>
        <p className="text-center text-lg text-gray-600 mb-8">
          We’d love to hear from you! Send us your feedback or questions.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300 transition"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300 transition"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300 transition"
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition transform hover:scale-105 focus:scale-95"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
