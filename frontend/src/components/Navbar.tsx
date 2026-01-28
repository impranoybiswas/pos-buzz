import { useState } from "react";
import { Menu, Button, Drawer } from "antd";
import { Link, useLocation } from "react-router";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  DollarOutlined,
  LoginOutlined,
} from "@ant-design/icons";

/**
 * Navbar component providing navigation links and user account actions.
 * Supports desktop horizontal layout and mobile drawer-based navigation.
 */
export default function Navbar() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /**
   * Handles user logout by clearing the authentication token and redirecting.
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  /**
   * Configuration for navigation menu items shared between desktop and mobile.
   */
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
      key: "/sales",
      icon: <DollarOutlined />,
      label: <Link to="/sales">Sales</Link>,
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
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600">
                POS Buzz
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <Menu
                mode="horizontal"
                selectedKeys={[location.pathname]}
                items={menuItems}
                className="bg-transparent border-2 min-w-150 w-full"
              />
            </nav>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              type="text"
              style={{ display: token ? "" : "none" }}
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              size="large"
            >
              Logout
            </Button>

            <Link to="/login">
              <Button
                type="text"
                style={{ display: token ? "none" : "" }}
                icon={<LoginOutlined />}
                onClick={handleLogout}
                size="large"
              >
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuOpen(true)}
              size="large"
            />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar (Drawer) */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={() => setMobileMenuOpen(false)}
          className="border-none"
        />
        <div className="p-4 border-t border-slate-100">
          <Button
            danger
            block
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="h-11 rounded-xl"
          >
            Logout
          </Button>
        </div>
      </Drawer>
    </header>
  );
}
