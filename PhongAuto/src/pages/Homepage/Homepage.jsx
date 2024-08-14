import { useEffect, useState } from "react";
import HeaderAntd from "../../components/Header/Header";
import { Button, Carousel, Row } from "antd";
import { Col, Container } from "react-bootstrap";
import api from "../../config/api";
import "./Homepage.css";
import { Link } from "react-router-dom";
import { duongdan } from "../../routes";
import { LeftOutlined, PhoneOutlined, RightOutlined } from "@ant-design/icons";

export default function Homepage() {
  const [cars, setCars] = useState([]);
  const [homeCars, setHomeCars] = useState([]);
  const [carsCurrentPage, setCarsCurrentPage] = useState(1);

  const CarPerPage = 1;

  async function fetchCars() {
    try {
      const response = await api.get("PhongAuto");
      console.log(response.data);
      setCars(response.data);
      setHomeCars(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);

  const handleCarsPageChange = (newPage) => {
    setCarsCurrentPage(newPage);
  };

  const carsToDisplay = homeCars.slice(
    (carsCurrentPage - 1) * CarPerPage,
    carsCurrentPage * CarPerPage
  );

  return (
    <>
      <HeaderAntd />
      <Container fluid>
        <div className="beforecarousel">
          <Carousel
            autoplay
            autoplaySpeed={3000}
            effect="fade"
            dotPosition="bottom"
            className="carousel"
          >
            <div className="banner-slide">
              <img
                src="https://www.supercars.net/blog/wp-content/uploads/2020/09/wallpaperflare.com_wallpaper-1-1.jpg"
                className="banner-img"
                alt="car-slide-1"
              />
            </div>
            <div className="banner-slide">
              <img
                src="https://wallpapercave.com/wp/wp5163722.jpg"
                className="banner-img"
                alt="car-slide-2"
              />
            </div>
            <div className="banner-slide">
              <img
                src="https://wallpapers-clan.com/wp-content/uploads/2023/11/red-ferrari-supercar-desktop-wallpaper-preview.jpg"
                className="banner-img"
                alt="car-slide-3"
              />
            </div>
            <div className="banner-slide">
              <img
                src="https://wallpaper.forfun.com/fetch/b9/b93750657d904ed9fcc95dab61e7f3dd.jpeg"
                className="banner-img"
                alt="car-slide-4"
              />
            </div>
          </Carousel>
        </div>
        <div className="contact-bar">
          <div className="contact-bar-compo">
            <PhoneOutlined style={{ color: "white", marginRight: "20px" }} />
            <a href="tel:+84586998792">+84 586998792</a>
          </div>
          <div className="contact-bar-compo">
            <PhoneOutlined style={{ color: "white", marginRight: "20px" }} />
            <a
              href="https://maps.app.goo.gl/7VEqGuoofrA1twfD6"
              target="_blank"
              rel="noopener noreferrer"
            >
              Showroom
            </a>
          </div>
        </div>
      </Container>
      <Container>
        <h5 className="home-car">Take A Look</h5>

        {homeCars.length !== 0 ? (
          <div className="cars-container">
            <Button
              icon={<LeftOutlined />}
              disabled={carsCurrentPage === 1}
              onClick={() => handleCarsPageChange(carsCurrentPage - 1)}
              className="cars-pagination-button left"
            />
            <Row className="cars-row">
              {carsToDisplay.map((car) => (
                <Col key={car.id} className="cars-item" xs={12}>
                  <Link to={`${duongdan.detail}/${car.id}`} key={car.id}>
                    {/* <Card
                      key={car.id}
                      hoverable
                      style={{ width: 350, height: "450px" }}
                      cover={<img alt="car-image" src={car?.imgURL[0]} />}
                    >
                      <Meta
                        className="card-content"
                        title={car.name}
                        description={car.description}
                      />
                      cars-row
                    </Card> */}

                    <Carousel
                      effect="scrollx"
                      dotPosition="bottom"
                      className="carousel-for-cars"
                    >
                      {car.imgURL.map((url, index) => (
                        <div key={index} className="carousel-item">
                          <img
                            src={url}
                            alt={`car-image-${index}`}
                            className="img-for-cars"
                          />
                          <div className="carousel-text font-official">
                            <h4>{car.name}</h4>
                            <h5>Price: {car.price.toLocaleString() + " $"}</h5>
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  </Link>
                </Col>
              ))}
            </Row>
            <Button
              icon={<RightOutlined />}
              disabled={
                carsCurrentPage === Math.ceil(homeCars.length / CarPerPage)
              }
              onClick={() => handleCarsPageChange(carsCurrentPage + 1)}
              className="cars-pagination-button right"
            />
          </div>
        ) : (
          <p style={{ fontWeight: "bold" }}>No products available.</p>
        )}
      </Container>
    </>
  );
}
