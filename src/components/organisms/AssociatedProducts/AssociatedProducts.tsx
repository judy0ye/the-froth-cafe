import Carousel from "@/components/molecules/Carousel/Carousel";
import LightContainer from "@/components/templates/LightContainer/LightContainer";
import { fetchSimilarSubCategories } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const AssociatedProducts = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { categoryId: number };
}) => {
  const decodedParam = decodeURIComponent(params.slug);
  const relatedSubCategories = await fetchSimilarSubCategories(
    searchParams.categoryId,
    decodedParam,
  );

  const relatedProducts = relatedSubCategories?.map((product, index) => (
    <Link
      href={{
        pathname: `/product/${product.name}`,
        query: {
          categoryId: `${product.product_category_id}`,
        },
      }}
      key={index}
      className="flex flex-col "
    >
      <p className="text-center">{product.name}</p>
      <div className="flex justify-center">
        <Image
          alt={product.name}
          width={150}
          height={200}
          src={product.image}
          style={{ objectFit: "contain", height: "200px" }}
        />
      </div>
    </Link>
  ));
  return (
    <>
      <LightContainer>
        <p className="border-gray-700 border-b-2 mb-6 mx-8 pt-5 text-md font-semibold">
          You Might Also Like
        </p>
        <div className="hidden h-full pb-6 items-center justify-around md:visible md:flex md:flex-row ">
          {relatedProducts}
        </div>
        <div className="md:hidden">
          {relatedSubCategories && (
            <Carousel relatedSubCategories={relatedSubCategories} />
          )}
        </div>
      </LightContainer>
    </>
  );
};

export default AssociatedProducts;
