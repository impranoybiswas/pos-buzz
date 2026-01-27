import { Button, Card, Form, Input, message, Typography } from "antd";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import type { RegisterData } from "../types";

const { Title, Text } = Typography;

export default function RegisterPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values: RegisterData) => {
    try {
      await axios.post("http://localhost:3000/auth/register", {
        email: values.email,
        password: values.password,
      });

      messageApi.success({
        content: "Registration Successful! Please login.",
        duration: 3,
      });

      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      messageApi.error({
        content: error.response?.data?.message || "Registration Failed",
        duration: 3,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      {contextHolder}
      <Card className="w-full max-w-md shadow-lg border-none">
        <div className="text-center mb-8">
          <Title level={2} className="m-0 text-blue-600">POS Buzz</Title>
          <Text type="secondary">Create your account to get started.</Text>
        </div>

        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          size="large"
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please input your full name!" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password placeholder="Create a password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block className="bg-blue-600 hover:bg-blue-700">
              Register
            </Button>
          </Form.Item>

          <div className="text-center">
            <Text type="secondary">
              Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
}
