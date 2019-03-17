import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import Products from './Products';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      onSale: [],
    };
  }

  fetchProducts = () => {
    axios
      .get('api/products')
      .then(response => response.data)
      .then(products =>
        this.setState({
          products,
          onSale: products.filter(product => product.discountPercentage > 0),
        })
      )
      .catch(err => console.error(err));
  };

  componentDidMount() {
    this.fetchProducts();
  }

  deleteProduct = id => {
    axios
      .delete(`api/products/${id}`)
      .then(() => this.fetchProducts())
      .catch(err => console.error(err));
  };

  render() {
    const { products, onSale } = this.state;
    const { deleteProduct } = this;

    return (
      <div className="container">
        <h1 className="my-4">Acme Products/Sales</h1>
        <HashRouter>
          <div>
            <Route
              render={({ location }) => (
                <Nav location={location} products={products} onSale={onSale} />
              )}
            />

            <Route exact path="/" render={() => <h2>Welcome!</h2>} />

            <Route
              exact
              path="/products"
              render={() => (
                <Products products={products} deleteProduct={deleteProduct} />
              )}
            />

            <Route exact path="/products/sales" />
            <Route exact path="/products/create" />
          </div>
        </HashRouter>
      </div>
    );
  }
}