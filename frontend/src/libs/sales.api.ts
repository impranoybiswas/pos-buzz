import api from "./axios";
import type { Sale, SalePayload } from "../types";

/**
 * Fetches the list of all sales from the backend.
 * @returns A promise resolving to an array of Sale objects.
 */
export const getSalesApi = async (): Promise<Sale[]> => {
  const res = await api.get<Sale[]>("/sales");
  return res.data;
};

/**
 * Creates a new sale entry.
 * @param data Sale details (productId and quantity).
 */
export const createSaleApi = async (data: SalePayload): Promise<Sale> => {
  const res = await api.post<Sale>("/sales", data);
  return res.data;
};

/**
 * Fetches a single sale by ID.
 * @param id The UUID of the sale.
 */
export const getSaleApi = async (id: string): Promise<Sale> => {
  const res = await api.get<Sale>(`/sales/${id}`);
  return res.data;
};
