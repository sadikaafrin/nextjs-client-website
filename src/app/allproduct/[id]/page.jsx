export default async function Allproduct({ params }) {
  const { id } = await params;

  const res = await fetch(`https://my-nextjs-server-sigma.vercel.app/products/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  const product = data.result;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className=" mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">{product.name}</h1>

        <div className="grid grid-cols-1  ">
          {/* Product Image */}
          <div className="flex justify-center">
            <div className="card bg-base-100 w-full max-w-md shadow-xl">
              <figure className="px-6 pt-6">
                <img
                  src={product.thumbnail || "/placeholder-image.jpg"}
                  alt={product.name}
                  className="rounded-xl w-full h-64 object-cover"
                />
              </figure>
            </div>
            <div className="card bg-base-100 shadow-xl p-6">
              <h2 className="card-title text-2xl mb-4">{product.name}</h2>

              <div className="space-y-3">
                <p className="text-gray-700">
                  <span className="font-semibold">Description:</span>{" "}
                  {product.description}
                </p>

                <p className="text-lg">
                  <span className="font-semibold">Category:</span>
                  <span className="badge badge-primary ml-2">
                    {product.category}
                  </span>
                </p>
               
                  <p className="text-2xl font-bold">Price:
                    {product.price}
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
