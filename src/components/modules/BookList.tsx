import { Button, Row } from "react-bootstrap";
import { IBook } from "../../modal";
import BookCard from "./BookCard";

interface BookListProps {
  books: IBook[];
  handleOnClickMore?: () => void;
}

const BookList: React.FC<BookListProps> = ({ books, handleOnClickMore }) => {
  if (!books || books.length === 0) return <div>No books found</div>;

  return (
    <Row className='row'>
      {books.map((book: IBook, index: number) => {
        return (
          <BookCard
            key={index}
            id={book?._id}
            title={book.title}
            author={book.author}
            publicationYear={book.publicationYear}
            genre={book.genre}
          />
        );
      })}
      <Row className='my-5 mx-3'>
        <Button variant='dark' onClick={handleOnClickMore}>
          More
        </Button>
      </Row>
    </Row>
  );
};

export default BookList;
