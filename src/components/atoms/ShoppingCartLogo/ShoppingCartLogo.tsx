"use client";

import CartPreview from "@/components/organisms/CartPreview/CartPreview";
import { ItemsInCartTypes } from "@/components/molecules/ProductOptions/ProductOptionsTypes";
import { IconShoppingCart } from "@tabler/icons-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ShoppingCartLogo = ({
  cartItems,
  numOfProducts,
  category,
}: {
  cartItems: ItemsInCartTypes[];
  numOfProducts: number;
  category: number;
}) => {
  const pathname = usePathname();
  const cartPreviewRef = useRef<HTMLDivElement | null>(null);
  const [openCartPreview, setOpenCartPreview] = useState(false);
  const toggleCartPreview = () => {
    setOpenCartPreview(!openCartPreview);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        cartPreviewRef.current &&
        !cartPreviewRef.current.contains(e.target as Node) &&
        openCartPreview
      ) {
        setOpenCartPreview(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openCartPreview]);

  useEffect(() => {
    openCartPreview ? (document.body.style.overflow = "hidden") : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [openCartPreview]);
  return (
    <>
      {!pathname.startsWith("/checkout") && (
        <div className="relative flex items-center">
          {" "}
          <button
            className={clsx({
              "cursor-pointer": !pathname.startsWith("/cart"),
            })}
            onClick={toggleCartPreview}
            disabled={pathname.startsWith("/cart")}
          >
            {numOfProducts !== undefined && numOfProducts > 0 && (
              <div
                aria-label={`number of items in cart is ${numOfProducts}`}
                className="flex items-center justify-center absolute w-6 h-6 border-sky-800 border-2 bg-white top-1 right-1 rounded-full z-10"
              >
                {numOfProducts}
              </div>
            )}
            <IconShoppingCart aria-label="shopping cart" size={40} />
          </button>
        </div>
      )}
      {openCartPreview && (
        <div className="fixed inset-0 backdrop-blur-md"></div>
      )}
      <div
        ref={cartPreviewRef}
        role="dialog"
        aria-label="Cart Preview"
        aria-modal="true"
        className={clsx(
          "fixed inset-y-0 right-0 z-10 bg-white flex ease-in-out duration-300 shadow-md w-full sm:w-[50vw] lg:w-[40%]",
          {
            "translate-x-0": openCartPreview,
            "translate-x-[100%]": !openCartPreview,
          },
        )}
      >
        <CartPreview
          category={category}
          cartItems={cartItems}
          toggleCartPreview={toggleCartPreview}
        />
      </div>
    </>
  );
};

export default ShoppingCartLogo;
