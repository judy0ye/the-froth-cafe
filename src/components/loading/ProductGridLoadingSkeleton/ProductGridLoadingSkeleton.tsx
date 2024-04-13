const ProductGridLoadingSkeleton = () => {
  return (
    <main className=" my-5 mx-10 h-full gap-8 animate-pulse flex flex-col">
      <div>
        <div className="w-[160px] h-[40px] bg-slate-500"></div>
        <div className="py-6 h-full place-items-center gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className=" bg-slate-500 h-[200px] w-[200px] rounded-full"></div>
          <div className=" bg-slate-500 h-[200px] w-[200px] rounded-full"></div>
          <div className=" bg-slate-500 h-[200px] w-[200px] rounded-full"></div>
          <div className=" bg-slate-500 h-[200px] w-[200px] rounded-full"></div>
        </div>
      </div>
      <div>
        <div className="w-[160px] h-[40px] bg-slate-500"></div>
        <div className="py-6 h-full place-items-center gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className=" bg-slate-500 h-[200px] w-[200px] rounded-full"></div>
          <div className=" bg-slate-500 h-[200px] w-[200px] rounded-full"></div>
          <div className=" bg-slate-500 h-[200px] w-[200px] rounded-full"></div>
          <div className=" bg-slate-500 h-[200px] w-[200px] rounded-full"></div>
        </div>
      </div>
    </main>
  );
};

export default ProductGridLoadingSkeleton;
