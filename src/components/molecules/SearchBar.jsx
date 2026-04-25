import React from 'react';
import { FiSearch } from 'react-icons/fi';
import Input from '../atoms/Input';
import './SearchBar.css';

export default function SearchBar({ value, onChange, placeholder = 'Search skincare...' }) {
  return (
    <div className="search-bar">
      <FiSearch className="search-icon" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="search-input"
      />
    </div>
  );
}
