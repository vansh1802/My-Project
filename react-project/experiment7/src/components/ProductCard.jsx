import React from 'react';
import '../ProductCard.css';

const ProductCard = ({ name, price, inStock }) => {
  return (
    <div className="product-card">
      <h2>{name}</h2>
      <p>Price: ₹{price}</p>
      <p>
        {inStock ? (
          <span className="in-stock">In Stock</span>
        ) : (
          <span className="out-of-stock">Out of Stock</span>
        )}
      </p>
    </div>
  );
};

export default ProductCard;
