import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const getNavigation = (user) => {
  const location = useLocation();
  const currentPath = location.pathname;
  if (!user) {
    return [
      { name: "Home", href: "/", current: currentPath === "/" },
      {
        name: "Find Tutors",
        href: "/tutors",
        current: currentPath === "/tutors",
      },
      {
        name: "Register",
        href: "/register",
        current: currentPath === "/register",
      },
      { name: "Login", href: "/login", current: currentPath === "/login" },
    ];
  }

  switch (user.user.role) {
    case "admin":
      return [
        {
          name: "Dashboard",
          href: "/admin/dashboard",
          current: currentPath === "/admin/dashboard",
        },
      ];

    case "student":
      return [
        {
          name: "Dashboard",
          href: "/dashboard",
          current: currentPath === "/dashboard",
        },
        // {
        //   name: "My Lessons",
        //   href: "/student/lessons",
        //   current: currentPath === "/student/lessons",
        // },
        {
          name: "Browse Mentors",
          href: "/dashboard/Mentors",
          current: currentPath === "/dashboard/Mentors",
        },
        // {
        //   name: "Payments",
        //   href: "/student/payments",
        //   current: currentPath === "/student/payments",
        // },
        {
          name: "Become a Mentor",
          href: "/dashboard/MentorRequest",
          current: currentPath === "/dashboard/MentorRequest",
        },
        {
          name: "Profile",
          href: "/dashboard/userProfile",
          current: currentPath === "/dashboard/userProfile",
        },
        
      ];

    case "mentor":
      return [
        {
          name: "Dashboard",
          href: "/mentor/dashboard",
          current: currentPath === "/mentor/dashboard",
        },
        {
          name: "My Schedule",
          href: "/mentor/schedule",
          current: currentPath === "/mentor/schedule",
        },
        {
          name: "Earnings",
          href: "/mentor/earnings",
          current: currentPath === "/mentor/earnings",
        },
        {
          name: "Profile",
          href: "/mentor/profile",
          current: currentPath === "/mentor/profile",
        },
        { name: "Logout", href: "/logout", current: currentPath === "/logout" },
      ];

    default:
      return [
        { name: "Home", href: "/", current: currentPath === "/" },
        {
          name: "Register",
          href: "/register",
          current: currentPath === "/register",
        },
        { name: "Login", href: "/login", current: currentPath === "/login" },
      ];
  }
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar({ user }) {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img alt="Your Company" src="" className="h-8 w-auto" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {getNavigation(user).map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                {user && (
                  <p className="text-blue-300 px-3 py-2 text-sm font-medium">
                    {user.email}
                  </p>
                )}
              </div>
            </div>
          </div>
          {user && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src={user.user.profilePicture}
                      className="size-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <MenuItem>
                    <Link
                      to="/dashboard/userProfile"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Your Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/logout"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Log out
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          )}
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {getNavigation(user).map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
          {user && (
            <p className="text-blue-300 px-3 py-2 text-sm font-medium">
              {user.email}
            </p>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
