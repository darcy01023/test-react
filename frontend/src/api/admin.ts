const API_URL = import.meta.env.VITE_API_URL;

export type AdminOrder = {
  _id: string;
  owner: {
    _id: string;
    username: string;
    email: string;
  };
  products: {
    product: string;
    quantity: number;
  }[];
  price: number;
  delivered: boolean;
  address: string;
};

export async function getOrders(
  token: string,
): Promise<AdminOrder[]> {
  const response = await fetch(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(
      typeof data === "string"
        ? data
        : data?.message ?? "Impossible de récupérer les commandes.",
    );
  }

  return response.json();
}

export async function markOrderAsDelivered(
  orderId: string,
  token: string,
) {
  const response = await fetch(
    `${API_URL}/orders/mark-delivered/${orderId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(
      typeof data === "string"
        ? data
        : data?.message ?? "Impossible de modifier la commande.",
    );
  }

  return response.json();
}