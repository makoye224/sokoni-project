import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { forgotpassword } from '../features/auth/authSlice';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const dispatchResults = await dispatch(forgotpassword(email));
      if(dispatchResults.payload === "invalid input"){
        toast.error(`User does not exist`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else{
        toast.success(`Link sent to ${email}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/reset/checkemail');
      } 
    }
    setValidated(true);
  };

  return (
    <>
      <Container>
        <Card>
          <Card.Body>
            <h2>Forgot Password?</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Please enter your email address"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address.
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Button variant="primary" type="submit" className="btn btn-block btn-primary">
                Submit
              </Button>
              <hr/>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default ForgotPassword;
