import ProductCard from "@/components/molecules/ProductCard/ProductCard";
import { fetchProductsByCategory } from "@/lib/data";

const ProductGrid = async ({ location }: { location: string }) => {
  const locationToCategoryId: { [key: string]: number } = {
    beverages: 1,
    food: 2,
  };
  const categoryId = locationToCategoryId[location];

  let products;
  if (categoryId) {
    let data = await fetchProductsByCategory(categoryId);
    products = data
      ?.filter((product) => product.parent_category_id === categoryId)
      .map((product, index) => <ProductCard key={index} product={product} />);
  }

  return <div className="mx-10">{products}</div>;
};

export default ProductGrid;
