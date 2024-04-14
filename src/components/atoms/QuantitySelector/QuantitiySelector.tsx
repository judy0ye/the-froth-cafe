import * as Label from "@radix-ui/react-label";
import QuantitySelectorTypes from "./QuantitySelectorTypes";

const QuantitySelector = ({
  value,
  handleFormChange,
  formRef,
}: QuantitySelectorTypes) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-[15px] px-5">
      <Label.Root className="text-[15px] font-medium " htmlFor="quantity">
        Quantity
      </Label.Root>
      <input
        ref={formRef}
        className="shadow-black inline-flex h-[35px] w-[70px] text-center items-center justify-center rounded-[4px] px-[10px] text-[15px] focus:shadow-[0_0_0_2px_black] selection:color-black selection:bg-black"
        type="number"
        min={1}
        id="quantity"
        value={value}
        name="quantity"
        onChange={handleFormChange}
      />
    </div>
  );
};

export default QuantitySelector;
