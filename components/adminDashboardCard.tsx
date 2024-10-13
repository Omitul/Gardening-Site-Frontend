import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { TUser } from "@/types";
import { updateUser } from "@/src/services/authService";

export default function App() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://gardening-site-backend.vercel.app/api/user"
      );
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (
    userId: string,
    newRole: "user" | "admin"
  ) => {
    try {
      await updateUser(userId, { role: newRole });
      setUsers(
        (prevUsers) =>
          prevUsers.map((user: TUser) =>
            user._id === userId ? { ...user, role: newRole } : user
          ) as TUser[]
      );
    } catch (error) {
      setError("Failed to update role");
    }
  };

  const handleStatusChange = async (
    userId: string,
    newStatus: "basic" | "premium"
  ) => {
    try {
      await updateUser(userId, { accountType: newStatus });
      setUsers([
        ...users.map((user) =>
          user._id === userId ? { ...user, accountType: newStatus } : user
        ),
      ]);
    } catch (error) {
      setError("Failed to update accountType");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Table removeWrapper aria-label="Example dynamic collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <div className="flex flex-row gap-x-2">
                  <img
                    src={user.profilePicture || "/default-profile.png"}
                    alt={user.username}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                    }}
                  />
                  <div className="flex flex-col">
                    <div>{user.username}</div>
                    <div>{user.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.accountType}</TableCell>

              <TableCell>
                <div className="flex flex-1 gap-10">
                  <div className="flex flex-col gap-y-4">
                    <Button
                      onClick={() => handleRoleChange(user._id!, "admin")}
                      className="bg-red-400"
                    >
                      Change Role to Admin
                    </Button>
                    <Button
                      onClick={() => handleRoleChange(user._id!, "user")}
                      className="bg-blue-400"
                    >
                      Change Role to user
                    </Button>
                  </div>

                  <div className="flex flex-col gap-y-4">
                    <Button
                      onClick={() => handleStatusChange(user._id!, "basic")}
                      className="bg-gray-400"
                    >
                      Change Status to Basic
                    </Button>
                    <Button
                      onClick={() => handleStatusChange(user._id!, "premium")}
                      className="bg-yellow-500"
                    >
                      Change Status to Premium
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
