import { Container } from "react-bootstrap";
import FilterSection from "../modules/FilterSection";
import { useEffect, useState } from "react";
import { IBook, FilterValues } from "../../modal";
import BookService from "../../services/book.service";
import BookList from "../modules/BookList";

export const LandingPage = () => {
  const limit = 5;
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>([]);
  const [page, setPage] = useState<number>(1);

  const fetchBooks = async (filterValues: FilterValues) => {
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
      limit: limit,
    };
    fetchBooks(filterValues);
  }, []);

  const handleOnClickFilter = (filterValues: FilterValues) => {
    filterValues.page = page;
    filterValues.limit = limit;
    fetchBooks(filterValues);
  };

  const handleOnResetClick = () => {
    setPage(1);
    const filterValues: FilterValues = {
      page: 1,
      limit: limit,
    };
    fetchBooks(filterValues);
  };

  const handleOnClickMore = async () => {
    setPage(page + 1);
    const filterValues: FilterValues = {
      page: page + 1,
      limit: limit,
    };
    try {
      const res = await BookService.filterBooks(filterValues);
      // eslint-disable-next-line no-unsafe-optional-chaining
      setFilteredBooks([...filteredBooks, ...res[0]?.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <FilterSection handleOnFilterClick={handleOnClickFilter} handleOnResetClick={handleOnResetClick} />
      <BookList books={filteredBooks} handleOnClickMore={handleOnClickMore} />
    </Container>
  );
};

export default LandingPage;
