import { Menu } from "antd";
import { Link, useLocation } from "react-router";
import { HomeOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

export default function Navbar() {
    const location = useLocation();

    const items = [
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
        <div className="bg-white shadow-md mb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <span className="text-xl font-bold text-blue-600">POS Buzz</span>
                    </div>
                    <Menu
                        mode="horizontal"
                        selectedKeys={[location.pathname]}
                        items={items}
                        className="flex-grow justify-end border-none"
                    />
                </div>
            </div>
        </div>
    );
}
