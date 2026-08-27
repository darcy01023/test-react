import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders, markOrderAsDelivered } from "../api/admin";

export function useOrders(token: string | undefined) {
  return useQuery({
    queryKey: ["admin", "orders"],
    queryFn: () => getOrders(token!),
    enabled: Boolean(token),
    staleTime: 60_000,
  });
}

export function useMarkOrderAsDelivered(
  token: string | undefined,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) =>
      markOrderAsDelivered(orderId, token!),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "orders"],
      });
    },
  });
}