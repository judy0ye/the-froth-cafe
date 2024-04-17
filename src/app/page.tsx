import HomePageContent from "@/components/organisms/HomePageContent/HomePageContent";
import LightContainer from "@/components/templates/LightContainer/LightContainer";
import Image from "next/image";
import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

export default async function Home() {
  const buffer = await fs.readFile("./public/coffee-shop.jpeg");
  const { base64 } = await getPlaiceholder(buffer);
  return (
    <main className="flex flex-col gap-10">
      <div className="flex relative h-[75vh] bg-no-repeat sm:bg-right  ">
        <h1 className="md:rounded-r-md z-10 w-full self-start md:self-center font-bold text-2xl text-center bg-black text-white md:w-[65vw] p-4 md:p-8">
          Come enjoy your anytime pick me up at The Froth
        </h1>
        <Image
          alt="coffee shop"
          fill={true}
          src={"/coffee-shop.jpeg"}
          placeholder="blur"
          blurDataURL={base64}
        />
      </div>
      <LightContainer>
        <HomePageContent />
      </LightContainer>
    </main>
  );
}
