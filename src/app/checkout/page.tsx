import CheckoutSummary from "@/components/organisms/CheckoutSummary/CheckoutSummary";

const Checkout = () => {
  return (
    <div className="mx-1 xs:mx-5 sm:mx-10 md:mx-20">
      <h1 className="text-4xl font-bold text-center py-6">Check Out</h1>
      <CheckoutSummary />
    </div>
  );
};

export default Checkout;
