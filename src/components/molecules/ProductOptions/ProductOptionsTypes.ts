export interface ProductOptionsTypes {
  id: number;
  name: string;
  description: string;
  image: string;
  product_category_id: number;
  price: number | null;
}

export interface ProductCategoryTypes {
  id: number;
  parent_category_id: number;
}

export default interface UserTypes {
  id: string;
  aud?: string;
  role?: string;
  email?: string;
  email_confirmed_at?: string;
  phone?: string;
  confirmation_sent_at?: string;
  confirmed_at?: string;
  last_sign_in_at?: string;
  app_metadata?: {
    provider?: string;
    providers?: any[];
  };
  user_metadata?: {
    email?: string;
    email_verified?: boolean;
    phone_verified?: boolean;
    sub?: string;
  };
  identities?: any[];
  created_at?: string;
}

export interface ItemsInCartTypes {
  id: number;
  milk: string | null;
  name: string;
  quantity: number;
  size: string;
}
