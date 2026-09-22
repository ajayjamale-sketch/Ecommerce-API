import React from "react";

const ProductList = ({
  productList,
  deleteProdcut,
  setEditProduct,
  setShowForm,
}) => {
  return (
    <div className="product-list">
      {productList.map((product) => (
        <div className="product-card" key={product.id}>
          <img
            src={product.imageUrl || product.image}
            alt={product.name}
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />

          <div className="product-info">
            <h2 className="product-name">{product.name}</h2>
            <h2 className="product-price">${product.price}</h2>
            <p className="product-category">{product.category}</p>
          </div>

          <button onClick={() => deleteProdcut(product.id)}>Delete</button>

          <button
            onClick={() => {
              setEditProduct(product);
              setShowForm(true);
            }}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
