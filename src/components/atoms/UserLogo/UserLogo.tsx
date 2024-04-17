"use client";

import {
  IconChevronCompactDown,
  IconLogout,
  IconTruckDelivery,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { logOut } from "@/lib/actions";
import UserTypes from "./UserLogoTypes";
import { useRouter } from "next/navigation";

const UserLogo = ({ user }: { user: UserTypes | null }) => {
  const router = useRouter();
  const handleLogOut = async () => {
    await logOut();
    if (sessionStorage.getItem("prevPage") !== undefined) {
      sessionStorage.removeItem("prevPage");
    }
  };
  return (
    <>
      <div className="flex items-center">
        {user === null && (
          <Link className="flex flex-col items-center" href={"/login"}>
            <IconUser size={30} />
            <p className="text-sm whitespace-nowrap">Log In</p>
          </Link>
        )}
        <Menu as="div" className="relative">
          <div>
            <Menu.Button
              aria-hidden
              className="flex flex-col px-1 items-center rounded-md  text-sm font-medium  hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              {user && (
                <p className="line-clamp-2 text-ellipsis overflow-hidden ">
                  Hi {user.email}
                </p>
              )}
              {user && (
                <>
                  <IconChevronCompactDown
                    className="  text-black hover:text-blue-700 "
                    aria-hidden="true"
                    tabIndex={0}
                  />
                  <span className="sr-only">Down arrow to view options</span>
                </>
              )}
            </Menu.Button>
          </div>
          {user !== null && (
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => router.push("/orders")}
                        className={`${
                          active ? "bg-gray-200 text-black" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <IconTruckDelivery />
                        <p className="mx-2">View Orders</p>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogOut}
                        className={`${
                          active ? "bg-gray-200 text-black" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <IconLogout />
                        <p className="mx-2">Log Out</p>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          )}
        </Menu>
      </div>
    </>
  );
};

export default UserLogo;
