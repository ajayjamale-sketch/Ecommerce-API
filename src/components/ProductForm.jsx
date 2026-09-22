import React, { useState, useEffect } from "react";

const ProductForm = ({ setShowForm, addProduct, editProduct, updateProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });


  
  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name || "",
        price: editProduct.price || "",
        category: editProduct.category || "",
        image: editProduct.imageUrl || editProduct.image || "",
      });
    }
  }, [editProduct]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editProduct) {
      updateProduct({ ...formData, id: editProduct.id });
    } else {
      addProduct(formData);
    }

    setFormData({
      name: "",
      price: "",
      category: "",
      image: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter Product Name : </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="product name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="price">Enter Product Price : </label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="product price"
          value={formData.price}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="category">Enter Product Category : </label>
        <input
          type="text"
          id="category"
          name="category"
          placeholder="product category"
          value={formData.category}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="image">Enter Product Image URL : </label>
        <input
          type="text"
          id="image"
          name="image"
          placeholder="product image"
          value={formData.image}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Submit</button>
        <button type="button" onClick={() => setShowForm(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
