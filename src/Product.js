import React, { Fragment } from 'react';

const Product = ({ product, deleteProduct }) => {
  const { id, name, price, discountPercentage, availability } = product;
  const onSale = discountPercentage > 0;
  const salePrice = parseFloat(price * (1 - discountPercentage / 100)).toFixed(
    2
  );

  return (
    <Fragment>
      <h5 style={{ textTransform: 'capitalize' }}>{name}</h5>

      <div style={{ textDecorationLine: onSale && 'line-through' }}>
        ${parseFloat(price).toFixed(2)}
      </div>

      {onSale && <span className="badge badge-success">${salePrice}</span>}

      <div>
        <span
          className={`badge ${
            availability === 'instock' ? 'badge-success' : 'badge-warning'
          }`}
        >
          {availability}
        </span>
      </div>

      <div className="mt-3">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteProduct(id)}
        >
          Delete
        </button>
      </div>
    </Fragment>
  );
};

export default Product;
