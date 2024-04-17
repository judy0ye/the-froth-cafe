import Hero from "@/components/organisms/Hero/Hero";
import ProductGrid from "@/components/organisms/ProductGrid/ProductGrid";
import { Suspense } from "react";
import Loading from "./loading";

const Food = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Hero />
        <ProductGrid location="food" />
      </Suspense>
    </>
  );
};

export default Food;
