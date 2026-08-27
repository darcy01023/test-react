const API_URL = import.meta.env.VITE_API_URL;

type RequestOptions = RequestInit & {
  token?: string;
};

export async function api<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { token, headers, ...fetchOptions } = options;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(
      typeof error === "string"
        ? error
        : error?.message ?? "Une erreur est survenue",
    );
  }

  return response.json();
}