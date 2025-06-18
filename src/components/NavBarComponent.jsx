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
import logo from "../assets/logo.jpg";

const getNavigation = (user) => {
  const location = useLocation();
  const currentPath = location.pathname;

  if (!user) {
    return [
      { name: "Home", href: "/", current: currentPath === "/" },
      { name: "Register", href: "/register", current: currentPath === "/register" },
      { name: "Login", href: "/login", current: currentPath === "/login" },
    ];
  }

  switch (user.user.role) {
    case "admin":
      return [{ name: "Dashboard", href: "/admin/dashboard", current: currentPath === "/admin/dashboard" }];
    case "student":
      return [
        { name: "Dashboard", href: "/dashboard", current: currentPath === "/dashboard" },
        { name: "Courses", href: "/dashboard/courses", current: currentPath === "/dashboard/courses" },
        { name: "Browse Mentors", href: "/dashboard/Mentors", current: currentPath === "/dashboard/Mentors" },
        { name: "Become a Mentor", href: "/dashboard/MentorRequest", current: currentPath === "/dashboard/MentorRequest" },
        { name: "Profile", href: "/dashboard/userProfile", current: currentPath === "/dashboard/userProfile" },
      ];
    case "mentor":
      return [
        { name: "Dashboard", href: "/mentor", current: currentPath === "/mentor" },
        { name: "Courses", href: "/courses", current: currentPath === "/courses" },
        { name: "Profile", href: "/mentor/profile", current: currentPath === "/mentor/profile" },
      ];
    default:
      return [
        { name: "Home", href: "/", current: currentPath === "/" },
        { name: "Register", href: "/register", current: currentPath === "/register" },
        { name: "Login", href: "/login", current: currentPath === "/login" },
      ];
  }
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar({ user }) {
  return (
    <Disclosure as="nav" className="bg-blackCustom text-offWhite shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-offWhite hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
              <Bars3Icon className="block size-6 ui-open:hidden" aria-hidden="true" />
              <XMarkIcon className="hidden size-6 ui-open:block" aria-hidden="true" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img src={logo} alt="Logo" className="h-10 w-auto rounded-3xl" />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="flex space-x-4">
                {getNavigation(user).map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                {user && (
                  <p className="text-celestialBlue px-3 py-2 text-sm font-medium">{user.email}</p>
                )}
              </div>
            </div>
          </div>

          {user && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="flex rounded-full bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blackCustom focus:ring-white">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.user.profilePicture}
                      alt="User"
                    />
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white text-gray-900 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <MenuItem>
                    <Link to="/dashboard/userProfile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      Your Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/logout" className="block px-4 py-2 text-sm hover:bg-gray-100">
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
              className={classNames(
                item.current
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
          {user && (
            <p className="text-celestialBlue px-3 py-2 text-sm font-medium">{user.email}</p>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
