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
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types";

const { Title } = Typography;

export default function ProductsPage() {
    const { productsQuery, createMutation, updateMutation, deleteMutation } = useProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
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

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values: any) => {
        if (editingProduct) {
            updateMutation.mutate(
                { id: editingProduct.id, data: values },
                {
                    onSuccess: () => setIsModalOpen(false),
                }
            );
        } else {
            createMutation.mutate(values, {
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
        },
        {
            title: "SKU",
            dataIndex: "sku",
            key: "sku",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price: number) => `$${price.toFixed(2)}`,
            sorter: (a: Product, b: Product) => a.price - b.price,
        },
        {
            title: "Stock",
            dataIndex: "stockQuantity",
            key: "stockQuantity",
            sorter: (a: Product, b: Product) => a.stockQuantity - b.stockQuantity,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: Product) => (
                <Space size="middle">
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure you want to delete this product?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-4">
            <Card>
                <div className="flex justify-between items-center mb-6">
                    <Title level={2}>Products</Title>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                        size="large"
                    >
                        Add Product
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={productsQuery.data}
                    loading={productsQuery.isLoading}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </Card>

            <Modal
                title={editingProduct ? "Edit Product" : "Add New Product"}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ price: 0, stockQuantity: 0 }}
                >
                    <Form.Item
                        name="name"
                        label="Product Name"
                        rules={[{ required: true, message: "Please enter product name" }]}
                    >
                        <Input placeholder="Enter product name" />
                    </Form.Item>

                    <Form.Item
                        name="sku"
                        label="SKU"
                        rules={[{ required: true, message: "Please enter SKU" }]}
                    >
                        <Input placeholder="Enter SKU" />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[{ required: true, message: "Please enter price" }]}
                        >
                            <InputNumber
                                className="w-full"
                                min={0}
                                precision={2}
                                prefix="$"
                                placeholder="0.00"
                            />
                        </Form.Item>

                        <Form.Item
                            name="stockQuantity"
                            label="Stock Quantity"
                            rules={[{ required: true, message: "Please enter stock quantity" }]}
                        >
                            <InputNumber
                                className="w-full"
                                min={0}
                                placeholder="0"
                            />
                        </Form.Item>
                    </div>

                    <Form.Item className="mb-0 flex justify-end mt-6">
                        <Space>
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={createMutation.isPending || updateMutation.isPending}
                            >
                                {editingProduct ? "Update" : "Create"}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
