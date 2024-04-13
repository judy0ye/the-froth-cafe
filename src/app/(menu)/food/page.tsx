import Hero from "@/components/organisms/Hero/Hero";
import ProductGrid from "@/components/organisms/ProductGrid/ProductGrid";
import { Suspense } from "react";
import Loading from "./loading";

const Food = () => {
  return (
    <>
      <Hero />
      <Suspense fallback={<Loading />}>
        <ProductGrid location="food" />
      </Suspense>
    </>
  );
};

export default Food;
