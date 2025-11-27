"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiViewList } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

export default function ManageProductPage() {
  const [products, setProducts] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("https://my-nextjs-server-sigma.vercel.app/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error("Error fetching products:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load products",
        });
      });
  };

  const handleDelete = async (productId, productName) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${productName}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    setDeletingId(productId);

    try {
      const response = await fetch(
        `https://my-nextjs-server-sigma.vercel.app/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (result.success) {
        setProducts(products.filter((product) => product._id !== productId));

        Swal.fire({
          title: "Deleted!",
          text: `"${productName}" has been deleted successfully.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        throw new Error(result.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to delete product",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const truncateDescription = (description, maxLength = 50) => {
    if (!description) return "No description";
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Description</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>${item.price}</td>
                  <td>{truncateDescription(item.description)}</td>
                  <td>{item.location}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        href={`/manageproduct/${item._id}`}
                        className="btn btn-primary bg-gray-600 btn-sm"
                      >
                        <CiViewList />
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id, item.name)}
                        disabled={deletingId === item._id}
                        className="btn btn-error btn-sm text-white"
                      >
                        <MdDelete />
                        {deletingId === item._id && (
                          <span className="loading loading-spinner loading-xs"></span>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}
