import {
  fetchIndividualProductById,
  fetchOrders,
  fetchPurchasedItems,
} from "@/lib/data";
import Image from "next/image";

const OrderContent = async () => {
  const orders = await fetchOrders();

  if (!orders || orders.length === 0) {
    return (
      <p className="font-bold text-2xl py-4 text-center">Your have no orders</p>
    );
  }

  const orderDetails = await Promise.all(
    orders.map(async (order, index) => {
      const productsInOrderPromises = order.order_summary_id.map(
        async (id: number) => {
          const product = await fetchPurchasedItems(id);
          const productDetail = await fetchIndividualProductById(
            product?.product_id,
          );
          return { product, productDetail };
        },
      );

      const productsInOrder = await Promise.all(productsInOrderPromises);
      return (
        <div
          key={index}
          className="border-black border-b-2 flex flex-col gap-4 py-6 mx-10 sm:mx-30 md:mx-48"
        >
          <div>
            <p className="font-semibold">
              Date Ordered: {order.created_at.split("T")[0]}
            </p>
            <p>Total: ${order.total.toFixed(2)}</p>
          </div>

          {productsInOrder.map((product, productIndex) => (
            <div
              key={productIndex}
              className=" flex flex-col-reverse xs:flex-row items-center justify-between"
            >
              <div className="flex flex-col items-center xs:items-start">
                <p>{product.productDetail.name}</p>
                <p>Quantity: {product.product.quantity}</p>
                <p>Size: {product.product.size}</p>
                <p>Milk: {product.product.milk}</p>
              </div>
              <Image
                height={100}
                width={100}
                src={product.productDetail.image}
                alt={product.productDetail.name}
                style={{ objectFit: "fill", height: "100px" }}
              />
            </div>
          ))}
        </div>
      );
    }),
  );

  return <div>{orderDetails}</div>;
};

export default OrderContent;
