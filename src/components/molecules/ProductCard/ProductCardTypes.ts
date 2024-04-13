interface IndividualProductTypes {
  product_id: number;
  name: string;
  image: string;
  product_category_id: number;
}

export default interface ProductCardTypes {
  category_name: string;
  parent_category_id: number;
  product: IndividualProductTypes[];
}
