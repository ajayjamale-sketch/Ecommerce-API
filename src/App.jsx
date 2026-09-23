import { useState, useEffect } from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import { getAllProducts } from "./service/productService";

function App() {
  const [productList, setProductList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    getAllProducts()
      .then((data) => setProductList(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <>
      <h2>Product Management Application</h2>

      <button
        onClick={() => {
          setEditProduct(null);
          setShowForm(true);
        }}
      >
        Add Product
      </button>

      {showForm && (
        <ProductForm
          setShowForm={setShowForm}
          // addProduct={addProduct}
          editProduct={editProduct}
          // updateProduct={updateProduct}
        />
      )}

      <ProductList
        productList={productList}
        // deleteProdcut={deleteProdcut}
        setEditProduct={setEditProduct}
        setShowForm={setShowForm}
      />
    </>
  );
}

export default App;
