import Image from "next/image";
import Link from "next/link";
import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

const Fallback = async () => {
  const buffer = await fs.readFile("./public/cat.jpg");
  const { base64 } = await getPlaiceholder(buffer);
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
