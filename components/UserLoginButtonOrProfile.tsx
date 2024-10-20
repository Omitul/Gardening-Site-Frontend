"use client";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { getAccessToken } from "@/src/services/authService/getCookie";
import { getUser, logout } from "@/src/services/authService";
import { getDecodedData } from "@/src/lib/jwtDecode";

export default function UserLoginButtonOrProfile() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await getAccessToken();

      // console.log("TOKEN", token);
      setIsLoggedIn(!!token);
      setLoading(false);

      if (token !== undefined) {
        const decodedData = await getDecodedData();

        setRole(decodedData?.role || null); ///important to manage dropdown
        const { email, profilePicture } = await getUser();

        setEmail(email);
        setProfilePic(profilePicture);
        // console.log("profilePicture", profilePic);
      }
    };

    checkToken();
  }, []);

  const handleLogin = () => {
    router.push("/login");
  };
  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      setRole(null);
      router.push("/");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return null;
  }

  if (role === "user")
    return (
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                src={profilePic!}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                className="h-14 gap-2"
                textValue="Profile"
              >
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{email}</p>
              </DropdownItem>

              <DropdownItem key="Profile" textValue="My Profile">
                {/* <DropdownItem key="followers" textValue="Followers">
                  Followers
                </DropdownItem>
                <DropdownItem key="following" textValue="Following">
                  Following
                </DropdownItem> */}
                <Link passHref href="/profile">
                  Profile
                </Link>
              </DropdownItem>

              <DropdownItem key="Dashboard" textValue="Dashboard">
                <Link passHref href="/dashboard">
                  Dashboard
                </Link>
              </DropdownItem>

              <DropdownItem
                key="logout"
                color="danger"
                textValue="Log Out"
                onClick={handleLogout}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button
            className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={handleLogin}
          >
            Login
          </Button>
        )}
      </div>
    );
  else {
    return (
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                src={profilePic!}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                className="h-14 gap-2"
                textValue="Profile"
              >
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{email}</p>
              </DropdownItem>

              <DropdownItem key="Profile" textValue="My Profile">
                {/* <DropdownItem key="followers" textValue="Followers">
                  Followers
                </DropdownItem>
                <DropdownItem key="following" textValue="Following">
                  Following
                </DropdownItem> */}
                <Link passHref href="/profile">
                  Profile
                </Link>
              </DropdownItem>

              <DropdownItem key="Dashboard" textValue="Dashboard">
                <Link passHref href="/admin-dashboard">
                  Dashboard
                </Link>
              </DropdownItem>

              <DropdownItem
                key="logout"
                color="danger"
                textValue="Log Out"
                onClick={handleLogout}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button
            className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={handleLogin}
          >
            Login
          </Button>
        )}
      </div>
    );
  }
}
