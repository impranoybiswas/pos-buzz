import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProductsApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from "../libs/products.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import type { Product } from "../types";

export const useProducts = () => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getProductsApi,
  });

  const createMutation = useMutation({
    mutationFn: createProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully");
    },
    onError: (error: unknown) => {
      let message = "Failed to create product";

      if (error instanceof AxiosError) {
        message = error.response?.data?.message ?? message;
      }

      toast.error(message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Product }) =>
      updateProductApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully");
    },
    onError: (error: unknown) => {
      let message = "Failed to update product";

      if (error instanceof AxiosError) {
        message = error.response?.data?.message ?? message;
      }

      toast.error(message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
    onError: (error: unknown) => {
      let message = "Failed to delete product";

      if (error instanceof AxiosError) {
        message = error.response?.data?.message ?? message;
      }

      toast.error(message);
    },
  });

  return {
    productsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
