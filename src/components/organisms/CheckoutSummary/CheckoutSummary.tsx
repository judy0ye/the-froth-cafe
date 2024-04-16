import { fetchShoppingCart } from "@/lib/data";
import CheckoutForm from "@/components/molecules/CheckoutForm/CheckoutForm";
import { submitOrder } from "@/lib/actions";
import { Fascinate } from "next/font/google";
import CheckoutItemList from "@/components/molecules/CheckoutItemList/CheckoutItemList";
// import { submitOrder } from "@/lib/actions";

const CheckoutSummary = async () => {
  // const shoppingCart = await fetchShoppingCart();
  const finalCartItems = (await fetchShoppingCart())[0];
  // const finalCartItems = (await fetchCartItems()) || [];
  const subtotalPrice = finalCartItems.product_item?.reduce(
    (total, current) => {
      total += current.price * current.quantity;
      return total;
    },
    0,
  );

  const taxableItems = finalCartItems.product_item?.filter(
    (item) => item.milk === null,
  );

  const taxOnFood =
    taxableItems?.reduce((total, currentValue) => {
      total += currentValue.price * 0.09;
      return total;
    }, 0) ?? 0;

  const createOptions = () => {
    const timeOptionsArray = [];
    const currentTime = new Date();
    const closingTime = 22 * 60;

    for (let i = 0; i < 5; i++) {
      const timeToAlter = new Date(currentTime);
      timeToAlter.setMinutes(currentTime.getMinutes() + 15 + i * 15);
      let hours = timeToAlter.getHours();
      const minutes = String(timeToAlter.getMinutes()).padStart(2, "0");
      const totalMinutes = hours * 60 + timeToAlter.getMinutes();

      if (totalMinutes >= closingTime) {
        timeOptionsArray.push("Sorry, our cafe is closed at this time");
        break;
      }

      const amPm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const timeOption = `${hours}:${minutes} ${amPm}`;

      timeOptionsArray.push(timeOption);
    }
    return timeOptionsArray;
  };
  const allTimeOptions = createOptions();

  const total = taxOnFood + (subtotalPrice || 0);

  // const submitOrderWithTotal = submitOrder.bind(null, total, sessionId);

  return (
    <div className="flex flex-col md:flex-row-reverse justify-around">
      <div className="flex flex-col border-slate-400 border-2 px-4 rounded-md w-full md:w-1/3 h-full md:sticky top-20">
        <CheckoutItemList finalCartItems={finalCartItems} />
        <span className="flex justify-between gap-2 pt-6 ">
          <p className="text-lg font-semibold">Subtotal: </p>
          <p>${subtotalPrice?.toFixed(2)}</p>
        </span>
        <span className="flex justify-between gap-2 pt-2  border-black border-b-2">
          <p className="text-lg font-semibold">Tax:</p>
          <p>${taxOnFood.toFixed(2)}</p>
        </span>
        <span className="flex justify-between gap-2 pt-2 py-2 ">
          <p className="text-lg font-semibold">Total: </p>
          <p>${total.toFixed(2)} </p>
        </span>
      </div>
      <CheckoutForm
        // submitOrderWithTotal={submitOrderWithTotal}
        allTimeOptions={allTimeOptions}
        total={total}
        finalCartItems={finalCartItems}
        // sessionId={sessionId}
        // allProductItemIds={allProductItemIds}
      />
    </div>
  );
};

export default CheckoutSummary;
