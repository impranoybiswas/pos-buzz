import { Card, Col, Row, Statistic, Typography } from "antd";
import { ShoppingOutlined, UserOutlined, LineChartOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function HomePage() {
  return (
    <div className="p-4">
      <Title level={2} className="mb-6">Dashboard</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card hoverable>
            <Statistic
              title="Total Products"
              value={0}
              prefix={<ShoppingOutlined className="text-blue-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card hoverable>
            <Statistic
              title="Total Sales"
              value={0}
              prefix={<LineChartOutlined className="text-green-500" />}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card hoverable>
            <Statistic
              title="Active Users"
              value={1}
              prefix={<UserOutlined className="text-purple-500" />}
            />
          </Card>
        </Col>
      </Row>

      <div className="mt-8 text-center text-gray-400">
        <p>Welcome to POS Buzz. Use the navigation to manage your inventory.</p>
      </div>
    </div>
  );
}
