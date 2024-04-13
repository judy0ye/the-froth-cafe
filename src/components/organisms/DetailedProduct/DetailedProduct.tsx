import DisplayProduct from "@/components/molecules/DisplayProduct/DisplayProduct";
import { fetchIndividualProduct } from "@/lib/data";

const DetailedProduct = async ({ params }: { params: { slug: string } }) => {
  const decodedParam = decodeURIComponent(params.slug);
  const product = await fetchIndividualProduct(decodedParam);

  return (
    <>
      <DisplayProduct product={product} />
    </>
  );
};

export default DetailedProduct;
