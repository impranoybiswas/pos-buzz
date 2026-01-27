import { Menu, Button, Space } from "antd";
import { Link, useLocation } from "react-router";
import {
    HomeOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    LogoutOutlined,
} from "@ant-design/icons";

export default function Navbar() {
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    const menuItems = [
        {
            key: "/",
            icon: <HomeOutlined />,
            label: <Link to="/">Dashboard</Link>,
        },
        {
            key: "/products",
            icon: <ShoppingCartOutlined />,
            label: <Link to="/products">Products</Link>,
        },
        {
            key: "/profile",
            icon: <UserOutlined />,
            label: <Link to="/profile">Profile</Link>,
        },
    ];

    return (
        <header className="sticky top-0 z-50 w-full glass-card border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                                <ShoppingCartOutlined className="text-white text-xl" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                POS Buzz
                            </span>
                        </Link>

                        <nav className="hidden md:block">
                            <Menu
                                mode="horizontal"
                                selectedKeys={[location.pathname]}
                                items={menuItems}
                                className="bg-transparent border-none min-w-[300px]"
                            />
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <Space>
                            <Button
                                type="text"
                                icon={<LogoutOutlined />}
                                onClick={handleLogout}
                                className="text-slate-500 hover:text-red-500 transition-colors"
                                size="large"
                            >
                                Logout
                            </Button>
                        </Space>
                    </div>
                </div>
            </div>
        </header>
    );
}
