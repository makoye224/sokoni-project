import React from 'react'
import { Form, Button } from 'react-bootstrap'

const Search = () => {
  return (
    <div>
      <Form className="d-flex container">
        <Form.Control type="search" placeholder="I am looking for..." className="mr-1" aria-label="Search" />
        <Button className="bg-info" variant="outline-primary" style={{color: "black"}}>Search</Button>
      </Form>
    </div>
  )
}

export default Search
