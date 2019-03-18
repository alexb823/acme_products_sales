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
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    const { history, fetchProducts} = this.props;

    event.preventDefault();
    axios.post('/api/products', this.state)
    .then(()=> history.push('/products'))
    .then(() => fetchProducts())
    .catch(err => console.error(err));
  };

  render() {
    const { name, price, discountPercentage, availability } = this.state;
    const { handleChange, handleSubmit } = this;
    console.log(this.state);

    return (
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    );
  }
}

export default CreateProduct;
