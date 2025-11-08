export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  inventory: number;
}

export interface CartLine {
  id: string;
  productId: string;
  quantity: number;
  lineTotal: number;
  product: Product;
}

export interface CartSnapshot {
  items: CartLine[];
  total: number;
}

export interface CheckoutPayload {
  name: string;
  email: string;
}

export interface Receipt {
  id: string;
  total: number;
  createdAt: string;
  items: CartLine[];
  customer: {
    name: string;
    email: string;
  };
}

