import { createClient } from "@/utils/supabase/server";

const fetchProductsByCategory = async (categoryId: number) => {
  const supabase = createClient();

  try {
    let { data: products, error } = await supabase
      .from("product_category")
      .select(
        `
        category_name,parent_category_id,
        product (
          product_id, name, image, product_category_id
        )
        `,
      )
      .eq("parent_category_id", categoryId);

    if (error) {
      throw error;
    }

    return products;
  } catch (error) {
    throw new Error(
      `${(error as Error).message}- Failed in fetch products catch block`,
    );
  }
};

export { fetchProductsByCategory }