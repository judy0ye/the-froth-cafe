import Footer from "@/components/organisms/Footer/Footer";
import Header from "@/components/organisms/Header/Header";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className="min-h-[80vh] sm:min-h-[85vh]">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
