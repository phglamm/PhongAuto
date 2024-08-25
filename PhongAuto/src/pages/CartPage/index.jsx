import { Button, Card, List } from "antd";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
} from "../../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import HeaderAntd from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Col, Container, Row } from "react-bootstrap";
import "./index.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { duongdan } from "../../routes";

export default function CartPage() {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    toast.success("Removed");
    dispatch(removeFromCart({ id: productId }));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity({ id: productId }));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity({ id: productId }));
  };

  const handleClearCart = () => {
    toast.success("Clear Cart");
    dispatch(clearCart());
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const navigate = useNavigate();
  return (
    <div>
      <HeaderAntd />
      <Container style={{ marginTop: "5%" }}>
        <Row>
          <Col md={8}>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <List
                itemLayout="horizontal"
                dataSource={cartItems}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button
                        type="primary"
                        key={`decrease-${item.id}`}
                        onClick={() => handleDecreaseQuantity(item.id)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>,
                      <span key={item.id}>{item.quantity}</span>,
                      <Button
                        type="primary"
                        key={`increase-${item.id}`}
                        onClick={() => handleIncreaseQuantity(item.id)}
                      >
                        +
                      </Button>,
                      <Button
                        type="primary"
                        key={`remove-${item.id}`}
                        danger
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <img
                          alt={item.name}
                          src={item.imgURL[0]}
                          style={{ width: 300 }}
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
            )}
          </Col>
          <Col md={4}>
            <Card title="Summary">
              <p>
                Total Items:{" "}
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </p>
              <p>Total Price: $ {calculateTotalPrice().toLocaleString()}</p>
              <div className="cart-button">
                <Button
                  type="primary"
                  danger
                  onClick={handleClearCart}
                  disabled={cartItems.length === 0}
                >
                  Clear Cart
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    navigate(duongdan.checkout);
                  }}
                  disabled={cartItems.length === 0}
                >
                  Check Out
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
