import { Card, Col, Row, Statistic, Typography } from "antd";
import {
  ShoppingOutlined,
  UserOutlined,
  LineChartOutlined,
  RiseOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useProducts } from "../hooks/useProducts";

const { Title, Text } = Typography;

/**
 * Mock data for sales and inventory charts.
 * In a production env, this would be fetched from the backend.
 */
const data = [
  { name: "Mon", sales: 4000, stock: 2400 },
  { name: "Tue", sales: 3000, stock: 1398 },
  { name: "Wed", sales: 2000, stock: 9800 },
  { name: "Thu", sales: 2780, stock: 3908 },
  { name: "Fri", sales: 1890, stock: 4800 },
  { name: "Sat", sales: 2390, stock: 3800 },
  { name: "Sun", sales: 3490, stock: 4300 },
];

/**
 * Dashboard Home page providing a high-level overview of business metrics.
 * Displays key statistics and performance charts using recharts and Ant Design.
 */
export default function HomePage() {
  const { productsQuery } = useProducts();
  const totalProducts = productsQuery.data?.length || 0;
  const totalStock =
    productsQuery.data?.reduce((acc, p) => acc + p.stockQuantity, 0) || 0;

  return (
    <div className="py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <Title level={2} className="m-0">
          Business Intelligence
        </Title>
        <Text type="secondary">
          Real-time overview of your store performance and inventory.
        </Text>
      </div>

      {/* Statistical Summary Row */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            variant="borderless"
            className="shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Statistic
              title={
                <span className="text-slate-500 font-medium">
                  Total Products
                </span>
              }
              value={totalProducts}
              prefix={
                <div className="p-2 bg-blue-50 rounded-lg mr-2">
                  <ShoppingOutlined className="text-blue-600" />
                </div>
              }
            />
            <div className="mt-4 flex items-center text-green-500 text-sm font-medium">
              <ArrowUpOutlined /> <span>12% from last month</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            variant="borderless"
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <Statistic
              title={
                <span className="text-slate-500 font-medium">
                  In-Stock Units
                </span>
              }
              value={totalStock}
              prefix={
                <div className="p-2 bg-indigo-50 rounded-lg mr-2">
                  <RiseOutlined className="text-indigo-600" />
                </div>
              }
            />
            <div className="mt-4 flex items-center text-slate-400 text-sm">
              Current inventory levels
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            variant="borderless"
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <Statistic
              title={
                <span className="text-slate-500 font-medium">
                  Gross Revenue
                </span>
              }
              value={totalProducts * 1250.5} // Simulated revenue based on inventory
              prefix={
                <div className="p-2 bg-emerald-50 rounded-lg mr-2">
                  <LineChartOutlined className="text-emerald-600" />
                </div>
              }
              precision={2}
            />
            <div className="mt-4 flex items-center text-green-500 text-sm font-medium">
              <ArrowUpOutlined /> <span>8.2% vs yesterday</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            variant="borderless"
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <Statistic
              title={
                <span className="text-slate-500 font-medium">
                  Staff Members
                </span>
              }
              value={4}
              prefix={
                <div className="p-2 bg-rose-50 rounded-lg mr-2">
                  <UserOutlined className="text-rose-600" />
                </div>
              }
            />
            <div className="mt-4 flex items-center text-slate-400 text-sm uppercase tracking-wider">
              Management
            </div>
          </Card>
        </Col>
      </Row>

      {/* Analytics Row */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card
            title="Sales Analytics"
            variant="borderless"
            className="shadow-sm h-112.5"
          >
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#2563eb"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title="Inventory Distribution"
            variant="borderless"
            className="shadow-sm h-112.5"
          >
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="stock"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
