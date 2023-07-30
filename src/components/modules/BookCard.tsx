import { Col, Row } from "react-bootstrap";

interface BookCardProps {
  title: string;
  author: string;
  publicationYear: string;
  genre: string;
}

const BookCard: React.FC<BookCardProps> = ({ title, author, publicationYear, genre }) => {
  return (
    <Col className='flex-column' xs={3}>
      <Col>{title}</Col>
      <Col>{author}</Col>
      <Col>{publicationYear}</Col>
    </Col>
  );
};

export default BookCard;
