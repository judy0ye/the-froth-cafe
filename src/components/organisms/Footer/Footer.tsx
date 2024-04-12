import {
  IconBrandInstagram,
  IconBrandMeta,
  IconBrandX,
} from "@tabler/icons-react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="h-[10vh] border-t-4 px-6  py-1 flex items-center flex-col sm:flex-row justify-between">
        <p className="text-xl font-semibold">Connect With Us</p>
        <div className="flex gap-4">
          <Link href={"/fallback"}>
            <IconBrandX aria-label="X" size={30} />
          </Link>
          <Link href={"/fallback"}>
            <IconBrandInstagram aria-label="Instagram" size={30} />
          </Link>
          <Link href={"/fallback"}>
            <IconBrandMeta aria-label="meta" size={30} />
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
