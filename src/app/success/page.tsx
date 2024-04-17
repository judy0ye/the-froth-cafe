import Link from "next/link";

const Success = () => {
  return (
    <div className="flex flex-col gap-4 items-center p-10 my-16 text-2xl font-semibold">
      <h1>Thank you for your Order!</h1>
      <Link
        href={"/"}
        className="border-gray-700 border-2 p-2 rounded-md bg-black text-white"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Success;
