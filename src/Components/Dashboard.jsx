import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [products, setProucts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchDatasHandler() {
    setLoading(true);
    const response = await fetch("http://localhost:8080/api/products");
    const data = await response.json();
    setProucts(data);
    setLoading(false);
  }

  async function DeleteHandler(id){
    const response = await fetch("http://localhost:8080/api/products/"+id,{
      method : 'DELETE',
    });
    const updatedList = products.filter((x)=>x.id !== id);
    setProucts(updatedList);

  }

  useEffect(() => {
    fetchDatasHandler();
  }, []);

  const Loading = () => {
    return <>Loading ...</>;
  };
  const ShowTable = () => {
    return (
      <div className="container d-flex flex-column  mt-3">
        <h3 className="mx-auto mb-3">Welcome Tarik</h3>
        <Link to="/AddProduct" className="btn btn-dark">Add Product</Link>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Short description</th>
              <th scope="col">Price</th>
              <th scope="col">Image</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return(
                <tr>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td>{product.shortDescription}</td>
                  <td>{product.price}</td>
                  <td>
                    <img src={require(`../images/${product.imageUrl}`)} alt="" height={50} width={50} />
                  </td>
                  <td>
                    <Link to={`/UpdateProduct/${product.id}`} className="btn btn-outline-dark me-2">Update</Link>
                    <button className="btn btn-dark px-3 py-2" onClick={()=>{DeleteHandler(product.id)}}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        
      </div>
    );
  };
  return <>
  {loading ? <Loading /> : <ShowTable />}
  </>;
}

export default Dashboard;
