import { Layout, Menu } from "antd";
import "./Header.css";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { duongdan } from "../../routes";
import { useDispatch, useSelector } from "react-redux";
import png1 from "../../../public/1-1.png";
import { logout, selectUser } from "../../redux/features/counterSlice";
import { clearOrder } from "../../redux/features/orderSlice";
const { Header } = Layout;

const HeaderAntd = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    dispatch(clearOrder());
  };
  const items = [
    {
      label: <Link to={duongdan.home}>Homepage</Link>,
      key: "home",
      icon: <MailOutlined />,
    },
    {
      label: "Models",
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        {
          type: "group",
          label: "Supercars",
          children: [
            {
              label: "Lamborghini",
              key: "Lamborghini",
            },
            {
              label: "Ferrari",
              key: "Ferrari",
            },
          ],
        },
        {
          type: "group",
          label: "JDM Sport Cars",
          children: [
            {
              label: "Nissan",
              key: "Nissan",
            },
            {
              label: "Subaru",
              key: "Subaru",
            },
          ],
        },
      ],
    },
    {
      key: "Dashboard",
      label: (
        <>
          {user ? (
            <>
              {" "}
              {user.role === "ADMIN" && (
                <>
                  <Link to={duongdan.dashboard}>Dashboard</Link>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      ),
      icon: (
        <>
          {user ? (
            <>
              {" "}
              {user.role === "ADMIN" && (
                <>
                  <SettingOutlined />{" "}
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      ),
    },
    {
      label: (
        <>
          {user ? (
            <>
              <Link to={duongdan.profile}> {user.username} Profile</Link>
            </>
          ) : (
            <></>
          )}
        </>
      ),
      key: "profile",

      icon: (
        <>
          {user ? (
            <>
              <AppstoreOutlined />
            </>
          ) : (
            <></>
          )}
        </>
      ),
    },
    {
      label: (
        <>
          {user ? (
            <>
              <Link to={duongdan.login} onClick={handleLogout}>
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link to={duongdan.login}>Login</Link>
            </>
          )}
        </>
      ),
      key: "Login",
      icon: <SettingOutlined />,
    },
    {
      label: (
        <>
          {!user ? (
            <>
              <Link to={duongdan.register}>Register</Link>
            </>
          ) : (
            <></>
          )}
        </>
      ),
      key: "Signup",
      icon: (
        <>
          {!user ? (
            <>
              <SettingOutlined />
            </>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="header-main">
      {" "}
      <div className="demo-logo">
        <Link to={duongdan.home}>
          {" "}
          <img src={png1} alt="" />
        </Link>
      </div>
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

        {/* <Menu
          className="header-menu-2"
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items2}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        /> */}
      </Header>
    </div>
  );
};
export default HeaderAntd;
