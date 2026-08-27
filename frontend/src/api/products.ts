import { api } from "./client";
import type { Product } from "../types/product";

export function getProducts(search = "") {
  const query = search
    ? `?search=${encodeURIComponent(search)}`
    : "";

  return api<Product[]>(`/products${query}`);
}

export function getProduct(id: string) {
  return api<Product>(`/products/${id}`);
}