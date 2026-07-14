const OrderedProducts = ({ items }) => {
  if (!items?.length) return null;

  return (
    <div className="mt-8 rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-semibold">
        Ordered Products
      </h2>

      <div className="space-y-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-lg border p-4"
          >
            {/* Product Image */}

            <img
              src={item.product.image}
              alt={item.product.name}
              className="h-20 w-20 rounded-lg border object-cover"
            />

            {/* Product Info */}

            <div className="flex-1">
              <h3 className="font-semibold">
                {item.product.name}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Quantity: {item.quantity}
              </p>
            </div>

            {/* Price */}

            <div className="text-right">
              <p className="font-semibold">
                ₹{item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderedProducts;