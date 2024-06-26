import { ItemsInCartTypes } from "../ProductOptions/ProductOptionsTypes";

const CartTotal = ({
  cartItems,
  subtotalPrice,
  alert,
  isLoading,
}: {
  cartItems: ItemsInCartTypes[] | null;
  subtotalPrice: number;
  alert: boolean;
  isLoading: boolean;
}) => {
  const taxableItems = cartItems?.filter((item) => item.milk === null);

  const taxOnFood =
    taxableItems?.reduce((total, currentValue) => {
      total += currentValue.price * 0.09;
      return total;
    }, 0) ?? 0;

  const total = taxOnFood + subtotalPrice;

  return (
    <div className=" flex flex-col w-full p-2">
      <span className="flex justify-between gap-2 pt-2 md:mx-1 lg:mx-5">
        <p className="text-lg font-semibold">Subtotal: </p>
        {alert ? (
          <p className="text-[15px]">update quantity to view</p>
        ) : isLoading ? (
          <svg
            className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"
            viewBox="0 0 24 24"
          ></svg>
        ) : (
          <p className="text-gray-800 ">${subtotalPrice?.toFixed(2)}</p>
        )}
      </span>
      <span className="flex justify-between  items-center pt-2 md:mx-1 lg:mx-5">
        <p className="text-lg font-semibold">Tax: </p>
        <p className="text-gray-800 text-[15px]">calculated at check out</p>
      </span>
      <span className="flex justify-between  items-center pt-2 md:mx-1 lg:mx-5">
        <p className="text-lg font-semibold">Total: </p>
        <p className="text-gray-800  text-[15px]">calculated at check out</p>
      </span>
    </div>
  );
};

export default CartTotal;
