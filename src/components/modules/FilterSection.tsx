import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { GENRES } from "../../constants";

enum FilterBy {
  TITLE = "title",
  AUTHOR = "author",
  GENRE = "genre",
}

interface FilterSectionProps {
  handleOnFilterClick: (filterValues: any) => void;
  handleOnResetClick: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ handleOnFilterClick, handleOnResetClick }) => {
  const [filterValues, setFilterValues] = useState({
    title: "",
    author: "",
    genre: "",
  });

  const handleOnChange = (event: any, type: FilterBy) => {
    const value = event.target.value;
    setFilterValues({
      ...filterValues,
      [type]: value,
    });
  };

  const handleOnClickSearch = () => {
    handleOnFilterClick(filterValues);
  };

  const handleOnReset = () => {
    setFilterValues({
      title: "",
      author: "",
      genre: "",
    });
    handleOnResetClick();
  };

  return (
    <Row className='filter-section'>
      <Row>
        <Col xs={6} md={4} className='mt-3'>
          <FloatingLabel controlId='title' label='Search by title' className='title-filter'>
            <Form.Control
              type='text'
              placeholder='Search by title'
              size='sm'
              onChange={(event) => handleOnChange(event, FilterBy.TITLE)}
              value={filterValues.title}
            />
          </FloatingLabel>
        </Col>
        <Col xs={6} md={4} className='mt-3'>
          <FloatingLabel controlId='author' label='Search by author' className='author-filter'>
            <Form.Control
              type='text'
              placeholder='Search by author'
              size='sm'
              onChange={(event) => handleOnChange(event, FilterBy.AUTHOR)}
              value={filterValues.author}
            />
          </FloatingLabel>
        </Col>
        <Col xs={12} md={4} className='mt-3'>
          <FloatingLabel controlId='genre' label='Filter by genre'>
            <Form.Select onChange={(event) => handleOnChange(event, FilterBy.GENRE)} value={filterValues.genre}>
              <option>---</option>
              {GENRES.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
      <Col xs={12}>
        <button className='btn btn-primary mt-3 w-100' onClick={handleOnClickSearch}>
          Search
        </button>
        <button className='btn btn-secondary mt-3 w-100' onClick={handleOnReset}>
          Reset
        </button>
      </Col>
    </Row>
  );
};

export default FilterSection;
