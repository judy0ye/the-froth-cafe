"use client";

import { useEffect, useRef, useState } from "react";

import { IconMenu2, IconX } from "@tabler/icons-react";
import BrandLogo from "@/components/atoms/BrandLogo/BrandLogo";
import NavigationRoutes from "../NavigationRoutes/NavigationRoutes";

const HeaderNavigation = () => {
  const sideNavRef = useRef<HTMLDivElement | null>(null);
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setOpenMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sideNavRef.current &&
        !sideNavRef.current.contains(e.target as Node) &&
        openMenu
      ) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  return (
    <>
      <button className="sm:hidden pl-1" onClick={toggleMenu}>
        {!openMenu ? <IconMenu2 /> : <IconX />}
      </button>
      <BrandLogo />
      <nav className="hidden text-lg w-full sm:visible sm:flex sm:justify-between sm:items-center">
        <div className="w-full font-bold text-[16px]">
          <NavigationRoutes />
        </div>
      </nav>
    </>
  );
};

export default HeaderNavigation;
