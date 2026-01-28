import { useState } from "react";
import {
    Card,
    Table,
    Button,
    Modal,
    Form,
    Select,
    InputNumber,
    Typography,
    Tag,
    Space,
    Statistic,
    Row,
    Col,
} from "antd";
import {
    PlusOutlined,
    ShoppingCartOutlined,
    DollarOutlined,
} from "@ant-design/icons";
import { useSales } from "../hooks/useSales";
import { useProducts } from "../hooks/useProducts";
import type { SalePayload } from "../types";
import dayjs from "dayjs";

const { Title, Text } = Typography;

/**
 * Sales page for creating and viewing sales transactions.
 * Includes stock validation and automatic deduction.
 */
export default function SalesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const { salesQuery, createMutation } = useSales();
    const { productsQuery } = useProducts();

    const sales = salesQuery.data || [];
    const products = productsQuery.data || [];

    /**
     * Handle form submission for creating a new sale.
     */
    const handleCreateSale = (values: SalePayload) => {
        createMutation.mutate(values, {
            onSuccess: () => {
                setIsModalOpen(false);
                form.resetFields();
            },
        });
    };

    /**
     * Calculate total sales statistics.
     */
    const totalSales = sales.length;
    const totalRevenue = sales.reduce((acc, sale) => {
        const product = sale.product;
        return acc + (product ? product.price * sale.quantity : 0);
    }, 0);
    const totalItemsSold = sales.reduce((acc, sale) => acc + sale.quantity, 0);

    const columns = [
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date: string) => dayjs(date).format("MMM DD, YYYY HH:mm"),
            width: 180,
        },
        {
            title: "Product",
            dataIndex: ["product", "name"],
            key: "product",
            render: (_: any, record: any) => (
                <Space direction="vertical" size={0}>
                    <Text strong>{record.product?.name || "N/A"}</Text>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                        SKU: {record.product?.sku || "N/A"}
                    </Text>
                </Space>
            ),
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            render: (quantity: number) => (
                <Tag color="blue" style={{ fontSize: "14px" }}>
                    {quantity} units
                </Tag>
            ),
            width: 120,
        },
        {
            title: "Unit Price",
            dataIndex: ["product", "price"],
            key: "price",
            render: (price: number) => `$${price?.toFixed(2) || "0.00"}`,
            width: 120,
        },
        {
            title: "Total",
            key: "total",
            render: (_: any, record: any) => {
                const total = (record.product?.price || 0) * record.quantity;
                return (
                    <Text strong style={{ fontSize: "16px", color: "#52c41a" }}>
                        ${total.toFixed(2)}
                    </Text>
                );
            },
            width: 120,
        },
    ];

    return (
        <div className="py-8 space-y-8">
            {/* Page Header */}
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <Title level={2} className="m-0">
                        Sales Management
                    </Title>
                    <Text type="secondary">
                        Create sales transactions and track your revenue.
                    </Text>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={() => setIsModalOpen(true)}
                    className="h-10"
                >
                    New Sale
                </Button>
            </div>

            {/* Statistics Row */}
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={8}>
                    <Card bordered={false} className="shadow-sm">
                        <Statistic
                            title={<span className="text-slate-500 font-medium">Total Sales</span>}
                            value={totalSales}
                            prefix={
                                <div className="p-2 bg-blue-50 rounded-lg mr-2">
                                    <ShoppingCartOutlined className="text-blue-600" />
                                </div>
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card bordered={false} className="shadow-sm">
                        <Statistic
                            title={<span className="text-slate-500 font-medium">Items Sold</span>}
                            value={totalItemsSold}
                            prefix={
                                <div className="p-2 bg-indigo-50 rounded-lg mr-2">
                                    <ShoppingCartOutlined className="text-indigo-600" />
                                </div>
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card bordered={false} className="shadow-sm">
                        <Statistic
                            title={<span className="text-slate-500 font-medium">Total Revenue</span>}
                            value={totalRevenue}
                            precision={2}
                            prefix={
                                <div className="p-2 bg-emerald-50 rounded-lg mr-2">
                                    <DollarOutlined className="text-emerald-600" />
                                </div>
                            }
                        />
                    </Card>
                </Col>
            </Row>

            {/* Sales Table */}
            <Card
                title="Sales History"
                bordered={false}
                className="shadow-sm"
            >
                <Table
                    columns={columns}
                    dataSource={sales}
                    rowKey="id"
                    loading={salesQuery.isLoading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} sales`,
                    }}
                />
            </Card>

            {/* Create Sale Modal */}
            <Modal
                title="Create New Sale"
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    form.resetFields();
                }}
                footer={null}
                width={500}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleCreateSale}
                    className="mt-6"
                >
                    <Form.Item
                        label="Product"
                        name="productId"
                        rules={[{ required: true, message: "Please select a product" }]}
                    >
                        <Select
                            placeholder="Select a product"
                            size="large"
                            showSearch
                            optionFilterProp="children"
                            loading={productsQuery.isLoading}
                        >
                            {products.map((product) => (
                                <Select.Option key={product.id} value={product.id}>
                                    <Space direction="vertical" size={0}>
                                        <Text strong>{product.name}</Text>
                                        <Text type="secondary" style={{ fontSize: "12px" }}>
                                            SKU: {product.sku} | Stock: {product.stockQuantity} | Price: $
                                            {product.price.toFixed(2)}
                                        </Text>
                                    </Space>
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[
                            { required: true, message: "Please enter quantity" },
                            { type: "number", min: 1, message: "Quantity must be at least 1" },
                        ]}
                    >
                        <InputNumber
                            placeholder="Enter quantity"
                            size="large"
                            style={{ width: "100%" }}
                            min={1}
                        />
                    </Form.Item>

                    <Form.Item className="mb-0">
                        <Space className="w-full justify-end">
                            <Button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    form.resetFields();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={createMutation.isPending}
                            >
                                Create Sale
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
