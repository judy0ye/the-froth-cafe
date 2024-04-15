import Hero from "@/components/organisms/Hero/Hero";
import ProductGrid from "@/components/organisms/ProductGrid/ProductGrid";
import { Suspense } from "react";
import Loading from "./loading";

const Beverages = () => {
  return (
    <>
      <Hero />
      <Suspense fallback={<Loading />}>
        <ProductGrid location="beverages" />
      </Suspense>
    </>
  );
};

export default Beverages;
