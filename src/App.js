import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Products from "./Components/Products";
import Product from "./Components/Product";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import AddProduct from "./Components/AddProduct";
import UpdateProduct from "./Components/UpdateProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<Product />}/>
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="AddProduct" element={<AddProduct />} />
          <Route path="UpdateProduct/:id" element={<UpdateProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
