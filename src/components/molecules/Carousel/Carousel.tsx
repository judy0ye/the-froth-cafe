"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { CarouselTypes } from "./CarouselTypes";

const Carousel = ({
  relatedSubCategories,
}: {
  relatedSubCategories: CarouselTypes[];
}) => {
  const [current, setCurrent] = useState(0);
  const length = relatedSubCategories.length;

  const nextSlide = () => {
    if (current < length - 1) {
      setCurrent(current + 1);
    }
  };

  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <section>
      {relatedSubCategories.map((product, index) => {
        return (
          <div key={index} className="flex flex-col items-center ">
            {index === current && (
              <Link
                href={{
                  pathname: `/product/${product.name}`,
                  query: {
                    categoryId: `${product.product_category_id}`,
                  },
                }}
              >
                <p className="text-center">{product.name}</p>
                <Image
                  alt={product.name}
                  width={200}
                  height={200}
                  src={product.image}
                  style={{ objectFit: "contain", height: "200px" }}
                />
              </Link>
            )}
          </div>
        );
      })}
      <div className="flex justify-between py-2">
        {current !== 0 && (
          <div className="flex justify-start w-full ">
            <IconArrowLeft className="cursor-pointer" onClick={prevSlide} />
          </div>
        )}
        {current < length - 1 && (
          <div className="flex justify-end w-full">
            <IconArrowRight className="cursor-pointer" onClick={nextSlide} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Carousel;
