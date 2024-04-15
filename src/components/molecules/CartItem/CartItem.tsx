import QuantitySelector from "@/components/atoms/QuantitySelector/QuantitySelector";
import { clearCaches, deleteFromCart, updateCart } from "@/lib/actions";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { ItemsInCartTypes } from "../ProductOptions/ProductOptionsTypes";

const CartItem = ({
  item,
  formRef,
  setAlert,
}: {
  item: ItemsInCartTypes;
  formRef: React.RefObject<HTMLInputElement>;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const [quantity, setQuantity] = useState(item.quantity);
  const [updatedPrice, setUpdatedPrice] = useState(item.price * item.quantity);
  const addRef = useRef<HTMLButtonElement>(null);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAlert(true);
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);

    const updated = item.price * newQuantity;
    setUpdatedPrice(updated);
  };

  const handleAddClick = async (e: FormEvent) => {
    e.preventDefault();
    await updateCart(quantity, item.id);
    clearCaches();
    setAlert(false);
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
      <div className="w-[50%] flex justify-center">
        <Image
          alt={item.name}
          height={130}
          width={120}
          src={item.image}
          style={{ objectFit: "fill", height: "130px" }}
        />
      </div>
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
