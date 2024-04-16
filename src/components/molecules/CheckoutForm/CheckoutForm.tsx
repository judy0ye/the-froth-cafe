"use client";
import SubmitBtn from "@/components/atoms/SubmitBtn/SubmitBtn";
import {
  clearShoppingCart,
  submitOrder,
  submitOrderSummary,
} from "@/lib/actions";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { CheckoutItemListTypes } from "../CheckoutItemList/CheckoutItemListTypes";
import { OrderSummaryTypes } from "@/lib/libTypes";

const CheckoutForm = ({
  allTimeOptions,
  total,
  finalCartItems,
}: {
  total: number;
  allTimeOptions: string[];
  finalCartItems: CheckoutItemListTypes;
}) => {
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: "",
  });

  const [ccInfo, setCcInfo] = useState({
    nameOnCard: "",
    ccNum: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const handleCustomerInputClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setCustomerInfo({
      fullName: "Jane Smith",
      streetAddress: "5555 Hire Me St.",
      city: "Oakland",
      state: "California",
      postalCode: "94606",
      phoneNumber: "510-123-4567",
    });
  };
  const handleCcInputClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setCcInfo({
      nameOnCard: "Jane Smith",
      ccNum: "1111 2222 3333 4444",
      expMonth: "05",
      expYear: "25",
      cvv: "123",
    });
  };

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };
  const handleCcInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCcInfo({ ...ccInfo, [name]: value });
  };
  // const submitOrderWithTotal = submitOrder.bind(
  //   null,
  //   total,
  //   allProductItemIds,
  // );
  const products: OrderSummaryTypes[] = finalCartItems.product_item.map(
    (cartItem) => ({
      product_id: cartItem.product_id,
      milk: cartItem.milk,
      size: cartItem.size,
      price: cartItem.price,
      quantity: cartItem.quantity,
    }),
  );

  const router = useRouter();
  return (
    <div className="w-full md:w-[60%]">
      {allTimeOptions.some((option) => option.includes("Sorry")) ? (
        <p className="font-bold text-2xl text-center">
          Sorry our cafe is closed at this time. Please come back at our opening
          hours!
        </p>
      ) : (
        <form
          action={async (formData) => {
            try {
              const orderSummaryId = await submitOrderSummary(products);
              const idArray = orderSummaryId.map((id) => id.id);
              const submitOrderWithTotal = submitOrder.bind(
                null,
                total,
                idArray,
              );
              await submitOrderWithTotal(formData);
              await clearShoppingCart(finalCartItems.id);
              router.push("/success");
            } catch (error) {
              redirect("/unsuccessful");
            }
          }}
        >
          <div className="flex justify-between  p-4 border-2 border-gray-500 rounded-md">
            <label htmlFor="pickupTime" className="text-lg font-semibold">
              Choose pickup time
            </label>
            <select id="pickupTime" name="pickupTime">
              {<option>ASAP</option>}
              {allTimeOptions?.map((timeOpt, index) => (
                <option key={index} value={timeOpt}>
                  {timeOpt}
                </option>
              ))}
            </select>
          </div>
          <fieldset className="flex flex-col gap-6 p-4 my-2 w-full border-2 border-gray-500 rounded-md">
            <span className="flex flex-col lg:flex-row justify-between">
              <legend className="text-lg font-bold pb-4">
                Customer Information
              </legend>
              <button
                onClick={handleCustomerInputClick}
                className="flex italic"
              >
                Click Me to Fill Customer Information
              </button>
            </span>
            <span>
              <div className="relative w-full">
                <input
                  required
                  id="fullName"
                  name="fullName"
                  value={customerInfo.fullName}
                  onChange={handleCustomerInfoChange}
                  placeholder=""
                  className="py-2 pl-2 border-2 w-full border-gray-500 rounded-md peer bg-transparent focus:ring-0 focus:border-blue-700"
                />
                <label
                  htmlFor="fullName"
                  className="absolute text-lg scale-75 inset-y-0 px-2 flex items-center pointer-events-none text-gray-600 peer-focus:text-blue-700 peer-focus:-translate-y-6  bg-white transform -translate-y-6 peer-placeholder-shown:scale-75 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:top-0"
                >
                  Full Name
                </label>
              </div>
            </span>

            <span>
              <div className="relative w-full">
                <input
                  required
                  id="streetAddress"
                  name="streetAddress"
                  value={customerInfo.streetAddress}
                  onChange={handleCustomerInfoChange}
                  placeholder=""
                  className=" py-2 pl-2 border-2 w-full border-gray-500 rounded-md peer  focus:ring-0 focus:border-blue-700"
                />
                <label
                  htmlFor="streetAddress"
                  className="absolute text-lg scale-75 inset-y-0 px-2 flex items-center pointer-events-none text-gray-600 peer-focus:text-blue-700 peer-focus:-translate-y-6  bg-white transform -translate-y-6 peer-placeholder-shown:scale-75 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:top-0"
                >
                  Street Address
                </label>
              </div>
            </span>
            <span className="flex flex-col gap-5 md:flex-row justify-between">
              <div className="relative w-full">
                <input
                  required
                  id="city"
                  name="city"
                  value={customerInfo.city}
                  onChange={handleCustomerInfoChange}
                  placeholder=""
                  className=" py-2 pl-2 border-2 w-full border-gray-500 rounded-md peer  focus:ring-0 focus:border-blue-700"
                />
                <label
                  htmlFor="city"
                  className="absolute text-lg scale-75 inset-y-0 px-2 flex items-center pointer-events-none text-gray-600 peer-focus:text-blue-700 peer-focus:-translate-y-6  bg-white transform -translate-y-6 peer-placeholder-shown:scale-75 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:top-0"
                >
                  City
                </label>
              </div>
              <div className="relative w-full">
                <input
                  required
                  id="state"
                  name="state"
                  value={customerInfo.state}
                  onChange={handleCustomerInfoChange}
                  placeholder=""
                  className=" py-2 pl-2 border-2 w-full border-gray-500 rounded-md peer  focus:ring-0 focus:border-blue-700"
                />
                <label
                  htmlFor="state"
                  className="absolute text-lg scale-75 inset-y-0 px-2 flex items-center pointer-events-none text-gray-600 peer-focus:text-blue-700 peer-focus:-translate-y-6  bg-white transform -translate-y-6 peer-placeholder-shown:scale-75 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:top-0"
                >
                  State
                </label>
              </div>
              <div className="relative w-full">
                <input
                  required
                  id="postalCode"
                  name="postalCode"
                  value={customerInfo.postalCode}
                  onChange={handleCustomerInfoChange}
                  placeholder=""
                  className=" py-2 pl-2 border-2 w-full border-gray-500 rounded-md peer  focus:ring-0 focus:border-blue-700"
                />
                <label
                  htmlFor="postalCode"
                  className="absolute text-lg scale-75 inset-y-0 px-2 flex items-center pointer-events-none text-gray-600 peer-focus:text-blue-700 peer-focus:-translate-y-6  bg-white transform -translate-y-6 peer-placeholder-shown:scale-75 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:top-0"
                >
                  Postal code
                </label>
              </div>
            </span>
            <span>
              <div className="relative w-full">
                <input
                  type="tel"
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                  value={customerInfo.phoneNumber}
                  onChange={handleCustomerInfoChange}
                  placeholder=""
                  className=" py-2 pl-2 border-2 w-full border-gray-500 rounded-md peer  focus:ring-0 focus:border-blue-700"
                />
                <label
                  htmlFor="phoneNumber"
                  className="absolute text-lg scale-75 inset-y-0 px-2 flex items-center pointer-events-none text-gray-600 peer-focus:text-blue-700 peer-focus:-translate-y-6  bg-white transform -translate-y-6 peer-placeholder-shown:scale-75 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:top-0"
                >
                  Phone Number
                </label>
              </div>
            </span>
          </fieldset>
          <fieldset className="flex flex-col gap-7 p-4 my-2 w-full border-2 border-gray-500 rounded-md">
            <span className="flex flex-col lg:flex-row justify-between">
              <legend className="text-lg font-bold pb-4">
                Payment Information
              </legend>
              <button onClick={handleCcInputClick} className="flex italic">
                Click Me to Fill Payment Information
              </button>
            </span>
            <div className="relative w-full">
              <input
                required
                id="nameOnCard"
                name="nameOnCard"
                value={ccInfo.nameOnCard}
                onChange={handleCcInfoChange}
                placeholder=""
                className=" py-2 pl-2 border-2 w-full border-gray-500 rounded-md peer  focus:ring-0 focus:border-blue-700"
              />
              <label
                htmlFor="nameOnCard"
                className="absolute text-lg scale-75 inset-y-0 px-2 flex items-center pointer-events-none text-gray-600 peer-focus:text-blue-700 peer-focus:-translate-y-6  bg-white transform -translate-y-6 peer-placeholder-shown:scale-75 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:top-0"
              >
                Name on card
              </label>
            </div>
            <div className="relative w-full">
              <input
                required
                id="ccNum"
                name="ccNum"
                value={ccInfo.ccNum}
                onChange={handleCcInfoChange}
                placeholder=""
                className=" py-2 pl-2 border-2 w-full border-gray-500 rounded-md peer  focus:ring-0 focus:border-blue-700"
              />
              <label
                htmlFor="ccNum"
                className="absolute text-lg scale-75 inset-y-0 px-2 flex items-center pointer-events-none text-gray-700 peer-focus:text-blue-900 peer-focus:-translate-y-6  bg-white transform -translate-y-6 peer-placeholder-shown:scale-75 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:top-0"
              >
                Credit Card Number
              </label>
            </div>

            <span className="flex flex-col lg:flex-row gap-5 justify-between">
              <div className="flex">
                <div className="relative w-full">
                  <input
                    required
                    id="expMonth"
                    name="expMonth"
                    value={ccInfo.expMonth}
                    onChange={handleCcInfoChange}
                    type="text"
                    maxLength={2}
                    minLength={2}
                    pattern="\d{2}"
                    placeholder=""
                    className=" py-2 pl-2 border-2 w-full border-gray-500 rounded-md peer  focus:ring-0 focus:border-blue-700"
                  />
                  <label
                    htmlFor="expMonth"
                    className="absolute text-lg scale-75 inset-y-0 px-2 flex items-center pointer-events-none text-gray-700 peer-focus:text-blue-900 peer-focus:-translate-y-8 xs:peer-focus:-translate-y-6  bg-white transform -translate-y-8 xs:-translate-y-6 peer-placeholder-shown:scale-75 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:top-0"
                  >
                    exp month (MM)
                  </label>
                </div>
                <p className="text-2xl flex items-center">/</p>
                <div className="relative w-full">
                  <input
                    required
                    id="expYear"
                    name="expYear"
                    value={ccInfo.expYear}
                    onChange={handleCcInfoChange}
                    type="text"
                    maxLength={2}
                    minLength={2}
                    pattern="\d{2}"
                    placeholder=""
                    className=" py-2 pl-2 border-2 w-full border-gray-500 rounded-md peer  focus:ring-0 focus:border-blue-700"
                  />
                  <label
                    htmlFor="expYear"
                    className="absolute text-lg scale-75 inset-y-0 px-2 flex items-center pointer-events-none text-gray-700 peer-focus:text-blue-900 peer-focus:-translate-y-8 xs:peer-focus:-translate-y-6  bg-white transform -translate-y-8 xs:-translate-y-6 peer-placeholder-shown:scale-75 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:top-0"
                  >
                    exp year (YY)
                  </label>
                </div>
              </div>
              <div className="relative w-[50%]">
                <input
                  required
                  id="cvv"
                  name="cvv"
                  value={ccInfo.cvv}
                  onChange={handleCcInfoChange}
                  placeholder=""
                  className=" py-2 pl-2 w-full border-2 border-gray-500 rounded-md peer  focus:ring-0 focus:border-blue-700"
                />
                <label
                  htmlFor="cvv"
                  className="absolute text-lg scale-75 inset-y-0 px-2 flex items-center pointer-events-none text-gray-600 peer-focus:text-blue-700 peer-focus:-translate-y-6  bg-white transform -translate-y-6 peer-placeholder-shown:scale-75 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:top-0"
                >
                  CVV
                </label>
              </div>
            </span>
          </fieldset>
          <SubmitBtn total={total} />
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
