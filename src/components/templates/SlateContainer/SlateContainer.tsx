import { ReactNode } from "react";

const SlateContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="from-slate-300 to-slate-200 bg-gradient-to-b px-4 h-[45vh]">
      {children}
    </div>
  );
};

export default SlateContainer;
