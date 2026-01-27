import { Button, Card, Form, Input, Typography, Space } from "antd";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import {
  ShoppingCartOutlined,
  MailOutlined,
  LockOutlined,
  UserOutlined
} from "@ant-design/icons";

import type { RegisterData } from "../types";

const { Title, Text } = Typography;

export default function RegisterPage() {
  const navigate = useNavigate();

  const onFinish = async (values: RegisterData) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, values);
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Left Decoration */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-blue-600 p-12 text-white relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-700" />

        <div className="relative z-10 text-center space-y-6 max-w-md">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
            <ShoppingCartOutlined className="text-4xl" />
          </div>
          <Title className="!text-white !m-0 !text-5xl font-bold">POS Buzz</Title>
          <Text className="text-blue-100 text-lg block">
            Join thousands of businesses managing their point of sale with POS Buzz.
          </Text>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center p-8 bg-slate-50 lg:bg-white">
        <Card bordered={false} className="w-full max-w-md shadow-2xl lg:shadow-none bg-transparent">
          <div className="mb-10 text-center lg:text-left">
            <Title level={1} className="m-0 !text-3xl font-extrabold text-slate-800">Create Account</Title>
            <Text type="secondary" className="text-slate-500 mt-2 block">Start your 14-day free trial today.</Text>
          </div>

          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            size="large"
            className="space-y-3"
          >
            <Form.Item
              label={<span className="font-semibold text-slate-600">Full Name</span>}
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input
                prefix={<UserOutlined className="text-slate-400 mr-2" />}
                placeholder="John Doe"
                className="h-12 rounded-xl"
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold text-slate-600">Work Email</span>}
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
              label={<span className="font-semibold text-slate-600">Password</span>}
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-slate-400 mr-2" />}
                placeholder="Min. 8 characters"
                className="h-12 rounded-xl"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              className="h-14 bg-blue-600 hover:bg-blue-700 text-lg font-bold rounded-xl shadow-xl shadow-blue-500/30 border-none transition-all hover:scale-[1.02] active:scale-95 mt-6"
            >
              Register Now
            </Button>

            <div className="text-center mt-8">
              <Space>
                <Text type="secondary">Already have an account?</Text>
                <Link to="/login" className="text-blue-600 hover:text-blue-800 font-bold decoration-2 underline-offset-4">
                  Log in
                </Link>
              </Space>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}
