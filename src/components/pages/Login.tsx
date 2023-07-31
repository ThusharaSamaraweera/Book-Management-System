import { useState } from "react";
import { Col, Form, InputGroup, Row, Button, Spinner } from "react-bootstrap";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import authService from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { AppDispatch, setUser } from "../../store";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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
      const res = await authService.login(formValues.email, formValues.password);
      setValidated(true);
      dispatch(setUser(res?.data));
      navigate("/");
    } catch (error) {
      alert("Invalid credentials");
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
    <Row className='login-card justify-content-center align-content-center mx-1 mx-xs-2 min-vh-75'>
      <Col xs={12} sm={6} className='login-section p-2 p-sm-3 p-md-5'>
        <Row className='mb-4'>
          <h4 className='login-form-title'>Log into your account</h4>
        </Row>
        <Form noValidate validated={validated} className='login-form' onSubmit={handleOnLogin}>
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
              Login
            </Button>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
