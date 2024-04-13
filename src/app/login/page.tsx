"use client";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { createClient } from "@/utils/supabase/client";
import { clearCaches } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (session) {
      clearCaches();
      router.push("/");
    }
  });

  return (
    <>
      <div className=" flex justify-center my-10">
        <div className="w-[50vw]">
          <Auth
            // onlyThirdPartyProviders
            // redirectTo={`${window.location.origin}`}
            providers={[]}
            supabaseClient={supabase}
            localization={{
              variables: {
                sign_in: {
                  email_input_placeholder: "",
                  password_input_placeholder: "",
                },
                forgotten_password: {
                  email_input_placeholder: "",
                },
                sign_up: {
                  email_input_placeholder: "",
                  password_input_placeholder: "",
                },
              },
            }}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "black",
                    brandAccent: "#333333",
                    defaultButtonBackgroundHover: "#333333",
                    brandButtonText: "white",
                    anchorTextColor: "#333333",
                    anchorTextHoverColor: "blue",
                    inputBackground: "transparent",
                    inputLabelText: "#333333",
                    inputText: "black",
                    inputBorder: "black",
                    messageBackgroundDanger: "white",
                    messageTextDanger: "#AE1C1F",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
