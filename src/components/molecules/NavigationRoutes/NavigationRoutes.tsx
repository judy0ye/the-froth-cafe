import Link from "next/link";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {
  IconCaretDown,
  IconLogout,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { clearCaches, logOut } from "@/lib/actions";
import { useRouter } from "next/navigation";
import UserTypes from "@/components/atoms/UserLogo/UserLogoTypes";

const NavigationRoutes = ({
  toggleMenu,
  user,
}: {
  toggleMenu?: () => void;
  user?: UserTypes | null;
}) => {
  const router = useRouter();
  const handleLogOut = async () => {
    await logOut();
    clearCaches();
    toggleMenu && toggleMenu();
    if (sessionStorage.getItem("prevPage") !== undefined) {
      sessionStorage.removeItem("prevPage");
    }
    router.push("/");
  };
  return (
    <>
      <NavigationMenu.Root className="relative">
        <NavigationMenu.List className="flex flex-col sm:flex-row list-none rounded-[6px] p-1 ">
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className=" hover:bg-gray-200 group flex items-center justify-between gap-[2px] rounded-[4px] px-3 py-2  leading-none  ">
              Menu
              <IconCaretDown
                className="text-black relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                aria-hidden
              />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute top-[40px] sm:top-[58px] bg-white sm:border-black border-2 rounded-md">
              <ul onClick={toggleMenu} className="flex flex-col gap-5 m-5 ">
                <li>
                  <NavigationMenu.Link asChild>
                    <Link href={"/food"} className="p-2 hover:bg-gray-200">
                      Food
                    </Link>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link asChild>
                    <Link
                      href={"/beverages"}
                      className="p-2 hover:bg-gray-200 "
                    >
                      Beverages
                    </Link>
                  </NavigationMenu.Link>
                </li>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item className="hover:bg-gray-200 self-start sm:self-center rounded-[4px] px-3 py-3  leading-none">
            <Link href={"/fallback"}>About</Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item className=" hover:bg-gray-200 self-start sm:self-center rounded-[4px] px-3 py-3  leading-none  ">
            <Link href={"/fallback"}>Contact</Link>
          </NavigationMenu.Item>
          {user !== null && (
            <NavigationMenu.Item className="sm:hidden hover:bg-gray-200 self-start sm:self-center rounded-[4px] px-3 py-3  leading-none  ">
              <Link
                className="flex items-center gap-2"
                onClick={toggleMenu}
                href={"/orders"}
              >
                <IconTruckDelivery />
                View Orders
              </Link>
            </NavigationMenu.Item>
          )}

          <NavigationMenu.Item className="sm:hidden hover:bg-gray-200 self-start sm:self-center rounded-[4px] px-3 py-3  leading-none  ">
            {user !== null ? (
              <button
                onClick={handleLogOut}
                className="flex items-center gap-2"
              >
                <IconLogout />
                Log Out
              </button>
            ) : (
              <Link onClick={toggleMenu} href={"/login"}>
                Log In
              </Link>
            )}
          </NavigationMenu.Item>

          <NavigationMenu.Indicator className="hidden sm:visible data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full sm:flex z-[1] h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
            <div className="relative sm:top-[35%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-black" />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </>
  );
};

export default NavigationRoutes;
