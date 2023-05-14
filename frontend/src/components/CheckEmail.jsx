import React from 'react';
import { Container } from 'react-bootstrap';

function CheckEmail() {
  return (
    <Container className="py-5 text-center">
      <h4>A Link Was Sent To Your Email</h4>
      <p className="mt-3" style={{color: "green"}}>Use the link to reset your password within 3 days</p>
      <hr className="my-4" />
      <p style={{ fontStyle: 'italic' }}>
        please submit another request if you dont see the link or it expires!
</p>

    </Container>
  );
}

export default CheckEmail;
