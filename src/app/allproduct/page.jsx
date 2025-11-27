"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AllproductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://my-nextjs-server-sigma.vercel.app/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product._id} className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="rounded-xl"
              />
            </figure>

            <div className="card-body items-center text-center">
              <h2 className="card-title">{product.name}</h2>
              <p className="text-gray-500 text-sm">{product.description}</p>
              <p className="font-semibold">Category: {product.category}</p>

              <div className="card-actions mt-3">
                <button className="btn btn-primary bg-gray-800 rounded-2xl"><Link href={`/allproduct/${product._id}`}>View Details</Link></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
