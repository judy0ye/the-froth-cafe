import CartContent from "@/components/organisms/CartContent/CartContent";
import { fetchItemsInCart, fetchShoppingCart } from "@/lib/data";

const Cart = async () => {
  // const cartItems = (await fetchShoppingCart())[0].product_item;

  const shoppingCart = await fetchShoppingCart();
  const cartItems = await fetchItemsInCart(shoppingCart[0].id);
  return (
    <div className="px-4 md:px-8 lg:px-28">
      <h1 className="text-4xl font-bold text-center py-4">Cart</h1>
      <CartContent cartItems={cartItems} />
    </div>
  );
};

export default Cart;
