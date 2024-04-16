export interface ProductToAddTypes {
  product_id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string | null;
  milk: string | null;
  shopping_cart_id: number | null;
}

export interface OrderSummaryTypes {
  product_id: number;
  milk: string | null;
  size: string | null;
  price: number;
  quantity: number;
}
