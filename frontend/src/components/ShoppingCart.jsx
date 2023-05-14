import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../features/goals/goalSlice';
import axios from 'axios';
import GoalItem from './GoalItem';


const ShoppingCart = () => {
  const cart = useSelector((state) => state.goals.cart);
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: 20.0,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 10.0,
      quantity: 1,
    },
  ]);
  if(cart.length === 0){
    console.log(cart)
    return <Spinner animation="border" role="status" />;
  }

  console.log("cart...", cart)

  const handleAdd = (id) => {
    console.log(cart)
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleRemove = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Container>
      <GoalItem goal = {cart}/>
      <h1>Shopping Cart</h1>
      
        {items.map((item) => (
            <Row>
          <Col key={item.id} xs={12} md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>${item.price}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <Button
                      variant="outline-secondary"
                      onClick={() => handleRemove(item.id)}
                    >
                      -
                    </Button>
                    <Button variant="outline-secondary" disabled>
                      {item.quantity}
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => handleAdd(item.id)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          </Row>
        ))}
      
      <h2>Total: ${total}</h2>
      
    </Container>
  );
};

export default ShoppingCart;
