import { useState, useEffect } from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

const API_URL = "http://localhost:8080/api/products";

function App() {
  const [productList, setProductList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProductList(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const payload = {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        category: newProduct.category,
        imageUrl: newProduct.image,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const savedProduct = await response.json();
      setProductList([...productList, savedProduct]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const deleteProdcut = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      const newList = productList.filter((product) => product.id !== id);
      setProductList(newList);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateProduct = async (updatedProductData) => {
    try {
      const payload = {
        name: updatedProductData.name,
        price: parseFloat(updatedProductData.price),
        category: updatedProductData.category,
        imageUrl: updatedProductData.image,
      };

      const response = await fetch(`${API_URL}/${updatedProductData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const savedProduct = await response.json();
      const updateList = productList.map((product) =>
        product.id === savedProduct.id ? savedProduct : product
      );

      setProductList(updateList);
      setEditProduct(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

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
          addProduct={addProduct}
          editProduct={editProduct}
          updateProduct={updateProduct}
        />
      )}

      <ProductList
        productList={productList}
        deleteProdcut={deleteProdcut}
        setEditProduct={setEditProduct}
        setShowForm={setShowForm}
      />
    </>
  );
}

export default App;
