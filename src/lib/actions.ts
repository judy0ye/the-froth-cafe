"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

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

export { logOut, clearCaches };
