import { Button, Card, Form, Input, Typography, Space } from "antd";
import { Link, useNavigate } from "react-router";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import type { Auth } from "../types";

const { Title, Text } = Typography;

/**
 * LoginPage component for user authentication.
 * Manages login form state, performs API requests, and handles token storage.
 */
export default function LoginPage() {
  const navigate = useNavigate();

  /**
   * Handles form submission for user login.
   * Stores the returned access token in local storage on success.
   */
  const onFinish = async (values: Auth) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        values
      );
      const { access_token } = response.data;

      localStorage.setItem("token", access_token);
      toast.success("Welcome back to POS Buzz!");
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(
          (error.response?.data?.message as string) || "Login Failed"
        );
    }
  };

  return (
    <section className="min-h-[calc(100vh-70px)] flex items-center justify-center">
      {/* Main Login Form Section */}

      <Card
        variant="borderless"
        className="w-full max-w-md shadow-3xl lg:shadow-none bg-transparent"
      >
        {/* Mobile Header */}
        <div className="mb-10 lg:hidden text-center">
          <Title level={2} className="text-blue-600 font-bold">
            POS Buzz
          </Title>
        </div>

        <div className="mb-10 text-center lg:text-left">
          <Title
            level={1}
            className="m-0 text-3xl font-extrabold text-slate-800"
          >
            Login
          </Title>
          <Text type="secondary" className="text-slate-500 mt-2 block">
            Enterprise management made simple.
          </Text>
        </div>

        {/* Form Configuration */}
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          size="large"
          className="space-y-4"
        >
          <Form.Item
            label={
              <span className="font-semibold text-slate-600">Work Email</span>
            }
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-slate-400 mr-2" />}
              placeholder="name@company.com"
              className="h-12 rounded-xl"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-semibold text-slate-600">Password</span>
            }
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-slate-400 mr-2" />}
              placeholder="••••••••"
              className="h-12 rounded-xl"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            className="h-14 bg-blue-600 hover:bg-blue-700 text-lg font-bold rounded-xl shadow-xl shadow-blue-500/30 border-none transition-all hover:scale-[1.02] active:scale-95 mt-6"
          >
            Sign In
          </Button>

          {/* Navigation to Registration */}
          <div className="text-center mt-8">
            <Space>
              <Text type="secondary">New to POS Buzz?</Text>
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 font-bold decoration-2 underline-offset-4"
              >
                Create an Account
              </Link>
            </Space>
          </div>
        </Form>
      </Card>
    </section>
  );
}
