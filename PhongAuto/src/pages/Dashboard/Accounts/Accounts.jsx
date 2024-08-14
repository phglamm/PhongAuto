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

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
import "./Accounts.css";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import { duongdan } from "../../../routes";
import api from "../../../config/api";
const Accounts = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [items, setItems] = useState([]);
  const [key, setKey] = useState();
  const location = useLocation();
  const currentURI =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const role = "admin";

  const dataOpen = JSON.parse(localStorage.getItem("keys")) ?? [];

  const [openKeys, setOpenKeys] = useState(dataOpen);

  useEffect(() => {
    if (role === "admin") {
      setItems([
        getItem("Type", "type", <SettingOutlined />),
        getItem("Profile", "profile", <ProfileOutlined />),
        getItem("Manage Cars", "dashboard", <HeartOutlined />),
        getItem("Manage Accounts", "dashboard/accounts", <TeamOutlined />),
        getItem("Statistics", "statistics", <BarChartOutlined />, [
          getItem("Club 1", "stats-club-1"),
          getItem("Club 2", "stats-club-2"),
          getItem("Club 3", "stats-club-3"),
          getItem("All Clubs", "all-clubs"),
        ]),
        getItem("Quay Về", "", <BarChartOutlined />),
      ]);
    }
  }, []);

  const handleSubMenuOpen = (keyMenuItem) => {
    setOpenKeys(keyMenuItem);
  };
  const handleSelectKey = (keyPath) => {
    setKey(keyPath);
  };

  useEffect(() => {
    localStorage.setItem("keys", JSON.stringify(openKeys));
  }, [openKeys]);

  useEffect(() => {
    handleSubMenuOpen([...openKeys, key]);
  }, [currentURI]);

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
  const [formUpdate] = useForm();

  function hanldeClickSubmit() {
    form.submit();
  }
  function hanldeClickSubmitUpdate() {
    formUpdate.submit();
  }
  const [users, setUsers] = useState([]);
  async function fetchUsers() {
    try {
      const response = await api.get("PhongAuto-Login");
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  async function registerAccount(values) {
    console.log(values);
    values.phone = "none";
    values.address = "none";
    values.gender = "none";
    values.email = "none";
    values.dob = "none";
    values.avatarURL = "none";
    values.backgroundURL = "none";

    try {
      const response = await api.post("PhongAuto-Login", values);
      console.log(response.data);
      toast.success("Register Successfully");
      setOpen(false);
      form.resetFields();
      fetchUsers();
    } catch (error) {
      toast.error("Register Failed");
      console.log(error.response.data);
    }
  }

  async function deleteAccount(values) {
    console.log(values);
    try {
      Modal.confirm({
        title: "Are you sure you want to delete this user ?",
        onOk: async () => {
          const response = await api.delete(`PhongAuto-Login/${values.id}`);
          console.log(response);
          toast.success("Delete Succesfully");
          setUsers(
            users.filter((user) => {
              return user.id !== values.id;
            })
          );
        },
      });
      fetchUsers();
    } catch (error) {
      toast.error("Register Failed");
      console.log(error.response.data);
    }
  }
  const navigate = useNavigate();
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Avatar",
      dataIndex: "avatarURL",
      key: "avatarURL",
      render: (value) => (
        <Image
          src={value}
          alt="value"
          style={{ width: 200, height: " 120px" }}
        />
      ),
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      fixed: "left",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      render: (values) => {
        return (
          <>
            <div className="action-button">
              <Button
                onClick={(e) => {
                  deleteAccount(values);
                }}
                className="delete-button"
              >
                Delete
              </Button>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["profile"]}
          mode="inline"
          selectedKeys={currentURI}
          openKeys={openKeys}
          onOpenChange={handleSubMenuOpen}
        >
          {items.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((subItem) => (
                  <Menu.Item
                    key={subItem.key}
                    onClick={(e) => handleSelectKey(e.keyPath[1])}
                  >
                    <Link to={`/dashboard/${subItem.key}`}>
                      {subItem.label}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={`/${item.key}`}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>

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
              Add User Account
            </Button>

            <Modal
              title="Register Accounts"
              open={open}
              onOk={handleOk}
              footer={false}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <Form
                form={form}
                onFinish={registerAccount}
                id="form"
                className="form-main"
              >
                <Form.Item
                  name="fullname"
                  rules={[
                    { required: true, message: "Please input your Fullname!" },
                    {
                      pattern: /^[a-zA-ZÀ-ỹẠ-ỹ\s]*$/,
                      message:
                        "Your Full Name won't have number and special characters",
                    },
                  ]}
                >
                  <Input
                    required
                    prefix={<SmileOutlined />}
                    type="text"
                    placeholder="Full Name"
                  />
                </Form.Item>

                <Form.Item
                  className="label-form"
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Choose role",
                    },
                  ]}
                >
                  <Select className="select-input" placeholder="Choose Role">
                    <Select.Option value="ADMIN">Admin</Select.Option>
                    <Select.Option value="STAFF">Staff</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "Please input your Username!" },
                    { type: "text", message: "Type in your username" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Username"
                    type="text"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                    {
                      pattern: /^([a-zA-Z0-9])*$/,
                      message: "Your password won't have special characters",
                    },
                    {
                      min: 6,
                      message:
                        "Your password need to have at least 6 characters",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item
                  dependencies={["password"]}
                  required
                  name="confirm"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Confirm your Password",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Your password is not correct")
                        );
                      },
                    }),
                  ]}
                >
                  <Input
                    prefix={<LockOutlined />}
                    type="password"
                    required
                    placeholder="Confirm password"
                  />
                </Form.Item>

                <Button onClick={() => hanldeClickSubmit()}>
                  {" "}
                  Register User
                </Button>
              </Form>
            </Modal>

            <Table
              dataSource={users}
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

export default Accounts;
