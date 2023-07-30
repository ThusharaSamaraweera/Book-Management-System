import { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { GENRES } from "../../constants";

const AddBook = () => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (event: any) => {};

  return (
    <Container>
      <Row>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control required type='text' placeholder='Enter the title' />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Row} controlId='author'>
            <Form.Label>Author</Form.Label>
            <Form.Control required type='text' placeholder='Enter the author' />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Row} controlId='genre'>
            <Form.Label>Publication year</Form.Label>
            <Form.Control required type='number' placeholder='Enter the publication year' />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Row} controlId='genre'>
            <Form.Label>Genre</Form.Label>
            <Form.Select required placeholder='Select a genre'>
              <option>---</option>
              {GENRES.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Row className='login-btn justify-content-center mt-2'>
            <Button type='submit' disabled={isLoading}>
              {isLoading && <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />}
              Add book
            </Button>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default AddBook;
