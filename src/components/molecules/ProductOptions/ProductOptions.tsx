"use client";
import { ChangeEventHandler, FormEvent, useState } from "react";

import { useRouter } from "next/navigation";
import {
  addProductToCart,
  clearCaches,
  createShoppingCart,
  updateCart,
} from "@/lib/actions";
import QuantitySelector from "@/components/atoms/QuantitySelector/QuantitySelector";
import UserTypes, {
  ItemsInCartTypes,
  ProductCategoryTypes,
  ProductOptionsTypes,
} from "./ProductOptionsTypes";

const ProductOptions = ({
  product,
  category,
  user,
  shoppingCart,
  itemsInCart,
}: {
  product: ProductOptionsTypes;
  category?: ProductCategoryTypes;
  user: UserTypes | null;
  shoppingCart: { id: number; user_id: string }[];
  itemsInCart?: ItemsInCartTypes[];
}) => {
  const router = useRouter();
  const sizeOptions = [
    { value: "Small", price: 4.5 },
    { value: "Medium", price: 5.5 },
    { value: "Large", price: 6.5 },
  ];

  const milkOptions = [
    { value: "Oat" },
    { value: "Whole" },
    { value: "Lowfat" },
    { value: "Nonfat" },
    { value: "Almond" },
  ];

  const shoppingCartId = shoppingCart.length > 0 ? shoppingCart[0].id : null;

  const [formData, setFormData] = useState({
    product_id: product.id,
    name: product.name,
    image: product.image,
    size: category?.parent_category_id === 1 ? sizeOptions[1].value : null,
    milk: category?.parent_category_id === 1 ? milkOptions[0].value : null,
    price:
      category?.parent_category_id === 1
        ? sizeOptions[1].price
        : product.price || 0,
    quantity: 1,
    shopping_cart_id: shoppingCartId,
  });

  // if (sessionStorage.getItem("prevPage") !== undefined) {
  //   sessionStorage.removeItem("prevPage");
  // }
  const handleFormChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    const { name, value } = event.target;
    let price = formData.price;

    if (name === "size" && event.target instanceof HTMLSelectElement) {
      const selectedOption = event.target.selectedOptions[0];
      const priceAttribute = selectedOption.getAttribute("data-price");
      price = priceAttribute !== null ? parseFloat(priceAttribute) : price;
    }

    setFormData({
      ...formData,
      [name]: value,
      price: price,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      sessionStorage.setItem("prevPage", window.location.href);
      router.push("/login");
    }

    if (user !== null) {
      const matchingShoppingCart = shoppingCart.find(
        (cart) => cart.user_id === user.id,
      );
      let sameProduct;

      if (itemsInCart && itemsInCart?.length > 0) {
        sameProduct = itemsInCart.find(
          (cartItem) =>
            cartItem.name === formData.name &&
            cartItem.size === formData.size &&
            cartItem.milk === formData.milk,
        );
      }

      if (!matchingShoppingCart) {
        const shoppingCartId = await createShoppingCart(user?.id);
        await addProductToCart(formData, shoppingCartId);
      } else {
        if (sameProduct) {
          const updatedQty =
            Number(formData.quantity) + Number(sameProduct.quantity);
          await updateCart(updatedQty, sameProduct.id);
        } else {
          await addProductToCart(formData);
        }
      }

      clearCaches();
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8  items-center"
      >
        {category?.parent_category_id === 1 && (
          <div className="flex flex-col gap-16 sm:flex-row text-center w-full px-6 sm:px-24  sm:justify-evenly">
            <div className="flex flex-col w-full">
              <label
                htmlFor="size"
                className="font-bold text-lg border-gray-800 border-b-4 rounded-md"
              >
                Size Options
              </label>
              {formData.size !== null && (
                <select
                  id="size"
                  name="size"
                  className="w-full h-10 text-lg "
                  onChange={handleFormChange}
                  value={formData.size}
                  required
                >
                  {sizeOptions.map((option, index) => (
                    <option
                      key={index}
                      data-price={option.price}
                      className="text-center "
                    >
                      {option.value}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="milk"
                className="font-bold text-lg border-gray-800 border-b-4 rounded-md"
              >
                Milk Options
              </label>
              {formData.milk !== null && (
                <select
                  id="milk"
                  name="milk"
                  className="w-full h-10 text-lg"
                  onChange={handleFormChange}
                  value={formData.milk}
                  required
                >
                  {milkOptions.map((option, index) => (
                    <option key={index} className=" text-center">
                      {option.value}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        )}
        <p className="text-center font-semibold text-2xl ">
          ${formData.price?.toFixed(2)}
        </p>

        <QuantitySelector
          value={formData.quantity}
          handleFormChange={handleFormChange}
        />
        <button
          type="submit"
          className="size-10 bg-black text-white w-32 rounded-md"
        >
          Add to Cart
        </button>
      </form>
    </>
  );
};

export default ProductOptions;
