import { getBase64 } from "@/lib/data";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";

const data = [
  {
    blurredsrc:
      "https://images.pexels.com/photos/302894/pexels-photo-302894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    src: "/coffee-machine.webp",
    alt: "espresso machine making coffee",
    tagline: "Taste our refreshing coffee collection",
    link: "/beverages",
    title: "Shop Coffee",
  },
  {
    blurredsrc:
      "https://images.pexels.com/photos/5964501/pexels-photo-5964501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    src: "/croissant.webp",
    alt: "hand holding a tray of croissants",
    tagline: "Taste our refreshing bakery collection",
    link: "/food",
    title: "Shop Food",
  },
];

const HomePageContent = () => {
  const display = data.map(async (content, index) => {
    const base64Image = await getBase64(content.blurredsrc || "");
    const { base64 } = await getPlaiceholder(base64Image);
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
            placeholder="blur"
            blurDataURL={base64}
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
