import { Container } from "react-bootstrap";
import FilterSection from "../modules/FilterSection";
import { useEffect, useState } from "react";
import { IBook, FilterValues } from "../../modal";
import BookService from "../../services/book.service";
import BookList from "../modules/BookList";

const LandingPage = () => {
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>([]);
  const [page, setPage] = useState<number>(1);
  
  const fetchBooks = async (filterValues:FilterValues ) => {
    return await BookService.filterBooks(filterValues)
      .then((response) => {
        setFilteredBooks(response[0]?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const filterValues: FilterValues = {
      page: 1,
      limit: 2
    };
    fetchBooks(filterValues);
  }, []);

  const handleOnClickFilter = (filterValues: FilterValues) => {
    filterValues.page = page
    filterValues.limit = 2
    fetchBooks(filterValues);
  };

  return (
    <Container>
      <FilterSection handleOnFilterClick={handleOnClickFilter} />
      <BookList books={filteredBooks} />
    </Container>
  );
};

export default LandingPage;
