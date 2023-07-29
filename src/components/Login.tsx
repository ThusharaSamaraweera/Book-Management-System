import React from "react";
import { Col, Row } from "react-bootstrap";

const Login = () => {
  return (
    <Row className='login-card justify-content-center align-content-center mx-1 mx-xs-2 min-vh-75'>
      <Col xs={12} sm={6} className='login-section p-2 p-sm-3 p-md-5'>
        <Row className='mb-4'>
          <h4 className='login-form-title'>Log into your account</h4>
        </Row>
      </Col>
    </Row>
  );
};

export default Login;
