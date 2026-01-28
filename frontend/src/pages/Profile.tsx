import { useEffect, useState } from "react";
import {
  Card,
  Descriptions,
  Typography,
  Avatar,
  Tag,
  Space,
  Divider,
  Badge,
} from "antd";
import api from "../libs/axios";
import {
  UserOutlined,
  MailOutlined,
  IdcardOutlined,
  VerifiedOutlined,
} from "@ant-design/icons";
import type { User } from "../types";

const { Title, Text } = Typography;

/**
 * Profile page component displaying information about the currently logged-in user.
 * Fetches user data from the backend and presents it in a premium formatted card.
 */
export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  /**
   * Effect hook to fetch user profile data on component mount.
   */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/profile");
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="py-12 flex justify-center">
      {/* Profile Container */}
      <Card
        variant="borderless"
        className="w-full max-w-2xl shadow-2xl rounded-3xl overflow-hidden bg-white/40 backdrop-blur-xl border border-white/20"
      >
        {/* Decorative Header Background */}
        <div className="relative h-32 bg-linear-to-r from-blue-600 to-indigo-600 -mx-6 -mt-6 mb-16">
          {/* Avatar Positioning */}
          <div className="absolute -bottom-12 left-8 p-1 bg-white rounded-full shadow-lg">
            <Avatar
              size={100}
              icon={<UserOutlined />}
              className="bg-blue-100 text-blue-600 border-4 border-white"
            />
          </div>
        </div>

        {/* Profile Details */}
        <div className="px-2">
          <Space orientation="vertical" size={2} className="mb-8">
            <div className="flex items-center gap-2">
              <Title level={2} className="m-0 text-slate-800">
                {user?.fullName || "User"}
              </Title>
              <VerifiedOutlined className="text-blue-500 text-xl" />
            </div>
            <Text type="secondary" className="text-slate-500 font-medium">
              POS Buzz User
            </Text>
          </Space>

          <Divider className="my-8" />

          {/* Information Grid */}
          <Descriptions
            title={
              <span className="text-slate-400 text-xs uppercase tracking-widest font-bold">
                Personal Information
              </span>
            }
            column={1}
            className="mt-6"
            labelStyle={{ fontWeight: 600, color: "#64748b", width: "150px" }}
          >
            <Descriptions.Item
              label={
                <Space>
                  <IdcardOutlined /> User ID
                </Space>
              }
            >
              <Tag className="rounded-full font-mono bg-slate-100 border-none px-3 py-1">
                {user?.userId || "N/A"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Space>
                  <MailOutlined /> Email Address
                </Space>
              }
            >
              <Text className="text-slate-700 font-medium underline decoration-blue-200 underline-offset-4">
                {user?.email}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Badge
                status="processing"
                text="Active Session"
                className="text-slate-600"
              />
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Card>
    </div>
  );
}
