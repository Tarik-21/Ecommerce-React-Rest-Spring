import axios from "axios";
import React, { useState, useEffect } from "react";

import { useParams,useLocation  } from "react-router-dom";
import Navbar from "./Navbar";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation()
  const { image } = location.state

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/api/products/${id}`).then((response) => {
      setProduct(response.data);
    });
    setLoading(false);
  }, []);

  const Loading = () => {
    return <div>Loading ...</div>;
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={require(`../images/${image}`)}
            alt={product.title}
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">Clothes</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead fw-bolder">
            Rating 4 <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4">$ {product.price}</h3>
          <p className="lead">{product.description}</p>
          <button className="btn btn-outline-dark me-2 px-3 py-2">
            Add to Cart
          </button>
          <button className="btn btn-dark">Go to Cart</button>
        </div>
      </>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row py-5">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
}
export default Product;
