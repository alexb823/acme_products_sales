import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import Products from './Products';
import CreateProduct from './CreateProduct';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      prodOnSale: [],
    };
  }

  fetchProducts = () => {
    axios
      .get('api/products')
      .then(response => response.data)
      .then(products =>
        this.setState({
          products,
          prodOnSale: products.filter(
            product => product.discountPercentage > 0
          ),
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
    const { products, prodOnSale } = this.state;
    const { deleteProduct, fetchProducts } = this;

    return (
      <div className="container">
        <h1 className="my-4">Acme Products/Sales</h1>

        <HashRouter>
          <Route
            render={({ location }) => (
              <Nav
                location={location}
                products={products}
                prodOnSale={prodOnSale}
              />
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

          <Route
            path="/products/sales"
            render={() => (
              <Products products={prodOnSale} deleteProduct={deleteProduct} />
            )}
          />

          <Route
            path="/products/create"
            render={({ history }) => (
              <CreateProduct history={history} fetchProducts={fetchProducts} />
            )}
          />
        </HashRouter>
      </div>
    );
  }
}
