import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GENRES } from "../../constants";
import { IBook } from "../../modal";
import BookService from "../../services/book.service";
import { Button, Container, Row, Spinner } from "react-bootstrap";
import ProtectedComponent from "../utils/ProtectedComponent";
import { useAppSelector } from "../../store";

const Book = () => {
  const [book, setBook] = useState<IBook>({
    title: "",
    author: "",
    publicationYear: "",
    genre: GENRES[0],
    _id: "",
    createdBy: "",
  });
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loggedUser = useAppSelector((state) => state.global.user);

  const getBook = async () => {
    if (!id) {
      console.error("No book id found");
      return;
    }
    try {
      setLoading(true);
      const res = await BookService.getBook(id);
      setBook({
        title: res?.book?.title,
        author: res?.book?.author,
        publicationYear: res?.book?.publicationYear,
        genre: res?.book?.genre,
        _id: res?.book?._id,
        createdBy: res?.book?.createdBy,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getBook();
  }, []);

  const handleOnClickUpdate = async () => {
    if (!id) {
      console.error("No book id found");
      return;
    }
    navigate("/update-book/" + id);
  };

  const handleOnClickDelete = async () => {
    if (!id) {
      console.error("No book id found");
      return;
    }
    try {
      setLoading(true);
      await BookService.deleteBook(id, loggedUser?.id);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Row>
        <h1>{book.title}</h1>
        <p>Author: {book?.author}</p>
        <p>Publication Year: {book?.publicationYear}</p>
        <p>Genre: {book?.genre}</p>
      </Row>

      <ProtectedComponent privilegeUserId={book?.createdBy}>
        <Row className='gap-2'>
          <Button type='submit' disabled={isLoading} onClick={handleOnClickUpdate}>
            {isLoading && <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />}
            Update
          </Button>
          <Button type='submit' disabled={isLoading} variant='danger' onClick={handleOnClickDelete}>
            {isLoading && <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />}
            Delete
          </Button>
        </Row>
      </ProtectedComponent>
    </Container>
  );
};

export default Book;
