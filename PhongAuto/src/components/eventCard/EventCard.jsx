import React, { useEffect, useState } from "react";
import "./EventCard.css";
import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";

import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { duongdan } from "../../routes";
export default function EventCard() {
  const [events, setEvents] = useState([]);
  async function fetchEvent() {
    try {
      const response = await axios.get(
        "https://66bcb31724da2de7ff6b8d0e.mockapi.io/PhongAuto-Event"
      );

      const eventsorted = response.data.slice(0, 5);
      setEvents(eventsorted);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }
  useEffect(() => {
    fetchEvent();
  }, []);
  console.log(events);
  return (
    <div>
      <Row>
        {events.map((event) => (
          <Col key={event.eid} md={4} xs={12} className="col-event">
            <Card
              key={event.eid}
              hoverable
              style={{
                width: "100%",
              }}
              cover={<img alt="example" src={event?.eventImg[0]} />}
            >
              <Meta
                title={event.eventTitle}
                description={event.eventDescription}
              />
              <Link to={duongdan.eventDetail}>
                <Button style={{ marginTop: "15%" }}>More Details</Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
