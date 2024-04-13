"use client";

import { useEffect, useRef, useState } from "react";

import { IconMenu2, IconX } from "@tabler/icons-react";
import BrandLogo from "@/components/atoms/BrandLogo/BrandLogo";
import NavigationRoutes from "../NavigationRoutes/NavigationRoutes";
import clsx from "clsx";
import SideNavigation from "@/components/organisms/SideNavigation/SideNavigation";

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
        {!openMenu ? (
          <IconMenu2 aria-label="open side navigation menu" />
        ) : (
          <IconX aria-label="close side navigation menu" />
        )}
      </button>
      <BrandLogo />
      <nav className="hidden text-lg w-full sm:visible sm:flex sm:justify-between sm:items-center">
        <div className="w-full font-bold text-[16px]">
          <NavigationRoutes />
        </div>
      </nav>
      <div
        ref={sideNavRef}
        className={clsx(
          "fixed inset-y-16 left-0 z-10 bg-white h-fit w-full ease-in-out duration-300 shadow-md",
          {
            "translate-x-0": openMenu,
            "translate-x-[-100%]": !openMenu,
          },
        )}
      >
        <SideNavigation toggleMenu={toggleMenu} />
      </div>
    </>
  );
};

export default HeaderNavigation;
