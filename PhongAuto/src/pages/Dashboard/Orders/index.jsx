/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  ProfileOutlined,
  HeartOutlined,
  UserOutlined,
  BarChartOutlined,
  TeamOutlined,
  SettingOutlined,
  SmileOutlined,
  LockOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  Layout,
  Menu,
  Modal,
  Select,
  Table,
  theme,
} from "antd";
import { Footer } from "antd/es/layout/layout";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";

const { Header, Content, Sider } = Layout;

import "./index.css";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import { duongdan } from "../../../routes";
import api from "../../../config/api";
import Sidebar from "../../../components/Sidebar";
import axios from "axios";
const Orders = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const dateformat = "DD-MM-YYYY";
  const [form] = useForm();

  function hanldeClickSubmit() {
    form.submit();
  }

  const [orders, setOrders] = useState([]);
  async function fetchOrderAll() {
    try {
      const response = await axios.get(
        "https://66bcb31724da2de7ff6b8d0e.mockapi.io/PhongAuto-Order"
      );
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }
  useEffect(() => {
    fetchOrderAll();
  }, []);

  const navigate = useNavigate();
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
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <header></header>
        </Header>
        <Content
          style={{ margin: "0 16px", display: "flex", flexDirection: "column" }}
        >
          <Breadcrumb>
            {location.pathname.split("/").map((path, index, array) => (
              <Breadcrumb.Item key={path}>
                {index === 0 ? path : <Link to={`/${path}`}>{path}</Link>}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Outlet style={{ flexGrow: 1 }} />
            <Button type="primary" onClick={showModal} style={{ width: "15%" }}>
              Order ???
            </Button>

            <Modal
              title="Register Accounts"
              open={open}
              onOk={handleOk}
              footer={false}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            ></Modal>

            <Table
              dataSource={orders}
              columns={columns}
              pagination={{ pageSize: 6 }}
              className="table-cars"
              scroll={{ x: "max-content" }}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: "center", backgroundColor: "#E3F2EE" }}>
          PhongAuto ©{new Date().getFullYear()} Created by Phong
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Orders;
