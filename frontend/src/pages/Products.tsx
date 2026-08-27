import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export function Products() {
  const [search, setSearch] = useState("");

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useProducts(search);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Produits</h1>

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Rechercher un produit..."
          className="bg-white/50 mt-4 w-full rounded border px-4 py-2 backdrop-blur"
        />
      </div>

      {isLoading && <p>Chargement des produits...</p>}

      {isError && (
        <p className="text-red-600">
          {error instanceof Error
            ? error.message
            : "Impossible de charger les produits."}
        </p>
      )}

      {products && products.length === 0 && (
        <p>Aucun produit trouvé.</p>
      )}

      {products && products.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </main>
  );
}