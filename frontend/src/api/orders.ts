import type { CartItem } from "../stores/cartStore";

const API_URL = import.meta.env.VITE_API_URL;

type CreateOrderResponse = {
  message: string;
};

export async function createOrder(
  items: CartItem[],
  address: string,
  token: string,
): Promise<CreateOrderResponse> {
  const price = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      products: items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      address,
      price,
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(
      typeof data === "string"
        ? data
        : data?.message ?? "Impossible de créer la commande.",
    );
  }

  return response.json();
}