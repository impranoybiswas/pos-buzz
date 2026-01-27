
import { useEffect, useState } from "react";
import { Button, Card, Descriptions, Spin, Typography, message } from "antd";
import { useNavigate } from "react-router";
import axios from "axios";

const { Title } = Typography;

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await axios.get("http://localhost:3000/auth/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                message.error("Failed to load profile");
                localStorage.removeItem("token");
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        message.success("Logged out successfully");
        navigate("/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

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
                    <Descriptions.Item label="User ID">{user?.userId}</Descriptions.Item>
                    <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
                    {/* Note: In a real app, we might want to fetch full user details from DB by ID */}
                </Descriptions>
            </Card>
        </div>
    );
}
