import React, { useEffect, useState } from "react";
import HeaderAntd from "../../components/Header/Header";
import { Card, Carousel, Image, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { Col, Container } from "react-bootstrap";
import api from "../../config/api";
import "./Homepage.css";
import { Link } from "react-router-dom";
import { duongdan } from "../../routes";
import ReactImageGallery from "react-image-gallery";

export default function Homepage() {
  const [cars, setCars] = useState([]);
  async function fetchCars() {
    try {
      const response = await api.get("PhongAuto");
      console.log(response.data);
      setCars(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);

  const images = [
    {
      original:
        "https://www.supercars.net/blog/wp-content/uploads/2020/09/wallpaperflare.com_wallpaper-1-1.jpg",
      thumbnail:
        "https://www.supercars.net/blog/wp-content/uploads/2020/09/wallpaperflare.com_wallpaper-1-1.jpg",
    },
    {
      original: "https://wallpapercave.com/wp/wp5163722.jpg",
      thumbnail: "https://wallpapercave.com/wp/wp5163722.jpg",
    },
    {
      original:
        "https://wallpapers-clan.com/wp-content/uploads/2023/11/red-ferrari-supercar-desktop-wallpaper-preview.jpg",
      thumbnail:
        "https://wallpapers-clan.com/wp-content/uploads/2023/11/red-ferrari-supercar-desktop-wallpaper-preview.jpg",
    },
    {
      original:
        "https://wallpaper.forfun.com/fetch/b9/b93750657d904ed9fcc95dab61e7f3dd.jpeg",
      thumbnail:
        "https://wallpaper.forfun.com/fetch/b9/b93750657d904ed9fcc95dab61e7f3dd.jpeg",
    },
  ];
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <>
      <HeaderAntd />
      <Container fluid>
        <div className="beforecarousel">
          <Carousel autoplay className="carousel" effect="fade">
            <div className="banner-slide ">
              <img
                src="https://www.supercars.net/blog/wp-content/uploads/2020/09/wallpaperflare.com_wallpaper-1-1.jpg"
                className="banner-img"
              ></img>
            </div>
            <div className="banner-slide">
              <img
                src="https://wallpapercave.com/wp/wp5163722.jpg"
                className="banner-img"
              ></img>
            </div>
            <div className="banner-slide">
              <img
                src="https://wallpapers-clan.com/wp-content/uploads/2023/11/red-ferrari-supercar-desktop-wallpaper-preview.jpg"
                className="banner-img"
              ></img>
            </div>
            <div className="banner-slide">
              <img
                src="https://wallpaper.forfun.com/fetch/b9/b93750657d904ed9fcc95dab61e7f3dd.jpeg"
                className="banner-img"
              ></img>
            </div>
          </Carousel>
        </div>
      </Container>
      <Container fluid>
        <Row>
          {cars.map((car) => (
            <Col xs={3} key={car.id} className="card-cars">
              <Link to={`${duongdan.detail}/${car.id}`} key={car.id}>
                <Card
                  key={car.id}
                  hoverable
                  style={{
                    width: 350,
                    height: "450px",
                  }}
                  cover={<img alt="example" src={car?.imgURL[0]} />}
                >
                  <Meta
                    className="card-content"
                    title={car.name}
                    description={car.description}
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
