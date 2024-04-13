import ShoppingCartLogo from "@/components/atoms/ShoppingCartLogo/ShoppingCartLogo";

import UserLogo from "@/components/atoms/UserLogo/UserLogo";
import HeaderNavigation from "@/components/molecules/HeaderNavigation/HeaderNavigation";

const Header = async () => {
  return (
    <>
      <header className="flex w-full h-[fit] border-b-4 sticky top-0 z-50 bg-white">
        <HeaderNavigation />
        <div className="hidden sm:flex">
          <UserLogo />
        </div>
        <ShoppingCartLogo />
      </header>
    </>
  );
};

export default Header;
