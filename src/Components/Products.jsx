import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Products() {
  const [products, setProucts] = useState([]);
  const [categories,setCategories] = useState([]);
  const [filter, setFilter] = useState(products);
  const [loading, setLoading] = useState(false);


  async function fetchDatasHandler() {
    setLoading(true);
    const response = await fetch("http://localhost:8080/api/products");
    const data = await response.json();
    setProucts(data);
    setFilter(data);
    const responceC = await fetch("http://localhost:8080/api/categories");
    const datac = await responceC.json();
    setCategories(datac)
    setLoading(false);
  }

  useEffect(() => {
    fetchDatasHandler();
  }, []);

  const Loading = () => {
    return <>Loading ...</>;
  };

  const filterProduct = (cat) => {
    const updatedList = products.filter((x)=>x.category.id === cat);
    setFilter(updatedList);
  }

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button className="btn btn-outline-dark me-2" onClick={()=>setFilter(products)}>All</button>
          {categories.map((category)=>{
            return(
              <button className="btn btn-outline-dark me-2" onClick={()=> filterProduct(category.id)} >{category.title}</button>
            )
          })}
        </div>
        {filter.map((product) => {
          return (
            <>
            
              <div className="col-md-3 mb-4">
                <div class="card h-100 text-center p-4" key={product.id}>
                  <img src={require(`../images/${product.imageUrl}`)} className="card-img-top" alt="img" height={250} />
                  <div className="card-body">
                    <h5 className="card-title mb-0">{product.title.substring(0,12)}</h5>
                    <p className="card-text lead fw-bold">
                      ${product.price}
                    </p>
                    <Link to={`/products/${product.id}`} state={{ image: product.imageUrl }} className="btn btn-outline-dark">
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
}

export default Products;
