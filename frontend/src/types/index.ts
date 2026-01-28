export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stockQuantity: number;
}

export interface Auth {
  email: string;
  password: string;
}

export interface User {
  userId: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface SalePayload {
  productId: string;
  quantity: number;
}

export interface Sale {
  id: string;
  productId: string;
  quantity: number;
  createdAt: string;
  product?: Product;
}

export interface RegisterData extends Auth {
  name: string;
}
