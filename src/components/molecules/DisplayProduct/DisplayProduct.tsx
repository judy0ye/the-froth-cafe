import LightContainer from "@/components/templates/LightContainer/LightContainer";
import Image from "next/image";
import DisplayProductTypes from "./DisplayProductTypes";

const DisplayProduct = ({
  product,
}: {
  product: DisplayProductTypes | undefined;
}) => {
  return (
    <div>
      <LightContainer>
        <div className="flex flex-col md:flex-row justify-around items-center h-full py-4">
          <div className="flex items-center h-full w-auto ">
            {product?.image && (
              <Image
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
          <h2 className="font-bold text-3xl md:text-5xl pt-8 md:pt-0">
            {product?.name}
          </h2>
        </div>
      </LightContainer>
    </div>
  );
};

export default DisplayProduct;
