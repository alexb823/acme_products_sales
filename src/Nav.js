import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ location, products, onSale }) => {
  console.log(onSale);
  const pathname = location.pathname;

  const navTabs = [
    ['Home', '/'],
    ['Products', '/products'],
    ['Sales', '/products/sales'],
    ['Create', '/products/create'],
  ];

  return (
    <ul className="nav nav-tabs mb-3">
      {navTabs.map(navTab => (
        <li key={navTab[0]} className="nav-item">
          <Link
            className={`nav-link ${pathname === navTab[1] ? 'active' : ''}`}
            to={navTab[1]}
          >
            {navTab[0]}
            {/* add badge with number of products */}
            {navTab[0] === 'Products' ? (
              <span className="badge badge-primary ml-2">
                {products.length}
              </span>
            ) : null}
            {/* add badge with number of products on sale */}
            {navTab[0] === 'Sales' ? (
              <span className="badge badge-primary ml-2">{onSale.length}</span>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
