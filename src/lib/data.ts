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
export { fetchProductsByCategory, fetchIndividualProduct };
