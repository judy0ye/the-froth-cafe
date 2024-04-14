import AssociatedProducts from "@/components/organisms/AssociatedProducts/AssociatedProducts";
import DetailedProduct from "@/components/organisms/DetailedProduct/DetailedProduct";

const IndividualProduct = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { categoryId: number };
}) => {
  return (
    <>
      <DetailedProduct params={params} />
      <AssociatedProducts params={params} searchParams={searchParams} />
    </>
  );
};

export default IndividualProduct;
