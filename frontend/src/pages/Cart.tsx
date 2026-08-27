import { Link } from "react-router-dom";
import { QuantityControl } from "../components/QuantityControl";
import { useCartStore } from "../stores/cartStore";

export function Cart() {
  const items = useCartStore((state) => state.items);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12 text-center">
        <h1 className="text-3xl font-bold">Ton panier</h1>

        <p className="mt-4 text-white">
          Faut prendre un truc, frérot... 
        </p>

        <Link
          to="/products"
          className="mt-6 inline-block rounded bg-[#5D3140] px-6 py-3 text-white transition hover:bg-[#CF4173] hover:cursor-pointer"
        >
          Aller vers les bons deals
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">
        Ton panier
      </h1>

      <div className="space-y-4">
        {items.map(({ product, quantity }) => (
          <article
            key={product._id}
            className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center bg-white/30 backdrop-blur"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-24 w-24 rounded object-cover"
            />

            <div className="flex-1">
              <Link
                to={`/products/${product._id}`}
                className="font-semibold hover:underline"
              >
                {product.title}
              </Link>

              <p className="mt-1">
                {product.price.toFixed(2)} € / unité
              </p>
            </div>

            <QuantityControl
              quantity={quantity}
              onIncrement={() => increment(product._id)}
              onDecrement={() => decrement(product._id)}
            />

            <p className="font-bold">
              {(product.price * quantity).toFixed(2)} €
            </p>

            <button
              type="button"
              onClick={() => removeItem(product._id)}
              className="text-sm text-red-600 hover:underline hover:cursor-pointer"
            >
              Supprimer
            </button>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4 border-t pt-6">
        <p className="text-2xl font-bold text-gray-200">
          Total : {totalPrice.toFixed(2)} €
        </p>

        <Link
          to="/payment"
          className="rounded bg-[#5D3140] px-6 py-3 text-white transition hover:bg-[#CF4173] hover:cursor-pointer"
        >
          Passer au paiement
        </Link>
      </div>
    </main>
  );
}