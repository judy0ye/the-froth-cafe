"use client";
import CartItem from "@/components/molecules/CartItem/CartItem";
import CartTotal from "@/components/molecules/CartTotal/CartTotal";
import { useRef, useState } from "react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { ItemsInCartTypes } from "@/components/molecules/ProductOptions/ProductOptionsTypes";

const CartContent = ({ cartItems }: { cartItems: ItemsInCartTypes[] }) => {
  const pathname = usePathname();
  const router = useRouter();
  const subtotalPrice = cartItems?.reduce((total, current) => {
    total += current.price * current.quantity;
    return total;
  }, 0);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const allItems = cartItems?.map((item, index) => (
    <div key={index}>
      <CartItem item={item} setAlert={setAlert} setIsLoading={setIsLoading} />
      {index < cartItems.length - 1 && (
        <div className="border-gray-700 mx-1 border-b-2"></div>
      )}
    </div>
  ));

  return (
    <>
      {cartItems.length === 0 ? (
        <p className="font-bold text-2xl py-4 text-center">
          Your cart is empty
        </p>
      ) : (
        <>
          <div className={"flex flex-col justify-between md:flex-row gap-8"}>
            <div
              className={clsx("w-full", {
                "border-2": pathname.startsWith("/cart"),
                "rounded-md": pathname.startsWith("/cart"),
              })}
            >
              {allItems}
            </div>
            <div className="sticky top-20 flex flex-col w-full md:w-[60%] lg:w-[70%] items-end md:py-6  gap-4 md:border-2 rounded-md h-full">
              <CartTotal
                cartItems={cartItems}
                subtotalPrice={subtotalPrice}
                alert={alert}
                isLoading={isLoading}
              />
              <button
                onClick={() => router.push("/checkout")}
                disabled={alert}
                className={clsx(
                  "border-gray-700 border-2 p-2 md:mx-1 lg:mx-6 text-center text-sm bg-gray-900 text-white rounded-md",
                  {
                    "cursor-pointer": !alert,
                    "cursor-not-allowed": alert,
                  },
                )}
              >
                Check Out
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartContent;
