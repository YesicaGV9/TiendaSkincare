import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            Welcome to Skincare Shop - Your trusted source for premium Korean
            skincare products and beauty solutions.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/cart">Cart</a>
            </li>
            <li>
              <a href="/login">Account</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@skincareshop.com</p>
          <p>Phone: +57 (123) 456-7890</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#" title="Facebook">
              <FiFacebook size={20} />
            </a>
            <a href="#" title="Instagram">
              <FiInstagram size={20} />
            </a>
            <a href="#" title="Twitter">
              <FiTwitter size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Skincare Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}
