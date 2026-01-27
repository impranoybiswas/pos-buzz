import { useEffect, useState } from "react";
import { Button, Card, Descriptions, Typography, message } from "antd";
import { useNavigate } from "react-router";
import axios from "axios";
import type { User } from "../types";

const { Title } = Typography;

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <Title level={2} className="m-0">User Profile</Title>
          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <Descriptions bordered column={1}>
          <Descriptions.Item label="User ID">
            {user?.userId}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {user?.email}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
