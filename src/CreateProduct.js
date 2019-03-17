import React, { Component } from 'react';

class CreateProduct extends Component {
  constructor() {
    super();
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


  render() {
    const { name, price, discountPercentage, availability } = this.state;
    const { handleChange } = this;
    console.log(this.state);

    return (
      <form>
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
      </form>
    );
  }
}

export default CreateProduct;
