export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock_quantity: number;
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

export interface RegisterData extends Auth {
  name: string;
}
