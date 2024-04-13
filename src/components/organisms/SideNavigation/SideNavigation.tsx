import NavigationRoutes from "../../molecules/NavigationRoutes/NavigationRoutes";

const SideNavigation = ({ toggleMenu }: { toggleMenu: () => void }) => {
  return (
    <>
      <nav>
        <div className="font-bold flex flex-col pt-5 pl-2 gap-8">
          <NavigationRoutes toggleMenu={toggleMenu} />
        </div>
      </nav>
    </>
  );
};

export default SideNavigation;
