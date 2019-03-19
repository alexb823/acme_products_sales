import React, { Component } from 'react';
import axios from 'axios';

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      discountPercentage: '',
      availability: 'instock',
      errorMessage: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { history, fetchProducts } = this.props;
    const newProduct = this.state;
    newProduct.discountPercentage = newProduct.discountPercentage || 0;

    axios
      .post('/api/products', newProduct)
      .then(() => {
        if (newProduct.discountPercentage) history.push('/products/sales');
        else history.push('/products');
      })
      .then(() => fetchProducts())
      .catch(err => {
        this.setState({ errorMessage: err.response.data });
        console.log(err);
      });
  };

  validateInputs = () => {
    const { name, price, discountPercentage } = this.state;
    const regex = /^[0-9]*(?:\.\d{1,2})?$/; //only numbers with optional 2 decimals
    return (
      name.length === 0 ||
      price.length === 0 ||
      !regex.test(price) ||
      (discountPercentage && !regex.test(discountPercentage)) ||
      parseFloat(discountPercentage) >= 100 ||
      parseFloat(discountPercentage) <= 0
    );
  };

  render() {
    const {
      name,
      price,
      discountPercentage,
      availability,
      errorMessage,
    } = this.state;
    const { handleChange, handleSubmit, validateInputs } = this;

    return (
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            className="form-control"
            name="price"
            value={price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="discountPercentage">Discount Percentage</label>
          <input
            type="text"
            className="form-control"
            name="discountPercentage"
            value={discountPercentage}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="availability">Availability</label>
          <select
            className="form-control"
            name="availability"
            value={availability}
            onChange={handleChange}
          >
            <option>instock</option>
            <option>backordered</option>
            <option>discontinued</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={validateInputs()}
        >
          Create
        </button>
      </form>
    );
  }
}

export default CreateProduct;
