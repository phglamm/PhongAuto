import { useParams } from "react-router-dom";
import HeaderAntd from "../../components/Header/Header";
import api from "../../config/api";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReactImageGallery from "react-image-gallery";
import "./Detail.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
import { Button } from "antd";
import { toast } from "react-toastify";
export default function Detail() {
  const [car, setCar] = useState(null);
  const [imageCar, setImageCar] = useState([]);

  const { id } = useParams();
  async function fetchCarDetail() {
    try {
      const response = await api.get(`PhongAuto/${id}`);
      console.log(response.data);
      setCar(response.data);
      setImageCar(response.data.imgURL);
      console.log(response.data.imgURL);
    } catch (error) {
      console.log(error.response.data);
    }
  }
  useEffect(() => {
    fetchCarDetail();
  }, []);

  const images = imageCar.map((url) => ({
    original: url,
    thumbnail: url,
  }));

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    toast.success("Add to cart");
    dispatch(addToCart(product));
  };
  return (
    <>
      <HeaderAntd />
      <Container className="detail-content">
        <Row>
          <Col xs={6}>
            <ReactImageGallery items={images} />
          </Col>
          <Col xs={6} className="detail-content-text">
            <div className="detail-content-text-div">
              <h4 style={{ marginBottom: "5%" }}>{car?.name}</h4>
              <p>Type: {car?.type}</p>
              <p>Color: {car?.color}</p>
              <h5 style={{ color: "red" }}>
                Price: {car?.price?.toLocaleString() + " $"}
              </h5>
              <p>{car?.description}</p>
            </div>
            <div>
              <Button onClick={() => handleAddToCart(car)}>Add to Cart</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
