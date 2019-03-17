import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ location, products, prodOnSale }) => {
  const pathname = location.pathname;

  const navTabs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Sales', path: '/products/sales' },
    { name: 'Create', path: '/products/create' },
  ];

  return (
    <ul className="nav nav-tabs mb-3">
      {navTabs.map(navTab => (
        <li key={navTab.name} className="nav-item">
          <Link
            className={`nav-link ${pathname === navTab.path ? 'active' : ''}`}
            to={navTab.path}
          >
            {navTab.name}
            {/* add badges for number of products and onsale products */}
            {navTab.name === 'Products' ? (
              <span className="badge badge-primary ml-2">
                {products.length}
              </span>
            ) : null}
            {navTab.name === 'Sales' ? (
              <span className="badge badge-primary ml-2">
                {prodOnSale.length}
              </span>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
