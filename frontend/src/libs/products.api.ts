import api from "./axios";
import type { Product } from "../types";

export const getProductsApi = async (): Promise<Product[]> => {
  const res = await api.get<Product[]>("/products");
  return res.data;
};

export const createProductApi = async (
  data: Omit<Product, "id">,
): Promise<Product> => {
  const res = await api.post<Product>("/products", {
    name: data.name,
    sku: data.sku,
    price: data.price,
    stock_quantity: data.stock_quantity,
  });
  return res.data;
};



export const updateProductApi = async (
  id: string,
  data: Partial<Omit<Product, "id">>,
): Promise<Product> => {
  const payload: Partial<Omit<Product, "id">> = { ...data };
  if (data.stock_quantity !== undefined) {
    payload.stock_quantity = data.stock_quantity;
    delete payload.stock_quantity;
  }
  const res = await api.patch<Product>(`/products/${id}`, payload);
  return res.data;
};

export const deleteProductApi = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};
