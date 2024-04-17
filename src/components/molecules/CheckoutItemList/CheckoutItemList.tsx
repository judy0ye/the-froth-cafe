import Image from "next/image";
import { CheckoutItemListTypes } from "./CheckoutItemListTypes";

const CheckoutItemList = ({
  finalCartItems,
}: {
  finalCartItems: CheckoutItemListTypes;
}) => {
  const checkoutItems = finalCartItems?.product_item.map((item, index) => (
    <div key={index}>
      <div className="flex flex-col gap-2 xs:flex-row justify-evenly items-center py-6 mx-1 border-slate-400 border-b-2">
        <div className="w-[50%] flex justify-center">
          <Image
            alt={item.name}
            height={100}
            width={100}
            src={item.image}
            style={{ objectFit: "fill", height: "100px" }}
          />
        </div>
        <div className="w-[50%]">
          <h3 className="font-semibold">{item.name}</h3>
          <p>Quantity: {item.quantity}</p>
          {item.milk && <p>{item.milk} Milk</p>}
          {item.size && <p>{item.size}</p>}
        </div>
      </div>
    </div>
  ));
  return (
    <div className="overflow-auto max-h-[90vh] h-auto">{checkoutItems}</div>
  );
};

export default CheckoutItemList;
