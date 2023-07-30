import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import FilterSection from "../modules/FilterSection";
import { useEffect, useState } from "react";
import { IBook } from "../../modal";
import BookService from "../../services/book.service";

const LandingPage = () => {
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>([]);
  
  useEffect(() => {
    const fetchBooks = async () => await BookService.getAllBooks()
      .then((response) => {
        console.log(response);
        setFilteredBooks(response.data);  
      })
      .catch((error) => {
        console.log(error);
      }
    );
    fetchBooks();
  }, []);

  const handleOnClickFilter = (filterValues: any) => {
    console.log(filterValues);
  }

  return (
    <Container>
      <FilterSection handleOnFilterClick={handleOnClickFilter} />
    </Container>
  );
};

export default LandingPage;
