import { IconArrowNarrowRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

const data = [
  {
    src: "/coffee-machine.webp",
    alt: "espresso machine making coffee",
    tagline: "Taste our refreshing coffee collection",
    link: "/beverages",
    title: "Shop Coffee",
  },
  {
    src: "/croissant.webp",
    alt: "hand holding a tray of croissants",
    tagline: "Taste our refreshing bakery collection",
    link: "/food",
    title: "Shop Food",
  },
];

const HomePageContent = () => {
  const display = data.map(async (content, index) => {
    // let blurred;
    // try {
    //   const buffer = await fs.readFile(`public/${content.src}`);
    //   const { base64 } = await getPlaiceholder(buffer);
    //   blurred = base64;
    // } catch (error) {
    //   throw new Error(
    //     `${(error as Error).message}- Failed in returning base64 catch block`,
    //   );
    // }
    return (
      <Link href={content.link} key={index} className="flex flex-col gap-2">
        <div className="flex justify-center h-full">
          <Image
            alt={content.alt}
            width={600}
            height={400}
            style={{
              objectFit: "fill",
              maxHeight: "400px",
            }}
            className="sm:w-full"
            src={content.src}
            // placeholder="blur"
            // blurDataURL={blurred}
          />
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-xl pb-2">{content.title}</h2>
          <p>{content.tagline}</p>
          <p className="flex pt-4">
            BROWSE MENU <IconArrowNarrowRight aria-hidden />
          </p>
        </div>
      </Link>
    );
  });
  return (
    <div className="flex flex-col justify-evenly lg:flex-row my-8 sm:px-16  gap-10 ">
      {display}
    </div>
  );
};

export default HomePageContent;
