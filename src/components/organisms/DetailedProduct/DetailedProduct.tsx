import DisplayProduct from "@/components/molecules/DisplayProduct/DisplayProduct";
import ProductOptions from "@/components/molecules/ProductOptions/ProductOptions";
import {
  fetchCategories,
  fetchIndividualProduct,
  fetchItemsInCart,
  fetchShoppingCart,
  getUser,
} from "@/lib/data";

const DetailedProduct = async ({ params }: { params: { slug: string } }) => {
  let itemsInCart;
  const decodedParam = decodeURIComponent(params.slug);
  const product = await fetchIndividualProduct(decodedParam);
  const category = await fetchCategories(product?.product_category_id);
  const shoppingCart = await fetchShoppingCart();
  // const itemsInCart = (await fetchShoppingCart())[0].product_item;
  if (shoppingCart.length > 0) {
    itemsInCart = shoppingCart[0].product_item;
  }
  // if (shoppingCart.length > 0) {
  //   itemsInCart = await fetchItemsInCart(shoppingCart.id);
  // }
  const user = await getUser();

  return (
    <>
      <DisplayProduct product={product} />
      <div className="py-12">
        <p className="font-semibold text-center px-4 pb-10">
          {product?.description}
        </p>
        {product && (
          <ProductOptions
            user={user}
            shoppingCart={shoppingCart}
            itemsInCart={itemsInCart}
            product={product}
            category={category}
          />
        )}
      </div>
    </>
  );
};

export default DetailedProduct;
