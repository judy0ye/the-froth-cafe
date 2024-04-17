import { getBase64 } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";

const Fallback = async () => {
  const base64Image = await getBase64(
    "https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ||
      "",
  );
  const { base64 } = await getPlaiceholder(base64Image);
  return (
    <>
      <h1 className="text-2xl sm:text-4xl font-bold text-center py-8 px-4">
        Sorry, this is a fake cafe but look at this cute cat!
      </h1>
      <div className="flex justify-center px-4">
        <Image
          height={500}
          width={500}
          alt="cat lying sideways"
          src={"/cat.jpg"}
          placeholder="blur"
          blurDataURL={base64}
        />
      </div>
      <div className="flex justify-center py-8">
        <Link
          href={"/"}
          className="border-gray-700 border-2 p-2 rounded-md bg-black text-white"
        >
          Go Back Home
        </Link>
      </div>
    </>
  );
};

export default Fallback;
