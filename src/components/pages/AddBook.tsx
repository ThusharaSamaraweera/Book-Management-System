import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Spinner } from "react-bootstrap";
import { GENRES } from "../../constants";
import { NewBook } from "../../modal";
import BookService from "../../services/book.service";
import { useAppSelector } from "../../store";
import { useNavigate, useParams } from "react-router-dom";

enum BookInputs {
  TITLE = "title",
  AUTHOR = "author",
  PUBLICATION_YEAR = "publicationYear",
  GENRE = "genre",
}

export const AddBook = () => {
  const loggedUser = useAppSelector((state) => state.global.user);
  const { id: bookId } = useParams();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [book, setBook] = useState<NewBook>({
    title: "",
    author: "",
    publicationYear: "",
    genre: GENRES[0],
  });

  const getBook = async () => {
    if (!bookId) {
      return;
    }
    
    try {
      const res = await BookService.getBook(bookId);
      setBook({
        title: res?.book?.title,
        author: res?.book?.author,
        publicationYear: res?.book?.publicationYear,
        genre: res?.book?.genre,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Get book details if book id is present
  useEffect(() => {
    getBook();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity() || !book?.publicationYear) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    if (!loggedUser) {
      console.error("User not logged in");
      return;
    }
    try {
      setLoading(true);
      if (bookId) {
        const updatedBook = await BookService.updateBook(bookId, book, loggedUser?.id);
        alert("Book updated successfully");
      } else {
        const savedBook = await BookService.addBook(book, loggedUser?.id);
        alert("Book added successfully");
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (event, key: BookInputs) => {
    const { value } = event.target;
    setBook((preBook) => ({ ...preBook, [key]: value }));
  };

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
          </Form.Group>
          <Form.Group as={Row} controlId='author'>
            <Form.Label>Author</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Enter the author'
              defaultValue={book?.author}
              onChange={(event) => handleOnChange(event, BookInputs.AUTHOR)}
              disabled={isLoading}
            />
          </Form.Group>
          <Form.Group as={Row} controlId='genre'>
            <Form.Label>Publication year</Form.Label>
            <Form.Control
              required
              type='number'
              placeholder='Enter the publication year'
              defaultValue={book?.publicationYear}
              maxLength={4}
              disabled={isLoading}
              onChange={(event) => handleOnChange(event, BookInputs.PUBLICATION_YEAR)}
            />
          </Form.Group>
          <Form.Group as={Row} controlId='genre'>
            <Form.Label>Genre</Form.Label>
            <Form.Select
              disabled={isLoading}
              required
              placeholder='Select a genre'
              defaultValue={book?.genre}
              onChange={(event) => handleOnChange(event, BookInputs.GENRE)}>
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
              {bookId ? "Update Book" : "Add Book"}
            </Button>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default AddBook;
