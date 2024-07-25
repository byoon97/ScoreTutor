"use client";
import React, { useState } from "react";

const Index: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email) {
      // Here you would typically handle form submission, e.g., sending data to your server
      setMessage(`Thank you for signing up, ${name}!`);
      setEmail("");
    } else {
      setMessage("Please fill in both fields.");
    }
  };

  return (
    <div className=" bg-white md:w-1/2 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Sign Up for Our Newsletter
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium ">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent-gold focus:border-accent-gold sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-accent-gold text-white font-medium rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
        >
          Sign Up
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
};

export default Index;
