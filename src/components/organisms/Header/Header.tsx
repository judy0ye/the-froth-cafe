import ShoppingCartLogo from "@/components/atoms/ShoppingCartLogo/ShoppingCartLogo";
import UserLogo from "@/components/atoms/UserLogo/UserLogo";
import HeaderNavigation from "@/components/molecules/HeaderNavigation/HeaderNavigation";
import { ItemsInCartTypes } from "@/components/molecules/ProductOptions/ProductOptionsTypes";
import { fetchItemsInCart, fetchShoppingCart, getUser } from "@/lib/data";

const Header = async () => {
  let cartItems: ItemsInCartTypes[] = [];
  let category;
  const user = await getUser();

  const shoppingCart = await fetchShoppingCart();
  if (shoppingCart[0]?.product_item.length > 0) {
    category = Array.isArray(shoppingCart[0].product_item[0].product)
      ? shoppingCart[0].product_item[0].product[0].product_category_id
      : // @ts-ignore
        shoppingCart[0].product_item[0].product.product_category_id;
  }
  if (shoppingCart.length > 0) {
    cartItems = await fetchItemsInCart(shoppingCart[0].id);
  }

  const numOfProducts = cartItems?.length;

  return (
    <>
      <header className="flex w-full h-[fit] border-b-4 sticky top-0 z-50 bg-white">
        <HeaderNavigation user={user} />
        <div className="hidden sm:flex">
          <UserLogo user={user} />
        </div>
        <ShoppingCartLogo
          category={category}
          cartItems={cartItems}
          numOfProducts={numOfProducts}
        />
      </header>
    </>
  );
};

export default Header;
