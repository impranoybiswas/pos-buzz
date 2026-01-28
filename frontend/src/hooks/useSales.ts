import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSalesApi, createSaleApi } from "../libs/sales.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

/**
 * Custom hook providing TanStack Query integration for Sales operations.
 * Handles state, automatic cache invalidation, and toast notifications.
 */
export const useSales = () => {
  const queryClient = useQueryClient();

  /**
   * Query for fetching all sales.
   */
  const salesQuery = useQuery({
    queryKey: ["sales"],
    queryFn: getSalesApi,
  });

  /**
   * Mutation for creating a new sale.
   * Invalidates 'sales' and 'products' queries on success to trigger refetch.
   */
  const createMutation = useMutation({
    mutationFn: createSaleApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Sale created successfully");
    },
    onError: (error: unknown) => {
      let message = "Failed to create sale";

      if (error instanceof AxiosError) {
        message = error.response?.data?.message ?? message;
      }

      toast.error(message);
    },
  });

  return {
    salesQuery,
    createMutation,
  };
};
