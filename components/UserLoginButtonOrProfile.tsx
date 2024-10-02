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
import { getDecodedData } from "@/src/lib/jwtDecode";

export default function UserLoginButtonOrProfile() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await getAccessToken();
      setIsLoggedIn(!!token);
      setLoading(false);

      if (token) {
        const decodedData = await getDecodedData();
        setRole(decodedData?.role || null); ///important to manage dropdown
      }
    };

    checkToken();
  }, []);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setRole(null);
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
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                textValue="Profile"
                className="h-14 gap-2"
              >
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>

              <DropdownItem key="Profile" textValue="Profile">
                Profile
              </DropdownItem>

              <DropdownItem key="dashboard" textValue="Dashboard">
                Dashboard
              </DropdownItem>

              <DropdownItem key="followers" textValue="Followers">
                Followers
              </DropdownItem>
              <DropdownItem key="following" textValue="Following">
                Following
              </DropdownItem>

              <DropdownItem key="setting" textValue="Settings">
                Settings
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
            onClick={handleLogin}
            className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                textValue="Profile"
                className="h-14 gap-2"
              >
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>

              <DropdownItem key="Profile" textValue="Profile">
                Profile
              </DropdownItem>

              <DropdownItem key="dashboard" textValue="Dashboard">
                Dashboard
              </DropdownItem>

              <DropdownItem key="setting" textValue="Settings">
                Settings
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
            onClick={handleLogin}
            className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </Button>
        )}
      </div>
    );
  }
}
