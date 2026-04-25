import React, { useState } from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import './MainLayout.css';

export default function MainLayout({ children, onSearch }) {
  return (
    <div className="main-layout">
      <Header onSearch={onSearch} />
      <main className="main-content">
        <div className="container">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
