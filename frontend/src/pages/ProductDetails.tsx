import { Link, useParams } from "react-router-dom";
import { QuantityControl } from "../components/QuantityControl";
import { useProduct } from "../hooks/useProducts";
import { useCartStore } from "../stores/cartStore";

export function ProductDetails() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError,
  } = useProduct(id ?? "");

  const quantity = useCartStore((state) =>
    product ? state.getQuantity(product._id) : 0,
  );

  const addItem = useCartStore((state) => state.addItem);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);

  if (isLoading) {
    return <p className="p-8">Chargement du produit...</p>;
  }

  if (isError || !product) {
    return (
      <main className="p-8">
        <p className="text-red-600">
          Produit introuvable.
        </p>

        <Link
          to="/products"
          className="mt-4 inline-block underline text-white"
        >
          Retour aux produits
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Link
        to="/products"
        className="mb-8 inline-block underline text-white"
      >
        ← Retour aux produits
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <img
            src={product.images[0] ?? product.thumbnail}
            alt={product.title}
            className="w-full rounded-lg object-scale-down"
          />
        </div>

        <div className="bg-white/30 backdrop-blur p-4 rounded-lg max-h-auto]">
          <p className="mb-2 text-sm uppercase text-gray-500">
            {product.category}
          </p>

          <h1 className="text-3xl font-bold">
            {product.title}
          </h1>

          <p className="mt-4 text-2xl font-bold">
            {product.price.toFixed(2)} €
          </p>

          <p className="mt-6 text-gray-700">
            {product.description}
          </p>

          <div className="mt-6 space-y-2">
            <p>
              <strong>Marque :</strong> {product.brand}
            </p>

            <p>
              <strong>Stock :</strong> {product.stock}
            </p>

            <p>
              <strong>Note :</strong> {product.rating}/5
            </p>

            <p>
              <strong>Livraison :</strong>{" "}
              {product.shippingInformation}
            </p>

            <p>
              <strong>Garantie :</strong>{" "}
              {product.warrantyInformation}
            </p>

            <p>
              <strong>Retour :</strong>{" "}
              {product.returnPolicy}
            </p>
          </div>

          <div className="mt-8">
            {quantity === 0 ? (
              <button
                type="button"
                onClick={() => addItem(product)}
                className="rounded bg-black px-6 py-3 text-white"
              >
                Ajouter au panier
              </button>
            ) : (
              <QuantityControl
                quantity={quantity}
                onIncrement={() => increment(product._id)}
                onDecrement={() => decrement(product._id)}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}