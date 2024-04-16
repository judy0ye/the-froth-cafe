import QuantitySelector from "@/components/atoms/QuantitySelector/QuantitySelector";
import { clearCaches, deleteFromCart, updateCart } from "@/lib/actions";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { ItemsInCartTypes } from "../ProductOptions/ProductOptionsTypes";
import Link from "next/link";

const CartItem = ({
  item,
  setAlert,
  toggleCartPreview,
  setIsLoading,
}: {
  item: ItemsInCartTypes;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  toggleCartPreview?: () => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const [quantity, setQuantity] = useState(item.quantity);
  const [updatedPrice, setUpdatedPrice] = useState(item.price * item.quantity);
  const addRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLInputElement | null>(null);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAlert(true);
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);

    const updated = item.price * newQuantity;
    setUpdatedPrice(updated);
  };

  // const handleAddClick = async (e: FormEvent) => {
  //   e.preventDefault();
  //   await updateCart(quantity, item.id);
  //   clearCaches();
  //   setAlert(false);
  // };

  const handleAddClick = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateCart(quantity, item.id);
      clearCaches();
      setAlert(false);
    } catch (error) {
      throw new Error(
        `${(error as Error).message}- Failed in handle add click catch block`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveClick = async (e: FormEvent) => {
    e.preventDefault();
    await deleteFromCart(item.id);
    clearCaches();
  };
  useEffect(() => {
    if (typeof window !== undefined) {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          formRef?.current &&
          !formRef.current.contains(e.target as Node) &&
          !addRef.current?.contains(e.target as Node)
        ) {
          setQuantity(item.quantity);
          setUpdatedPrice(item.price * item.quantity);
          setAlert(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [item.quantity, item.price, formRef, addRef, setAlert]);

  return (
    <div className="flex flex-col gap-2 xs:flex-row justify-evenly items-center py-6">
      <Link
        onClick={toggleCartPreview}
        href={{
          pathname: `/product/${item.name}`,
          query: {
            categoryId: `${
              Array.isArray(item.product)
                ? item.product[0]?.product_category_id
                : item.product?.product_category_id
            }`,
          },
        }}
        className="w-[50%] flex justify-center"
      >
        <Image
          alt={item.name}
          height={130}
          width={120}
          src={item.image}
          style={{ objectFit: "fill", height: "130px" }}
        />
      </Link>
      <div className="flex flex-col w-[50%] justify-center items-center">
        <h2>{item.name}</h2>
        {pathname.startsWith("/cart") && <p>{item.size}</p>}
        {pathname.startsWith("/cart") && item.milk && <p>{item.milk} milk</p>}
        <p>${updatedPrice.toFixed(2)}</p>
        <div>
          <form className="flex flex-col gap-2 justify-center">
            <QuantitySelector
              value={quantity}
              handleFormChange={handleFormChange}
              formRef={formRef}
            />
            <button
              ref={addRef}
              className="border-gray-700 border-2 px-2 cursor-pointer text-sm bg-gray-900 text-white rounded-md"
              onClick={handleAddClick}
            >
              Update
            </button>
            <button
              className="border-gray-700 border-2 px-2 cursor-pointer text-sm bg-gray-900 text-white rounded-md"
              onClick={handleRemoveClick}
            >
              Remove
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
