import { ChangeEvent, RefObject } from "react";

export default interface QuantitySelectorTypes {
  value: number;
  handleFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formRef?: RefObject<HTMLInputElement>;
}
