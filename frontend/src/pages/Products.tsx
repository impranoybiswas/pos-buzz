import { useState } from "react";
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    InputNumber,
    Space,
    Typography,
    Popconfirm,
    Card,
    Tag,
    Tooltip as AntTooltip,
} from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    ReloadOutlined
} from "@ant-design/icons";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types";

const { Title, Text } = Typography;

export default function ProductsPage() {
    const { productsQuery, createMutation, updateMutation, deleteMutation } = useProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchText, setSearchText] = useState("");
    const [form] = Form.useForm();

    const handleAdd = () => {
        setEditingProduct(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        form.setFieldsValue(product);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        deleteMutation.mutate(id);
    };

    const onFinish = (values: Product) => {
        if (editingProduct) {
            updateMutation.mutate(
                { id: editingProduct.id, data: values },
                { onSuccess: () => setIsModalOpen(false) }
            );
        } else {
            createMutation.mutate(values, { onSuccess: () => setIsModalOpen(false) });
        }
    };

    const filteredData = productsQuery.data?.filter(p =>
        p.name.toLowerCase().includes(searchText.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: "PRODUCT",
            key: "product",
            render: (_: unknown, record: Product) => (
                <div className="flex flex-col">
                    <Text strong className="text-slate-700">{record.name}</Text>
                    <Text type="secondary" className="text-xs uppercase tracking-wider">{record.sku}</Text>
                </div>
            ),
        },
        {
            title: "PRICE",
            dataIndex: "price",
            key: "price",
            render: (price: number) => (
                <Text className="font-semibold text-slate-800">${price.toFixed(2)}</Text>
            ),
            sorter: (a: Product, b: Product) => a.price - b.price,
        },
        {
            title: "STOCK",
            dataIndex: "stockQuantity",
            key: "stockQuantity",
            render: (stock: number) => (
                <Tag color={stock < 10 ? "red" : stock < 50 ? "orange" : "blue"} className="rounded-full px-3">
                    {stock} units
                </Tag>
            ),
            sorter: (a: Product, b: Product) => a.stock_quantity - b.stock_quantity,
        },
        {
            title: "ACTIONS",
            key: "actions",
            align: "right" as const,
            render: (_: unknown, record: Product) => (
                <Space size="small">
                    <AntTooltip title="Edit Product">
                        <Button
                            type="text"
                            icon={<EditOutlined className="text-blue-500" />}
                            onClick={() => handleEdit(record)}
                            className="hover:bg-blue-50"
                        />
                    </AntTooltip>
                    <Popconfirm
                        title="Remove product"
                        description="Are you sure you want to delete this product?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ danger: true }}
                    >
                        <AntTooltip title="Delete Product">
                            <Button type="text" danger icon={<DeleteOutlined />} className="hover:bg-red-50" />
                        </AntTooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="py-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Title level={2} className="m-0">Product Inventory</Title>
                    <Text type="secondary">Manage your stock, SKUs, and pricing in one place.</Text>
                </div>
                <div className="flex items-center gap-3">
                    <Button icon={<ReloadOutlined />} onClick={() => productsQuery.refetch()} />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                        size="large"
                        className="h-11 px-6 font-medium"
                    >
                        New Product
                    </Button>
                </div>
            </div>

            <Card bordered={false} className="shadow-sm">
                <div className="mb-6 max-w-md">
                    <Input
                        placeholder="Search by name or SKU..."
                        prefix={<SearchOutlined className="text-slate-400" />}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="h-11 rounded-xl"
                        allowClear
                    />
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    loading={productsQuery.isLoading}
                    rowKey="id"
                    pagination={{
                        pageSize: 8,
                        showTotal: (total) => `Total ${total} products`,
                        className: "pt-4"
                    }}
                    className="border-none"
                />
            </Card>

            <Modal
                title={
                    <div className="pb-4 border-b">
                        <Title level={4} className="m-0">{editingProduct ? "Edit Product" : "Add New Product"}</Title>
                        <Text type="secondary" className="text-xs">Fill in the details below to {editingProduct ? "update" : "create"} the product.</Text>
                    </div>
                }
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                destroyOnClose
                className="rounded-2xl"
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ price: 0, stockQuantity: 0 }}
                    className="pt-6"
                    requiredMark={false}
                >
                    <Form.Item
                        name="name"
                        label={<Text className="font-medium text-slate-600">Product Name</Text>}
                        rules={[{ required: true, message: "Please enter product name" }]}
                    >
                        <Input placeholder="e.g. Wireless Headset" className="h-10" />
                    </Form.Item>

                    <Form.Item
                        name="sku"
                        label={<Text className="font-medium text-slate-600">SKU / Identifier</Text>}
                        rules={[{ required: true, message: "Please enter SKU" }]}
                    >
                        <Input placeholder="e.g. HEAD-001" className="h-10 Uppercase" />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            name="price"
                            label={<Text className="font-medium text-slate-600">Unit Price</Text>}
                            rules={[{ required: true, message: "Please enter price" }]}
                        >
                            <InputNumber
                                className="w-full h-10 flex items-center"
                                min={0}
                                precision={2}
                                prefix="$"
                                placeholder="0.00"
                            />
                        </Form.Item>

                        <Form.Item
                            name="stockQuantity"
                            label={<Text className="font-medium text-slate-600">Initial Stock</Text>}
                            rules={[{ required: true, message: "Please enter stock quantity" }]}
                        >
                            <InputNumber
                                className="w-full h-10 flex items-center"
                                min={0}
                                placeholder="0"
                            />
                        </Form.Item>
                    </div>

                    <div className="flex justify-end gap-3 mt-8">
                        <Button onClick={() => setIsModalOpen(false)} className="h-11 px-6">Cancel</Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={createMutation.isPending || updateMutation.isPending}
                            className="h-11 px-8 font-medium"
                        >
                            {editingProduct ? "Save Changes" : "Create Product"}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
