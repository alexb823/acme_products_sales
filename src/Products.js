import React from 'react';
import Product from './Product';

const Products = ({ products, deleteProduct}) => {
  return (
    <ul className="list-group">
      {products.map(product => (
        <li className="list-group-item" key={product.id}>
          <Product product={product} deleteProduct={deleteProduct}/>
        </li>
      ))}
    </ul>
  );
};

export default Products;
