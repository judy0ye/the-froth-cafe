import { ReactNode } from "react";

const LightContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="from-[#dbd8d1] to-[#dbd8d1] bg-gradient-to-b px-4 ">
      {children}
    </div>
  );
};

export default LightContainer;
