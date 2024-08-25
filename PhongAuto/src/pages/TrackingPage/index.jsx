import { useEffect, useState } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Descriptions, Divider, List, Popover, Spin, Steps } from "antd";
import HeaderAntd from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";
import moment from "moment";
export default function TrackingPage() {
  const [order, setOrder] = useState();
  const { id } = useParams();

  async function fetchOrderDetail() {
    const response = await axios.get(
      `https://66bcb31724da2de7ff6b8d0e.mockapi.io/PhongAuto-Order/${id}`
    );
    setOrder(response.data);
  }

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  function handleProgress() {
    if (order.orderStatus === "PENDING") {
      return 0;
    } else if (order.orderStatus === "CONFIRMED") {
      return 1;
    } else if (order.orderStatus === "PROCESSING") {
      return 2;
    } else if (order.orderStatus === "SHIPPING") {
      return 3;
    } else if (order.orderStatus === "DELIVERED") {
      return 4;
    }
  }
  const getPopoverContent = (status, index) => {
    switch (index) {
      case 0:
        return <span>Đã đặt hàng</span>;
      case 1:
        return (
          <span>
            {order.confirmDate ? (
              <>
                {" "}
                Ngày Cập Nhật:{" "}
                {moment(order.confirmDate).format("DD-MM-YYYY HH:mm")}
              </>
            ) : (
              <>Not Updated Yet</>
            )}
          </span>
        );
      case 2:
        return (
          <span>
            {order.processingDate ? (
              <>
                {" "}
                Ngày Cập Nhật:{" "}
                {moment(order.processingDate).format("DD-MM-YYYY HH:mm")}
              </>
            ) : (
              <>Not Updated Yet</>
            )}
          </span>
        );
      case 3:
        return (
          <span>
            {order.shippingDate ? (
              <>
                {" "}
                Ngày Cập Nhật:{" "}
                {moment(order.shippingDate).format("DD-MM-YYYY HH:mm")}
              </>
            ) : (
              <>Not Updated Yet</>
            )}
          </span>
        );
      case 4:
        return (
          <span>
            {order.deliveryDate ? (
              <>
                {" "}
                Ngày Cập Nhật:{" "}
                {moment(order.deliveryDate).format("DD-MM-YYYY HH:mm")}
              </>
            ) : (
              <>Not Updated Yet</>
            )}
          </span>
        );
      default:
        return <span>Not Updated Yet</span>;
    }
  };

  const customDot = (dot, { status, index }) => (
    <Popover content={getPopoverContent(status, index)}>{dot}</Popover>
  );

  if (!order) {
    return <Spin size="large" />;
  }

  return (
    <>
      <HeaderAntd />
      <Container style={{ marginTop: "5%" }}>
        <Card title="Order Tracking" bordered={false}>
          <Descriptions bordered layout="vertical" column={3}>
            <Descriptions.Item label="Order ID">
              {order.orderID}
            </Descriptions.Item>
            <Descriptions.Item label="Order Status">
              {order.orderStatus}
            </Descriptions.Item>
            <Descriptions.Item label="Order Date">
              {order.orderDate}
            </Descriptions.Item>
            <Descriptions.Item label="Customer">
              {order.customerName}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">{order.phone}</Descriptions.Item>
            <Descriptions.Item label="Email">{order.email}</Descriptions.Item>

            <Descriptions.Item label="Shipping Address">
              {order.address}
            </Descriptions.Item>
          </Descriptions>
          <Divider orientation="left">Items in Order</Divider>
          <List
            itemLayout="horizontal"
            dataSource={order.cartItems}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <img
                      alt={item.name}
                      src={item.imgURL[0]}
                      style={{ width: 200 }}
                    />
                  }
                  title={item.name}
                  description={`Quantity: ${item.quantity}`}
                />
                <div>${item.price.toLocaleString()}</div>
              </List.Item>
            )}
          />
          <Divider />
          <Descriptions layout="vertical">
            <Descriptions.Item label="Total Price">
              ${order.totalPriceOrder.toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Delivery Date (Estimated time)">
              {order.deliveryDate || "Not yet delivered"}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <Steps
            current={handleProgress()}
            progressDot={customDot}
            items={[
              { title: "Pending", description: "Order Received" },
              {
                title: "Confirmed",
                description: "Order has been confirmed",
              },
              {
                title: "Process",
                description: "Order is being prepared",
              },
              {
                title: "Shipping",
                description: "Order is being shipped",
              },
              {
                title: "Delivered",
                description: "Order has been delivered",
              },
            ]}
          />{" "}
        </Card>

        <Divider />
      </Container>
      <Footer />
    </>
  );
}
