import HomePageContent from "@/components/organisms/HomePageContent/HomePageContent";
import LightContainer from "@/components/templates/LightContainer/LightContainer";
import { getBase64 } from "@/lib/data";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

export default async function Home() {
  const base64Image = await getBase64(
    "https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" ||
      "",
  );
  const { base64 } = await getPlaiceholder(base64Image);

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
