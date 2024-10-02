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
import { getAccessToken } from "@/src/services/authService/getCookie";
import { useRouter } from "next/navigation";
import { logout } from "@/src/services/authService";

export default function UserLoginButtonOrProfile() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await getAccessToken();
      console.log("Access Token:", token);
      setIsLoggedIn(!!token);
      setLoading(false);
    };

    checkToken();
  }, []);

  const handleLogin = () => {
    router.push("/login");
    setTimeout(() => {
      setIsLoggedIn(true);
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    logout();
  };

  if (loading) {
    setTimeout(() => {}, 1000);
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      {isLoggedIn ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Button
          onClick={handleLogin}
          className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Login
        </Button>
      )}
    </div>
  );
}
