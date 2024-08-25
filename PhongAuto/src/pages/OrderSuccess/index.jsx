import React from "react";
import { Card, Result, Button } from "antd";
import { Link, useParams } from "react-router-dom";
import { duongdan } from "../../routes";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { clearOrder, selectOrder } from "../../redux/features/orderSlice";
export default function OrderSuccess() {
  const { id } = useParams();
  const order = useSelector(selectOrder);
  const dispatch = useDispatch();

  function handleClearOrder() {
    dispatch(clearOrder());
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 400 }}>
        <Result
          status="success"
          title="Order Placed Successfully"
          subTitle={`Thank you for your purchase! Your order number ID is ${order?.orderID}.`}
          extra={[
            <div key="total" className="order-success-button">
              <Link to={duongdan.home}>
                <Button
                  type="primary"
                  key="home"
                  onClick={() => handleClearOrder()}
                >
                  Back to Home
                </Button>
              </Link>
              <Link to={`${duongdan.tracking}/${order.orderID}`} key="order">
                <Button key="orders" onClick={() => handleClearOrder()}>
                  View Order
                </Button>
              </Link>
            </div>,
          ]}
        />
      </Card>
    </div>
  );
}
