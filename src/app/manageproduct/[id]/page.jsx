import ProtectedRoute from "@/components/ProtectedRoute";

export default async function Manageproduct({ params }) {
  const { id } = await params;

  const res = await fetch(`https://my-nextjs-server-sigma.vercel.app/products/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  const product = data.result;

  return (
    <ProtectedRoute>
      <div className="card border border-gray-200 bg-base-100 w-full max-w-2xl mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Product</h2>

        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="label font-medium">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={product.name}
              className="input w-full rounded-full"
            />
          </div>
          
          {/* Price */}
          <div>
            <label className="label font-medium">Price</label>
            <input
              type="number"
              name="price"
              defaultValue={product.price}
              className="input w-full rounded-full"
            />
          </div>

          {/* Category */}
          <div>
            <label className="label font-medium">Category</label>
            <select
              name="category"
              defaultValue={product.category}
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
          </div>

          {/* Description */}
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              rows="3"
              defaultValue={product.description}
              className="textarea w-full rounded-2xl h-[250px]"
            ></textarea>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="label font-medium">Thumbnail URL</label>
            <input
              type="url"
              name="thumbnail"
              defaultValue={product.thumbnail}
              className="input w-full rounded-full"
            />
            {product.thumbnail && (
              <div className="mt-2">
                <img 
                  src={product.thumbnail} 
                  alt="Current thumbnail" 
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                <p className="text-xs text-gray-500 mt-1">Current thumbnail</p>
              </div>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="label font-medium">Location</label>
            <input
              type="text"
              name="location"
              defaultValue={product.location}
              className="input w-full rounded-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button type="submit" className="btn btn-primary flex-1">
              Update Product
            </button>
            <button type="button" className="btn btn-outline">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    </ProtectedRoute>
  );
}