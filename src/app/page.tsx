import HomePageContent from "@/components/organisms/HomePageContent/HomePageContent";
import LightContainer from "@/components/templates/LightContainer/LightContainer";

export default function Home() {
  return (
    <main className="flex flex-col gap-10">
      <div className="flex h-[75vh] bg-[url('/coffee-shop.jpeg')] bg-no-repeat bg-top sm:bg-right bg-cover ">
        <h1 className="md:rounded-r-md w-full self-start md:self-center font-bold text-2xl text-center bg-black text-white md:w-[65vw] p-4 md:p-8">
          Come enjoy your anytime pick me up at The Froth
        </h1>
      </div>
      <LightContainer>
        <HomePageContent />
      </LightContainer>
    </main>
  );
}
