import ShoppingCartLogo from "@/components/atoms/ShoppingCartLogo/ShoppingCartLogo";

import UserLogo from "@/components/atoms/UserLogo/UserLogo";
import HeaderNavigation from "@/components/molecules/HeaderNavigation/HeaderNavigation";
import { ItemsInCartTypes } from "@/components/molecules/ProductOptions/ProductOptionsTypes";
import { fetchItemsInCart, fetchShoppingCart } from "@/lib/data";
import { createClient } from "@/utils/supabase/server";

const Header = async () => {
  const supabase = createClient();
  let cartItems: ItemsInCartTypes[] = [];
  const user = (await supabase.auth.getUser()).data.user;
  const shoppingCart = await fetchShoppingCart();
  if (shoppingCart.length > 0) {
    cartItems = await fetchItemsInCart(shoppingCart[0].id);
  }

  // const cartItems = await fetchItemsInCart(shoppingCart[0]?.id);
  // const cartItems = (await fetchShoppingCart())[0].product_item;
  // const cartItems = (await fetchShoppingCart())[0].product_item;
  const numOfProducts = cartItems?.length;

  return (
    <>
      <header className="flex w-full h-[fit] border-b-4 sticky top-0 z-50 bg-white">
        <HeaderNavigation />
        <div className="hidden sm:flex">
          <UserLogo user={user} />
        </div>
        <ShoppingCartLogo cartItems={cartItems} numOfProducts={numOfProducts} />
      </header>
    </>
  );
};

export default Header;
