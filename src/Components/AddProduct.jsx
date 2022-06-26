import React,{useRef} from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const titleInputRef = useRef();
  const descInputRef = useRef();
  const shortDecInputRef = useRef();
  const priceInputRef = useRef();


  const addProductHandler = async  (event) => {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDesc = descInputRef.current.value;
    const enteredShortDesc = shortDecInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;


    const requestOptions = {
        method : 'POST',
        headers : {'Content-Type':'application/json'},
        body: JSON.stringify({
            title : enteredTitle,
            description : enteredDesc,
            shortDescription : enteredShortDesc,
            price : enteredPrice,
            imageUrl : '6.png',
            category : {
                id : 2,
                title : 'category2'
            }
        })
    }

    const response = await fetch('http://localhost:8080/api/products', requestOptions);
    const data = response.json();
    navigate("/dashboard");


  };
  return (
    <div>
      <Container>
        <Row className="mt-5">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <h2 className="fw-bold">Add Product</h2>
            <Form onSubmit={addProductHandler}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" ref={titleInputRef} />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter description" ref={descInputRef} />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Short Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter short description" ref={shortDecInputRef}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Enter price" ref={priceInputRef} />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" placeholder="Enter image" />
              </Form.Group>

              <Button variant="btn btn-dark mt-2 px-4" type="submit">
                Add
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddProduct;
