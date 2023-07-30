import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { genre } from "../../assets/constants";
import { useState } from "react";

enum FilterBy {
    TITLE = "title",
    AUTHOR = "author",
    GENRE = "genre",
}

const FilterSection = () => {
  const [filterValues, setFilterValues] = useState({
    title: "",
    author: "",
    genre: "",
  });

  const handleOnChange = (event: any, type: FilterBy) => {
    setFilterValues({ ...filterValues, [type]: event.target.value });
  };

  console.log("🚀 ~ file: FilterSection.tsx:6 ~ handleOnChange ~ filterValues:", filterValues);
  return (
    <Row className='filter-section'>
      <Col xs={12} className='mt-3'>
        <FloatingLabel controlId='title' label='Search by title' className='title-filter'>
          <Form.Control
            type='text'
            placeholder='Search by title'
            size='sm'
            onChange={(event) => handleOnChange(event, FilterBy.TITLE)}
          />
        </FloatingLabel>
      </Col>
      <Col xs={12} className='mt-3'>
        <FloatingLabel controlId='author' label='Search by author' className='author-filter'>
          <Form.Control
            type='text'
            placeholder='Search by author'
            size='sm'
            onChange={(event) => handleOnChange(event, FilterBy.AUTHOR)}
          />
        </FloatingLabel>
      </Col>
      <Col xs={12} className='mt-3'>
        <FloatingLabel controlId='genre' label='Filter by genre'>
          <Form.Select onChange={(event) => handleOnChange(event, FilterBy.GENRE)}>
            <option>---</option>
            {genre.map((item, index) => {
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
  );
};

export default FilterSection;
