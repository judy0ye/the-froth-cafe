import CartContent from "@/components/organisms/CartContent/CartContent";
import { fetchItemsInCart, fetchShoppingCart } from "@/lib/data";

const Cart = async () => {
  let category;
  let cartItems;
  const shoppingCart = await fetchShoppingCart();

  if (shoppingCart[0]?.product_item.length > 0) {
    category = Array.isArray(shoppingCart[0].product_item[0].product)
      ? shoppingCart[0].product_item[0].product[0].product_category_id
      : // @ts-ignore
        shoppingCart[0].product_item[0].product.product_category_id;
  }
  if (shoppingCart.length > 0) {
    cartItems = await fetchItemsInCart(shoppingCart[0]?.id);
  }
  return (
    <div className="px-4 md:px-8 lg:px-28">
      <h1 className="text-4xl font-bold text-center py-6">Cart</h1>
      {shoppingCart?.length > 0 && cartItems ? (
        <CartContent cartItems={cartItems} category={category} />
      ) : (
        <p className="font-bold text-2xl py-4 text-center">
          Your cart is empty
        </p>
      )}
    </div>
  );
};

export default Cart;
