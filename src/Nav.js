import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ location }) => {
  console.log(location);
  const pathname = location.pathname;

  const navLinks = [
    ['Home', '/'],
    ['Products', '/products'],
    ['Sales', '/products/sales'],
    ['Create', '/products/create'],
  ];

  return (
    <ul className="nav nav-tabs">
      {navLinks.map(navLink => (
        <li key={navLink[0]} className="nav-item">
          <Link
            className={`nav-link ${pathname === navLink[1] ? 'active' : ''}`}
            to={navLink[1]}
          >
            {navLink[0]}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
