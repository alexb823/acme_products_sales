import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Nav from './Nav';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Acme Products/Sales</h1>
        <HashRouter>
          <div>
            <Route component={Nav} />
            <Route path="/" />
            <Route path="/products" />
            <Route path="/products/sales" />
            <Route path="/products/create" />
          </div>
        </HashRouter>
      </div>
    );
  }
}
