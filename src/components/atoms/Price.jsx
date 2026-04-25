import React from 'react';
import './Price.css';

export default function Price({ amount, className = '' }) {
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  }).format(amount);

  return <span className={`price ${className}`}>{formattedPrice}</span>;
}
