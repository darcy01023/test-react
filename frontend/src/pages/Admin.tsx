import { useOrders, useMarkOrderAsDelivered } from "../hooks/useOrders";
import { useAuth } from "../contexts/AuthContext";
import { useProducts } from "../hooks/useProducts";

export function Admin() {
  const { user } = useAuth();

  const { data: products } = useProducts();

  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useOrders(user?.token);

  const markAsDelivered = useMarkOrderAsDelivered(
    user?.token,
  );

  if (isLoading) {
    return (
      <main className="p-8">
        <p>Chargement des commandes...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="p-8">
        <p className="text-red-600">
          {error instanceof Error
            ? error.message
            : "Impossible de charger les commandes."}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold">
        Administration
      </h1>

      <p className="mt-2 text-white">
        Gestion des commandes
      </p>

      <div className="mt-8 space-y-6">
        {orders?.length === 0 && (
          <p>Aucune commande.</p>
        )}

        {orders?.map((order) => (
          <article
            key={order._id}
            className="rounded-lg border p-6 bg-white"
          >
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <div>
                <h2 className="font-semibold">
                  Commande #{order._id}
                </h2>

                <p className="mt-1">
                  Client : {order.owner.username}
                </p>

                <p className="text-sm text-gray-500">
                  {order.owner.email}
                </p>
              </div>

              <div>
                {order.delivered ? (
                  <span className="font-semibold text-green-600">
                    Livrée
                  </span>
                ) : (
                  <span className="font-semibold text-orange-600">
                    En cours
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium">
                Produits
              </h3>

              <ul className="mt-2 space-y-2">
                {order.products.map((item) => {
                    const product = products?.find(
                        (product) => product._id === item.product,
                    );

                    return (
                        <li
                        key={item.product}
                        className="flex justify-between"
                        >
                        <span>
                            {product?.title ?? "Produit inconnu"} × {item.quantity}
                        </span>

                        <span>
                            {product
                            ? `${(product.price * item.quantity).toFixed(2)} €`
                            : "Prix indisponible"}
                        </span>
                        </li>
                    );
                })}
              </ul>
            </div>

            <div className="mt-6 border-t pt-4">
              <p>
                <strong>Adresse :</strong>{" "}
                {order.address}
              </p>

              <p className="mt-2 text-xl font-bold">
                Total : {order.price.toFixed(2)} €
              </p>
            </div>

            {!order.delivered && (
              <button
                type="button"
                disabled={markAsDelivered.isPending}
                onClick={() =>
                  markAsDelivered.mutate(order._id)
                }
                className="mt-6 rounded bg-black px-4 py-2 text-white disabled:opacity-50 hover:cursor-pointer"
              >
                {markAsDelivered.isPending
                  ? "Validation..."
                  : "Marquer comme livrée"}
              </button>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}