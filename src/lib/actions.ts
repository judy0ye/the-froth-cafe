"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { ProductToAddTypes } from "./libTypes";

const logOut = async () => {
  const supabase = createClient();

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    revalidatePath("/", "layout");
  } catch (error) {
    throw new Error(
      `${(error as Error).message}- Failed in log out catch block`,
    );
  }
};

const clearCaches = async () => {
  try {
    revalidatePath("/");
  } catch (error) {
    throw new Error(
      `${(error as Error).message}- Failed in clear cashes catch block`,
    );
  }
};

const addProductToCart = async (
  formData: ProductToAddTypes,
  shoppingCartId?: number,
) => {
  const {
    product_id,
    name,
    image,
    price,
    size,
    milk,
    quantity,
    shopping_cart_id,
  } = formData;
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("product_item")
      .insert({
        product_id,
        name,
        image,
        price,
        quantity,
        size,
        milk,
        shopping_cart_id: shoppingCartId || shopping_cart_id,
      })
      .select("id, user_id, product_id, size, shopping_cart_id");

    if (error) {
      throw error;
    }

    if (data) {
      return data[0];
      // return data[0].id;
    }
  } catch (error) {
    throw new Error(
      `${(error as Error).message}-Failed in add product to cart catch block`,
    );
  }
};

const createShoppingCart = async (userId: string) => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("shopping_cart")
      .insert({ user_id: userId })
      .select("id");

    if (error) {
      throw error;
    }

    if (data) {
      // return data[0];
      return data[0].id;
    }
  } catch (error) {
    throw new Error(
      `${(error as Error).message} - Failed in create shopping cart catch block`,
    );
  }
};

const updateCart = async (quantity: number, sameProductId: number) => {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("product_item")
      .update({ quantity })
      .eq("id", sameProductId);

    if (error) {
      throw error;
    }
  } catch (error) {
    throw new Error(
      `${(error as Error).message}- Failed in update cart catch block`,
    );
  }
};

export {
  logOut,
  clearCaches,
  addProductToCart,
  createShoppingCart,
  updateCart,
};
