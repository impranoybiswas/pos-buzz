import { Button, Card, Form, Input, message, Typography } from "antd";
import { Link, useNavigate } from "react-router";
import axios from "axios";

import type { Auth } from "../types";

const { Title, Text } = Typography;

export default function LoginPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values: Auth) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", values);
      const { access_token } = response.data;

      localStorage.setItem("token", access_token);

      messageApi.success({
        content: "Login Successful!",
        duration: 2,
      });

      setTimeout(() => navigate("/"), 1500);
    } catch (error: any) {
      messageApi.error({
        content: error.response?.data?.message || "Login Failed",
        duration: 3,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      {contextHolder}
      <Card className="w-full max-w-md shadow-lg border-none">
        <div className="text-center mb-8">
          <Title level={2} className="m-0 text-blue-600 font-bold">POS Buzz</Title>
          <Text type="secondary" className="text-gray-500">Welcome back! Please login to your account.</Text>
        </div>

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          size="large"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" className="rounded-md" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" className="rounded-md" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block className="bg-blue-600 hover:bg-blue-700 h-12 text-lg rounded-md border-none">
              Log in
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            <Text type="secondary">
              Don't have an account? <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium ml-1">Register</Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
}
