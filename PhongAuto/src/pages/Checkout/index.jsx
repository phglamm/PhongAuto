import "./index.css";
import Footer from "../../components/Footer/Footer";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Card, Form, Input, List } from "antd";
import Title from "antd/es/typography/Title";
import HeaderAntd from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectCartItems } from "../../redux/features/cartSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { selectUser } from "../../redux/features/counterSlice";
import { useForm } from "antd/es/form/Form";
export default function Checkout() {
  const [form] = useForm();
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectUser);
  const handleClickSubmit = () => {
    form.submit();
  };
  const dispatch = useDispatch();

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleSubmit = async (values) => {
    console.log("Order details:", values);

    try {
      values.cartItems = cartItems;
      values.orderStatus = "PENDING";
      // values.orderDate = Date().toLocaleDateString();
      values.username = user.username;
      const response = await axios.post(
        "https://66bcb31724da2de7ff6b8d0e.mockapi.io/PhongAuto-Order",
        values
      );
      console.log(response.data);

      form.resetFields();
      toast.success("Order Placed");
    } catch (error) {
      toast.error("Error Occured When Placing Order");
      console.log(error);
    }
    // dispatch(clearCart());
  };

  return (
    <div>
      <HeaderAntd />
      <Container style={{ marginTop: "5%" }}>
        <Row>
          <Col span={16}>
            <Title level={2}>Checkout</Title>
            <Card title="Payment Information" style={{ marginTop: "20px" }}>
              <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item
                  label="Full Name"
                  name="customerName"
                  rules={[
                    { required: true, message: "Please enter your full name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    { required: true, message: "Please enter your address!" },
                  ]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>

                <Button type="primary" onClick={handleClickSubmit}>
                  Place Order
                </Button>
              </Form>
            </Card>
          </Col>
          <Col md={4}>
            <Card title="Order Summary">
              <List
                itemLayout="horizontal"
                dataSource={cartItems}
                renderItem={(item) => (
                  <List.Item actions={[]}>
                    <List.Item.Meta
                      avatar={
                        <img
                          alt={item.name}
                          src={item.imgURL[0]}
                          style={{ width: 100 }}
                        />
                      }
                      title={item.name}
                      description={`Price: ${
                        item.price.toLocaleString() + " $"
                      }`}
                    />
                  </List.Item>
                )}
              />
              <p>
                Total Items:{" "}
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </p>
              <p>
                Total Price: {calculateTotalPrice().toLocaleString() + " $"}
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
