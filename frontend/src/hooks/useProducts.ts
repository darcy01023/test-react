import { useQuery } from "@tanstack/react-query";
import { getProducts, getProduct } from "../api/products";

export function useProducts(search = "") {
  return useQuery({
    queryKey: ["products", search],
    queryFn: () => getProducts(search),
    staleTime: 180_000,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
    staleTime: 180_000,
  });
}