import Image from "next/image";
// import CartProductTypes from "./CartPreviewTypes";
import CartItem from "@/components/molecules/CartItem/CartItem";
import Link from "next/link";
import { useRef, useState } from "react";
import { ItemsInCartTypes } from "@/components/molecules/ProductOptions/ProductOptionsTypes";
import CartTotal from "@/components/molecules/CartTotal/CartTotal";

const CartPreview = ({
  toggleCartPreview,
  cartItems,
}: {
  toggleCartPreview: () => void;
  cartItems?: ItemsInCartTypes[];
}) => {
  const subtotalPrice = cartItems?.reduce((total, current) => {
    total += current.price * current.quantity;
    return total;
  }, 0);
  const formRef = useRef<HTMLInputElement | null>(null);

  const [alert, setAlert] = useState(false);
  const allItems = cartItems?.map((item, index) => (
    <div key={index}>
      <CartItem item={item} formRef={formRef} setAlert={setAlert} />

      <div className="border-gray-700 mx-1 border-b-2"></div>
    </div>
  ));

  return (
    <div className="flex flex-col overflow-auto w-full">
      <div className="flex justify-between border-b-2 mx-1 p-6">
        <h1 className="text-2xl ">Cart</h1>
        <button onClick={toggleCartPreview}>X</button>
      </div>
      {allItems}
      {!cartItems || cartItems?.length === 0 ? (
        <p className="text-center font-bold text-lg py-6">Your cart is empty</p>
      ) : (
        <CartTotal
          cartItems={cartItems}
          subtotalPrice={subtotalPrice || 0}
          alert={alert}
        />
      )}

      <div className="flex flex-col items-center gap-2 py-6">
        <Link
          className="border-gray-700 border-2 p-2 w-[50%]  text-center cursor-pointer text-sm bg-gray-900 text-white rounded-md"
          href={"/cart"}
          onClick={toggleCartPreview}
        >
          Go to Cart
        </Link>
        <Link
          className="border-gray-700 border-2 p-2 w-[50%]  text-center cursor-pointer text-sm bg-gray-900 text-white rounded-md"
          href={"/checkout"}
          onClick={toggleCartPreview}
        >
          Check Out
        </Link>
      </div>
    </div>
  );
};

export default CartPreview;
