import React, { useRef, useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const navigate = useNavigate();
  const titleInputRef = useRef();
  const descInputRef = useRef();
  const shortDecInputRef = useRef();
  const priceInputRef = useRef();
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:8080/api/products/" + id);
    const data = await response.json();
    setProduct(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const updateProductHandler = async (event) => {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDesc = descInputRef.current.value;
    const enteredShortDesc = shortDecInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id : id,
        title: enteredTitle,
        description: enteredDesc,
        shortDescription: enteredShortDesc,
        price: enteredPrice,
        imageUrl: "6.png",
        category: {
          id: 2,
          title: "category2",
        },
      }),
    };

    const response = await fetch(
      "http://localhost:8080/api/products",
      requestOptions
    );
    const data = response.json();
    navigate("/dashboard");
  };

  const Loading = () => {
    return <p>Loading ...</p>;
  };
  const ShowProduct = () => {
    return (
      <>
        <Container>
          <Row className="mt-5">
            <Col
              lg={5}
              md={6}
              sm={12}
              className="p-5 m-auto shadow-sm rounded-lg"
            >
              <h2 className="fw-bold">Update Product</h2>
              <Form onSubmit={updateProductHandler}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    defaultValue={product.title}
                    ref={titleInputRef}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    defaultValue={product.description}
                    ref={descInputRef}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Short Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter short description"
                    defaultValue={product.shortDescription}
                    ref={shortDecInputRef}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    defaultValue={product.price}
                    ref={priceInputRef}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" placeholder="Enter image" />
                </Form.Group>

                <Button variant="btn btn-dark mt-2 px-4" type="submit">
                  Update
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  return <div>
    {loading ? <Loading /> : <ShowProduct />}
  </div>;
}

export default UpdateProduct;
