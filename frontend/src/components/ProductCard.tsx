import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { useCartStore } from "../stores/cartStore";
import { QuantityControl } from "./QuantityControl";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const quantity = useCartStore((state) =>
    state.getQuantity(product._id),
  );

  const addItem = useCartStore((state) => state.addItem);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);

  return (
    <article className="overflow-hidden rounded-lg border bg-white/20 backdrop-blur">
      <Link to={`/products/${product._id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-56 w-full object-cover"
        />

        <div className="p-4">
          <h2 className="font-semibold">{product.title}</h2>
          <p className="mt-2 text-lg font-bold">
            {product.price.toFixed(2)} €
          </p>
        </div>
      </Link>

      <div className="p-4 pt-0">
        {quantity === 0 ? (
          <button
            type="button"
            onClick={() => addItem(product)}
            className="w-full rounded bg-[#5D3140] px-4 py-2 text-white transition hover:bg-[#CF4173] hover:cursor-pointer"
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
    </article>
  );
}