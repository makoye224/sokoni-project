import React, { useState } from "react";
import {
  Form,
  FormControl,
  InputGroup,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";

export default function PriceSelection() {
  const [showPriceOptions, setShowPriceOptions] = useState(false);

  const togglePriceOptions = () => {
    setShowPriceOptions(!showPriceOptions);
  };

  return (
    <div className="mt-5 well" style={{color: "white"}}>
      <Row>
        <Col sm={4}>
          <Form className="d-flex">
            <Button variant="outline-secondary" className="d-none d-lg-block" onClick={togglePriceOptions}>
              Price Range
            </Button>
          </Form>
        </Col>
        <Col lg={3} className={`mt-3 mt-lg-0 ${showPriceOptions ? "" : "d-none d-lg-block"}`}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Price from:</Form.Label>
              <FormControl type="number" placeholder="Enter min price" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price to:</Form.Label>
              <FormControl type="number" placeholder="Enter max price" />
            </Form.Group>

            <Button variant="outline-primary" className="w-100" type="submit">
              Apply
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="outline-secondary"
            className="mt-3 w-100 d-lg-none"
            onClick={togglePriceOptions}
          >
            Price Range
          </Button>
        </Col>
      </Row>
    </div>
  );
}
