import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Col, Form, InputGroup, Row, Button, Spinner } from "react-bootstrap";
import { FiEye, FiEyeOff } from "react-icons/fi";
import authService from "../../services/auth.service";

const SignUp = () => {
  const [validated, setValidated] = useState(false);
  const [formValues, setFormValues] = useState({ name: "", email: "", password: "" });
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnLogin = async (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setLoading(true);
    try {
      setValidated(true);
      const res = await authService.signUp(formValues?.name, formValues?.email, formValues?.password);
      navigate("/login");
    } catch (error) {
      form.reset();
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const togglePasswordVisible = () => {
    setPasswordVisible((visible) => !visible);
  };

  return (
    <Row className='sign-card justify-content-center align-content-center mx-1 mx-xs-2 min-vh-75'>
      <Col xs={12} sm={6} className='login-section p-2 p-sm-3 p-md-5'>
        <Row className='mb-4'>
          <h4 className='login-form-title'>Log into your account</h4>
        </Row>
        <Form noValidate validated={validated} className='login-form' onSubmit={handleOnLogin}>
          <Form.Group controlId='name' className='name-group'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={formValues?.name}
              type='text'
              placeholder='Enter name'
              required
              onChange={handleOnChanged}
            />
            <Form.Control.Feedback type='invalid' className='error-message'>
              Please provide your name
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId='email' className='email-group'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={formValues?.email}
              type='email'
              placeholder='enter email'
              required
              onChange={handleOnChanged}
            />
            <Form.Control.Feedback type='invalid' className='error-message'>
              Please provide your email
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} xs={12} sm={12} className='password-group' controlId='password'>
            <Form.Label>Password</Form.Label>
            <InputGroup className='password-append'>
              <Form.Control
                value={formValues?.password}
                required
                type={isPasswordVisible ? "text" : "password"}
                className='append-control'
                onChange={handleOnChanged}
              />
              <InputGroup.Text>
                <InputGroup.Text onClick={togglePasswordVisible}>
                  <i className='eye-icon'>{isPasswordVisible ? <FiEye className='icon' /> : <FiEyeOff />}</i>
                </InputGroup.Text>
              </InputGroup.Text>
              <Form.Control.Feedback type='invalid' className='error-message'>
                Please type a strong password
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Row className='login-btn justify-content-center mt-2'>
            <Button type='submit' disabled={isLoading}>
              {isLoading && <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />}
                Sign Up
            </Button>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default SignUp;
