import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Headercomponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/employees', label: 'Employees', icon: '👤' },
    { to: '/departments', label: 'Departments', icon: '🏢' },
  ];

  const isActive = (path) =>
    location.pathname === path || (path === '/employees' && location.pathname === '/');

  return (
    <>
      <header className="ems-header">
        <div className="ems-header-inner">
          {/* Brand */}
          <a href="/" className="ems-brand">
            <div className="ems-brand-icon">⚡</div>
            <span>Employee Management System</span>
          </a>

          {/* Desktop Nav */}
          <ul className="ems-nav">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={`ems-nav-link ${isActive(link.to) ? 'active' : ''}`}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Hamburger (Mobile) */}
          <button
            className="ems-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : '' }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : '' }} />
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <nav className={`ems-mobile-nav ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.to}
            href={link.to}
            className="ems-mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            <span>{link.icon}</span>
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
};

export default Headercomponent;