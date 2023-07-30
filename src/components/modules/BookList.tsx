import { Row } from "react-bootstrap";
import { IBook } from "../../modal";
import BookCard from "./BookCard";

interface BookListProps {
  books: IBook[];
}

const BookList: React.FC<BookListProps> = ({books}) => {
  if(!books || books.length === 0) return <div>No books found</div>;

  return (
    <Row className="row">
      {books.map((book: IBook, index: number) => {
        return (
          <BookCard
            key={index}
            title={book.title}
            author={book.author}
            publicationYear={book.publicationYear}
            genre={book.genre}
          />
        );
      })}
    </Row>
  );
};

export default BookList;
