import Hero from "@/components/organisms/Hero/Hero";
import ProductGrid from "@/components/organisms/ProductGrid/ProductGrid";
import { Suspense } from "react";
import Loading from "./loading";

const Beverages = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Hero />
        <ProductGrid location="beverages" />
      </Suspense>
    </>
  );
};

export default Beverages;
