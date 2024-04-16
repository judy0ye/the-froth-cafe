export interface CheckoutItemListTypes {
  id: number;
  user_id: number;
  product_item: {
    id: number;
    product_id: number;
    milk: string | null;
    name: string;
    quantity: number;
    size: string;
    price: number;
    image: string;
    product?:
      | { product_category_id: number }
      | { product_category_id: number }[];
  }[];
}
