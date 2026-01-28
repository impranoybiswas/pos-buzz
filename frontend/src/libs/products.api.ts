import api from "./axios";
import type { Product } from "../types";

/**
 * Fetches the list of all products from the backend.
 * @returns A promise resolving to an array of Product objects.
 */
export const getProductsApi = async (): Promise<Product[]> => {
  const res = await api.get<Product[]>("/products");
  return res.data;
};

/**
 * Creates a new product entry in the database.
 * Maps stockQuantity to match backend schema expectations.
 * @param data Product details excluding ID.
 */
export const createProductApi = async (
  data: Omit<Product, "id">,
): Promise<Product> => {
  const res = await api.post<Product>("/products", {
    name: data.name,
    sku: data.sku,
    price: data.price,
    stockQuantity: data.stockQuantity,
  });
  return res.data;
};

/**
 * Updates an existing product's information.
 * Handles mapping of CamelCase UI fields to SnakeCase backend fields.
 * @param id The UUID of the product to update.
 * @param data Partial product information.
 */
export const updateProductApi = async (
  id: string,
  data: Partial<Omit<Product, "id">>,
): Promise<Product> => {
  const payload: Partial<Omit<Product, "id">> = { ...data };

  const res = await api.patch<Product>(`/products/${id}`, payload);
  return res.data;
};

/**
 * Deletes a product by its unique identifier.
 * @param id The UUID of the product.
 */
export const deleteProductApi = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};
