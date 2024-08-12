import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import HeaderAntd from "@/components/Header/Header";
import api from "@/config/api";
import { duongdan } from "@/routes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "@/redux/features/counterSlice";

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
      } else if (user.role === "SALES") {
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
      <HeaderAntd></HeaderAntd>
      <Form
        name="login_form"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
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

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="#">
            Forgot password
          </a>
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
    </>
  );
};

export default LoginPage;
