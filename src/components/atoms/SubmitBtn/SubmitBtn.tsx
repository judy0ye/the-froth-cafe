import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

const SubmitBtn = ({ total }: { total: number }) => {
  const { pending } = useFormStatus();
  const router = useRouter();

  return (
    <div className="flex justify-center py-4">
      {total === 0 ? (
        <p>Nothing to submit. Your cart is empty</p>
      ) : (
        <button
          type="submit"
          className="border-gray-700 border-2 p-2 rounded-md bg-black text-white w-full sm:w-1/2"
        >
          {pending ? "Submitting Order..." : "Submit Order"}
        </button>
      )}
    </div>
  );
};

export default SubmitBtn;
