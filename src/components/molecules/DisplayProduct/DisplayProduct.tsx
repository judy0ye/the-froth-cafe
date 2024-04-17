import LightContainer from "@/components/templates/LightContainer/LightContainer";
import Image from "next/image";
import DisplayProductTypes from "./DisplayProductTypes";
import { getPlaiceholder } from "plaiceholder";
import { getBase64 } from "@/lib/data";

const DisplayProduct = async ({
  product,
}: {
  product: DisplayProductTypes | undefined;
}) => {
  const base64Image = await getBase64(product?.image || "");
  const { base64 } = await getPlaiceholder(base64Image);

  return (
    <div>
      <LightContainer>
        <div className="flex flex-col md:flex-row justify-around items-center h-full py-4">
          <div className="flex items-center h-full w-auto ">
            {product?.image && (
              <Image
                priority={true}
                placeholder="blur"
                blurDataURL={base64}
                width={300}
                height={320}
                style={{
                  objectFit: "contain",
                  height: "320px",
                }}
                src={product?.image}
                alt={product?.name}
              />
            )}
          </div>
          <h2 className="font-bold text-center text-3xl md:text-5xl pt-8 md:pt-0">
            {product?.name}
          </h2>
        </div>
      </LightContainer>
    </div>
  );
};

export default DisplayProduct;
