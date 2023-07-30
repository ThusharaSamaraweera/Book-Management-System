import { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { GENRES } from "../../constants";
import { NewBook } from "../../modal";
import BookService from "../../services/book.service";

enum BookInputs {
  TITLE = "title",
  AUTHOR = "author",
  PUBLICATION_YEAR = "publicationYear",
  GENRE = "genre",
}

const AddBook = () => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [book, setBook] = useState<NewBook>({
    title: "",
    author: "",
    publicationYear: 0,
    genre: "",
  });

  const handleSubmit = async (event: any) => {
    try {
      setLoading(true);
      const savedBook = await BookService.addBook(book);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (event: any, key: BookInputs) => {
    const { value } = event.target;
    setBook((preBook) => ({ ...preBook, [key]: value }));
  };
  console.log(book);

  return (
    <Container>
      <Row>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Enter the title'
              defaultValue={book?.title}
              onChange={(event) => handleOnChange(event, BookInputs.TITLE)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Row} controlId='author'>
            <Form.Label>Author</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Enter the author'
              defaultValue={book?.author}
              onChange={(event) => handleOnChange(event, BookInputs.AUTHOR)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Row} controlId='genre'>
            <Form.Label>Publication year</Form.Label>
            <Form.Control
              required
              type='number'
              placeholder='Enter the publication year'
              defaultValue={book?.publicationYear}
              maxLength={4}
              onChange={(event) => handleOnChange(event, BookInputs.PUBLICATION_YEAR)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Row} controlId='genre'>
            <Form.Label>Genre</Form.Label>
            <Form.Select
              required
              placeholder='Select a genre'
              defaultValue={book?.genre}
              onChange={(event) => handleOnChange(event, BookInputs.GENRE)}>
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
