import { selectUser } from "../../redux/features/counterSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Card, Typography, Space, Button } from "antd";
import HeaderAntd from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { duongdan } from "../../routes";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  async function fetchOrder() {
    const response = await axios.get(
      "https://66bcb31724da2de7ff6b8d0e.mockapi.io/PhongAuto-Order"
    );
    console.log(response.data);
    const OrderUser = response.data.filter(
      (order) => order.account.id === user.id
    );
    setOrders(OrderUser);
  }

  useEffect(() => {
    fetchOrder();
  }, []);
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderID",
      key: "orderID",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Total Price",
      dataIndex: "totalPriceOrder",
      key: "totalPriceOrder",
      render: (price) => `$${price?.toLocaleString()}`,
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
      render: (text, record) => record?.account?.username,
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (text, record) => (
        <>
          <Link to={`${duongdan.tracking}/${record.orderID}`}>
            <Button>View Detail</Button>
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      <HeaderAntd />
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Typography.Title level={2}>Order History</Typography.Title>
        <Card>
          <Table
            dataSource={orders}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </Space>
      <Footer />
    </>
  );
}
