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
    </>
  );
};

export default IndividualProduct;
