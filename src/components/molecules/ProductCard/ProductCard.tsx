import Image from "next/image";
import ProductCardTypes from "./ProductCardTypes";
import Link from "next/link";

const ProductCard = ({ product }: { product: ProductCardTypes }) => {
  const products = product.product.map((product, index) => (
    <Link

      href={{
        pathname: `/product/${product.name}`,
        query: {
          categoryId: `${product.product_category_id}`,
        },
      }}
      key={index}
      className="flex flex-col gap-2 h-full "
    >
      <h3 className="text-center font-semibold line-clamp-1">{product.name}</h3>
      <div className="h-full flex justify-center ">
        <Image
          width={180}
          height={200}
          style={{ objectFit: "fill", height: "200px", borderRadius: "50%" }}
          src={product.image}
          alt={product.name}
        />
      </div>
    </Link>
  ));
  return (
    <div className="py-8">
      <span>
        <h2 className="pb-5 text-2xl font-bold">{product.category_name}</h2>
        <div className="mx-5 place-items-center gap-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products}
        </div>
      </span>
    </div>
  );
};

export default ProductCard;
