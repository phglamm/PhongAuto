import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import HeaderAntd from "../../components/Header/Header";
import api from "../../config/api";
import { duongdan } from "../../routes";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/counterSlice";
import "./LoginPage.css";
import { Container } from "react-bootstrap";
import Title from "antd/es/typography/Title";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      const response = await api.get("PhongAuto-Login");
      console.log(response.data);
      const user = response.data.find(
        (acc) =>
          values.username === acc.username && values.password === acc.password
      );
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);
      if (user.role === "ADMIN") {
        navigate(duongdan.dashboard);
      } else if (user.role === "CUSTOMER") {
        navigate(duongdan.home);
      } else if (user.role === "MANAGER") {
        navigate(duongdan.home);
      } else if (user.role === "STAFF") {
        navigate(duongdan.home);
      } else if (user.role === "DELIVERY") {
        navigate(duongdan.home);
      }
      toast.success("Login Successfully");
      dispatch(login(user));
    } catch (error) {
      toast.error("Login Failed");
      console.log(error.response.data);
    }
  };

  return (
    <>
      <HeaderAntd />
      <Container className="card-login-form">
        {" "}
        <Form
          name="login_form"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Title level={3} className="title-form">
            Login
          </Title>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              type="text"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item className="form-end">
            <Link className="login-form-register" to={duongdan.register}>
              Register
            </Link>
            <Link className="login-form-forgot" to={duongdan.forgot}>
              Forgot password
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </>
  );
};

export default LoginPage;
