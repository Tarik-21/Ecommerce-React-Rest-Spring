import { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Login = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [admin, setAdmin] = useState();
  const [error, setError] = useState(false);

  const loginHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    try {
      const response = await fetch(
        `http://localhost:8080/api/admins/${enteredEmail}`
      );
      const data = await response.json();
      if (data.password !== enteredPassword) {
        throw "Password is incorrect";
      }
      setError(false);
      navigate("/dashboard");
    } catch (error) {
      setError(true);
    }
  };

  const Error = () => {
    return <p style={{ color: "red" }}>Email or password is incorrect</p>;
  };
  return (
    <>
      <Navbar />
      <Container>
        <Row className="mt-5">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <Form onSubmit={loginHandler}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  ref={emailInputRef}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  ref={passwordInputRef}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Button variant="btn btn-dark mt-2" type="submit">
                Login
              </Button>
              {error && <Error />}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
