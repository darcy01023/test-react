import { useActionState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useCartStore } from "../stores/cartStore";
import { createOrder } from "../api/orders";

type PaymentState = {
  error: string | null;
};

const initialState: PaymentState = {
  error: null,
};

export function Payment() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const [state, formAction, isPending] = useActionState(
    async (
      _previousState: PaymentState,
      formData: FormData,
    ) => {
      const address = String(formData.get("address") ?? "").trim();

      if (!address) {
        return {
          error: "Euh… Une adresse peut-être ?",
        };
      }

      if (items.length === 0) {
        return {
          error: "Ton panier est vide.",
        };
      }

      if (!user?.token) {
        return {
          error: "Faut te connecter pour ça.",
        };
      }

      try {
        await createOrder(items, address, user.token);

        clearCart();
        navigate("/");
        return { error: null };
      } catch (error) {
        return {
          error:
            error instanceof Error
              ? error.message
              : "Impossible de créer la commande.",
        };
      }
    },
    initialState,
  );

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12 text-center">
        <h1 className="text-3xl font-bold">
          Ton panier est vide
        </h1>

        <Link
          to="/products"
          className="mt-6 inline-block rounded bg-black px-6 py-3 text-white"
        >
          Retour aux produits
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold">
        Finaliser la commande
      </h1>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <section className="bg-white/30 backdrop-blur p-4 rounded-lg border">
          <h2 className="text-xl font-semibold">
            Récapitulatif
          </h2>

          <div className="mt-4 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product._id}
                className="flex justify-between border-b pb-4"
              >
                <div>
                  <p className="font-medium">
                    {product.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    Quantité : {quantity}
                  </p>
                </div>

                <p className="font-medium">
                  {(product.price * quantity).toFixed(2)} €
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-2xl font-bold">
            Total : {totalPrice.toFixed(2)} €
          </p>
        </section>

        <section className="bg-white/30 backdrop-blur p-4 rounded-lg border">
          <h2 className="text-xl font-semibold">
            Livraison
          </h2>

          <form action={formAction} className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="address"
                className="block font-medium"
              >
                Adresse de livraison
              </label>

              <textarea
                id="address"
                name="address"
                required
                rows={5}
                className="mt-1 w-full rounded border px-4 py-2"
                placeholder="12 rue de la République, 94000 Créteil"
              />
            </div>

            {state.error && (
              <p className="text-red-600">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded px-6 py-3 text-white disabled:opacity-50 bg-[#5D3140] transition hover:bg-[#CF4173] hover:cursor-pointer"
            >
              {isPending
                ? "Validation..."
                : `Payer ${totalPrice.toFixed(2)} €`}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}