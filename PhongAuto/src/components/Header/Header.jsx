import { Layout, Menu, theme } from "antd";
import "./Header.css";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { duongdan } from "../../routes";
import { toast } from "react-toastify";
const { Header } = Layout;
const items = [
  {
    label: <Link to={duongdan.home}>Homepage</Link>,
    key: "home",
    icon: <MailOutlined />,
  },
  {
    label: <Link to={duongdan.profile}>Profile</Link>,
    key: "profile",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Navigation Three - Submenu",
    key: "SubMenu",
    icon: <SettingOutlined />,
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          {
            label: "Option 1",
            key: "setting:1",
          },
          {
            label: "Option 2",
            key: "setting:2",
          },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          {
            label: "Option 3",
            key: "setting:3",
          },
          {
            label: "Option 4",
            key: "setting:4",
          },
        ],
      },
    ],
  },
  {
    key: "Dashboard",
    label: <Link to={duongdan.dashboard}>Dashboard</Link>,
    icon: <SettingOutlined />,
  },
];

const items2 = [
  {
    label: <Link to={duongdan.profile}>Profile</Link>,
    key: "profile",
    icon: <AppstoreOutlined />,
  },
  {
    label: <Link to={duongdan.login}>Login</Link>,
    key: "Login",
    icon: <SettingOutlined />,
  },
  {
    label: <Link to={duongdan.login}>Sign Up</Link>,
    key: "Signup",
    icon: <SettingOutlined />,
  },
];

const HeaderAntd = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Header
      className="header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="demo-logo"></div>
      <Menu
        className="header-menu"
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items}
        style={{
          flex: 1,
          minWidth: 0,
        }}
      />

      <Menu
        className="header-menu-2"
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items2}
        style={{
          flex: 1,
          minWidth: 0,
        }}
      />
    </Header>
  );
};
export default HeaderAntd;
