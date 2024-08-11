import React, { useEffect, useState } from "react";
import HeaderAntd from "../../components/Header/Header";
import { Card, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { Col, Container } from "react-bootstrap";
import api from "../../config/api";
import "./Homepage.css";
import { Link } from "react-router-dom";
import { duongdan } from "../../routes";

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
  return (
    <>
      <HeaderAntd />
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
