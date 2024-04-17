import { createClient } from "@/utils/supabase/server";

const fetchProductsByCategory = async (categoryId: number) => {
  const supabase = createClient();

  try {
    let { data, error } = await supabase
      .from("product_category")
      .select(
        `
        category_name,parent_category_id,
        product (
          id, name, image, product_category_id
        )
        `,
      )
      .eq("parent_category_id", categoryId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw new Error(
      `${(error as Error).message}- Failed in fetch products catch block`,
    );
  }
};

const fetchCategories = async (productId: number) => {
  const supabase = createClient();

  try {
    let { data, error } = await supabase
      .from("product_category")
      .select("id, parent_category_id")
      .eq("id", productId);

    if (error) {
      throw error;
    }

    if (data) {
      return data[0];
    }
  } catch (error) {
    throw new Error(
      `${(error as Error).message} - Failed in fetch categories catch block`,
    );
  }
};

const fetchIndividualProduct = async (name: string) => {
  const supabase = createClient();

  try {
    let { data, error } = await supabase
      .from("product")
      .select("id, name, description, image, product_category_id, price")
      .eq("name", name);

    if (error) {
      throw error;
    }

    if (data) {
      return data[0];
    }
  } catch (error) {
    throw new Error(
      `${(error as Error).message}- Failed in fetch individual product catch block`,
    );
  }
};
const fetchIndividualProductById = async (id: number) => {
  const supabase = createClient();

  try {
    let { data, error } = await supabase
      .from("product")
      .select("name, image")
      .eq("id", id);

    if (error) {
      throw error;
    }

    if (data) {
      return data[0];
    }
  } catch (error) {
    throw new Error(
      `${(error as Error).message}- Failed in fetch individual product catch block`,
    );
  }
};
const fetchPurchasedItems = async (id: number) => {
  const supabase = createClient();

  try {
    let { data, error } = await supabase
      .from("order_summary")
      .select("product_id, quantity, size, milk, price")
      .eq("id", id);

    if (error) {
      throw error;
    }

    if (data) {
      return data[0];
    }
  } catch (error) {
    throw new Error(
      `${(error as Error).message}- Failed in fetch individual product catch block`,
    );
  }
};

const getUser = async () => {
  const supabase = createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    throw new Error(
      `${(error as Error).message}- Failed in get user catch block`,
    );
  }
};

const fetchShoppingCart = async () => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("shopping_cart")
      .select(
        `id, user_id, product_item(id, product_id, name, size, milk, quantity, price, image, product(product_category_id))`,
      );

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw new Error(
      `${(error as Error).message}- Failed in fetch shopping cart catch block`,
    );
  }
};

const fetchItemsInCart = async (shoppingCartId: number) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("product_item")
      .select("id, name, size, milk, quantity, price, image")
      .eq("shopping_cart_id", shoppingCartId)
      .order("created_at");

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw new Error(
      `${(error as Error).message} - Failed in fetch items in cart catch block`,
    );
  }
};

const fetchSimilarSubCategories = async (
  productCatId: number,
  name: string,
) => {
  const supabase = createClient();

  try {
    let { data, error } = await supabase
      .from("product")
      .select("product_category_id, name, image")
      .not("name", "eq", name)
      .limit(4)
      .eq("product_category_id", productCatId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw new Error(
      `${(error as Error).message}- Failed in fetch similar subcategories catch block`,
    );
  }
};

const getBase64 = async (imgPath: string) => {
  try {
    const res = await fetch(imgPath);

    if (!res.ok) {
      throw new Error(`${res.status}: failed to fetch image`);
    }

    const arrayBuffer = await res.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    throw new Error(
      `${(error as Error).message}- Failed in fetch similar subcategories catch block`,
    );
  }
};

const fetchOrders = async () => {
  const supabase = createClient();

  try {
    let { data, error } = await supabase
      .from("order")
      .select("total, created_at, pickup_time, order_summary_id");

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw new Error(
      `${(error as Error).message}- Failed in fetch orders catch block`,
    );
  }
};
export {
  fetchProductsByCategory,
  fetchCategories,
  fetchIndividualProduct,
  fetchIndividualProductById,
  fetchPurchasedItems,
  getUser,
  fetchShoppingCart,
  fetchItemsInCart,
  fetchSimilarSubCategories,
  getBase64,
  fetchOrders,
};
