"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import { signIn, useSession } from "next-auth/react";

export default function AddproductPage() {
  const [errors, setErrors] = useState({});
  const { data: session } = useSession();
// login
  const handleSignInClick = () => {
    signIn("google");
  };
// register
  const handleRegisterClick = () => {
    console.log("Register button clicked");
    signIn("google");
  };

  const user = session?.user;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      price: e.target.price.value,
      category: e.target.category.value,
      description: e.target.description.value,
      thumbnail: e.target.thumbnail.value,
      location: e.target.location.value,
      created_at: new Date(),
      created_by: user?.email,
    };

    // validation
    if (!formData.name) errors.name = "Name is required";
    if (!formData.category) errors.category = "Category is required";
    if (!formData.description) errors.description = "Description is required";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      toast.error("Please fix form errors.");
      return;
    }

    setErrors({});

    // save to backend
    const res = await fetch("https://my-nextjs-server-ke1cm96l0-afrins-projects-bb3354dc.vercel.app/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Product added successfully!");
      e.target.reset();
    } else {
      toast.error("Failed to add product.");
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <button onClick={handleSignInClick} className="btn btn-primary">
            Login
          </button>
          <button onClick={handleRegisterClick} className="btn btn-primary ml-3">
            Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="card border border-gray-200 bg-base-100  w-full max-w-md mx-auto shadow-2xl rounded-2xl">
        <div className="card-body p-6 relative">
          <h2 className="text-2xl font-bold text-center mb-6">
            Add New Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="label font-medium">Name</label>
              <input
                type="text"
                name="name"
                className="input w-full rounded-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            {/* price */}
            <div>
              <label className="label font-medium">Price</label>
              <input
                type="number"
                name="price"
                className="input w-full rounded-full"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="label font-medium">Category</label>
              <select
                name="category"
                defaultValue=""
                className="select w-full rounded-full"
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Cleanup">Cleanup</option>
                <option value="Plantation">Plantation</option>
                <option value="Donation">Donation</option>
                <option value="Home & Living">Home & Living</option>
                <option value="Characters">Characters</option>
                <option value="Space">Space</option>
                <option value="Animals">Animals</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="label font-medium">Description</label>
              <textarea
                name="description"
                rows="3"
                className="textarea w-full rounded-2xl h-[250px]"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            {/* Thumbnail */}
            <div>
              <label className="label font-medium">Thumbnail URL</label>
              <input
                type="url"
                name="thumbnail"
                className="input w-full rounded-full"
              />
            </div>

            {/* Location */}
            <div>
              <label className="label font-medium">Location</label>
              <input
                type="text"
                name="location"
                className="input w-full rounded-full"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn w-full text-white mt-6 rounded-full bg-[#b83d46]"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
