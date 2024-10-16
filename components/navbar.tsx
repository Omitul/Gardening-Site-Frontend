import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import UserLoginButtonOrProfile from "./UserLoginButtonOrProfile";

import { Logo } from "@/components/icons";
import { siteConfig } from "@/src/config/site";

export const Navbar = () => {
  return (
    <NextUINavbar className="bg-green-400 w-full z-50 flex" position="sticky">
      <div className="flex justify-end items-center gap-x-96">
        <div className="flex justify-around items-center gap-x-32">
          <div className="flex justify-evenly items-center gap-x-48">
            <NavbarContent className="">
              <NavbarBrand as="li" className="gap-3 max-w-fit">
                <NextLink
                  className="flex items-center justify-start gap-1"
                  href="/"
                >
                  <Logo />
                  <p className="font-bold text-inherit">Gardening Site</p>
                </NextLink>
              </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="flex-1" justify="center">
              <ul className="hidden lg:flex gap-12">
                {siteConfig.navItems.map((item: any) => (
                  <NavbarItem key={item.href}>
                    <NextLink
                      className={clsx(
                        linkStyles({ color: "foreground" }),
                        "data-[active=true]:text-primary data-[active=true]:font-sans font-semibold",
                      )}
                      color="foreground"
                      href={item.href}
                    >
                      {item.label}
                    </NextLink>
                  </NavbarItem>
                ))}
              </ul>
            </NavbarContent>
          </div>

          <NavbarContent className="flex justify-end">
            <NavbarItem className="flex gap-2" />
          </NavbarContent>

          <NavbarContent className="sm:hidden pl-4" justify="end">
            <NavbarMenuToggle />
          </NavbarContent>
        </div>

        <div className="flex justify-end">
          <NavbarContent className="flex gap-x-8">
            <UserLoginButtonOrProfile />
          </NavbarContent>
        </div>
      </div>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item: any, index: any) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
