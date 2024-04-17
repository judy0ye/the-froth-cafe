import UserTypes from "@/components/atoms/UserLogo/UserLogoTypes";
import NavigationRoutes from "../../molecules/NavigationRoutes/NavigationRoutes";

const SideNavigation = ({
  toggleMenu,
  user,
}: {
  toggleMenu: () => void;
  user: UserTypes | null;
}) => {
  return (
    <>
      <div className="flex justify-end">
        {user !== null && <p>Hi {user.email}</p>}
      </div>
      <nav>
        <div className="font-bold flex flex-col pt-5 pl-2 gap-8">
          <NavigationRoutes user={user} toggleMenu={toggleMenu} />
        </div>
      </nav>
    </>
  );
};

export default SideNavigation;
