import React from 'react';
import ProductCard from './components/ProductCard';
import './App.css'; // for container styling

const App = () => {
  const products = [
    { name: 'Wireless Mouse', price: 25.99, inStock: true },
    { name: 'Keyboard', price: 45.5, inStock: false },
    { name: 'Monitor', price: 199.99, inStock: true },
  ];

  return (
    <div className="app-container">
      <h2 className="title">Products List</h2>
      <div className="products-wrapper">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            inStock={product.inStock}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
