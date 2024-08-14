import React from "react";
import "./RegisterPage.css";
import HeaderAntd from "../../components/Header/Header";
import { Button, DatePicker, Form, Input, Select } from "antd";
import {
  HomeOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import api from "../../config/api";
import { toast } from "react-toastify";
import moment from "moment";
import Title from "antd/es/typography/Title";
import { duongdan } from "../../routes/";
export default function RegisterPage() {
  const navigate = useNavigate();
  const dateFormat = "DD/MM/YYYY";

  const onFinish = async (values) => {
    values.role = "CUSTOMER";
    console.log(values);
    try {
      const response = await api.post("PhongAuto-Login", values);
      console.log(response.data);
      toast.success("Register Successfully , Please Login");
      navigate(duongdan.login);
    } catch (error) {
      toast.error("Register Failed");
      console.log(error.response.data);
    }
  };

  return (
    <>
      <HeaderAntd />
      <Container className="card-login-form">
        <Form
          name="login_form"
          className="register-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Title level={3} className="title-form">
            Register
          </Title>

          <div className="form-register">
            <div className="form-register-1">
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
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone Number!",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Just Include Number",
                  },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  type="text"
                  placeholder="Phone Number"
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                  {
                    type: "email",
                    message: "Please type in your Email!",
                  },
                  {
                    pattern: /^([a-zA-Z0-9@.])*$/,
                    message: "Do not have Special Characters",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  type="email"
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="address"
                rules={[
                  { required: true, message: "Please input your Address!" },
                ]}
              >
                <Input
                  prefix={<HomeOutlined />}
                  type="text"
                  placeholder="Address"
                />
              </Form.Item>

              <Form.Item
                name="gender"
                rules={[
                  { required: true, message: "Please input your Gender!" },
                ]}
              >
                <Select placeholder="Gender">
                  <Select.Option value="MALE">Male</Select.Option>
                  <Select.Option value="FEMALE">Female</Select.Option>
                  <Select.Option value="OTHER">Other</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="dob"
                rules={[
                  {
                    required: true,
                    message: "Chọn ngày sinh của bạn",
                  },
                  {
                    validator: (_, value) =>
                      value && value.isAfter(moment().endOf("day"))
                        ? Promise.reject(
                            new Error(
                              "Ngày sinh không được là ngày hiện tại hoặc tương lai"
                            )
                          )
                        : Promise.resolve(),
                  },
                ]}
              >
                <DatePicker
                  placeholder="Date Of Birth"
                  style={{ width: "100%" }}
                  format={dateFormat}
                  disabledDate={(current) =>
                    current && current >= moment().endOf("day")
                  }
                />
              </Form.Item>
            </div>

            <div className="form-register-2">
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
                    message: "Your password need to have at least 6 characters",
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
            </div>
          </div>
          <Form.Item className="form-end">
            <Link className="login-form-register" to={duongdan.login}>
              Login
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
              Register
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </>
  );
}
