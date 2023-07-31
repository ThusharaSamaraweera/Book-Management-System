import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  publicationYear: string;
  genre: string;
}

export const BookCard: React.FC<BookCardProps> = ({ title, author, publicationYear, genre, id }) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/books/${id}`);
  };

  return (
    <Col className='flex-column card m-2 p-3 book-card' xs={3} onClick={handleOnClick}>
      <Col>
        <h5>{title}</h5>
      </Col>
      <Col>Author: {author}</Col>
      <Col>{publicationYear}</Col>
      <Col>{genre}</Col>
    </Col>
  );
};

export default BookCard;
