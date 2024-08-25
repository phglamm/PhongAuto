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

import api from "../../../config/api";
import { Bar } from "react-chartjs-2";
import Sidebar from "../../../components/Sidebar";
const Statistics = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [users, setUsers] = useState([]);
  async function fetchUsers() {
    const response = await api.get("PhongAuto-Login");
    console.log(response.data);
    setUsers(response.data);
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  const navigate = useNavigate();
  const chartData = {
    labels: ["Red", "Orange", "Blue"],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Revenue",
        data: [55, 23, 96],
        // you can set indiviual colors for each bar
        backgroundColor: [
          "rgba(219, 18, 18, 0.6)",
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 255, 255, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };
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
            <div className="chart-container">
              <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
              <Bar
                data={chartData}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Revenue from each Month",
                    },
                    legend: {
                      display: true,
                    },
                  },
                }}
              />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center", backgroundColor: "#E3F2EE" }}>
          PhongAuto ©{new Date().getFullYear()} Created by Phong
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Statistics;
