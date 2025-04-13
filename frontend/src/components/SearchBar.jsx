import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setSearchStatus] = useState(''); // "on" or "off"

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({
      term: searchTerm,
      status: status, // Seulement le statut, "on" ou "off"
    });
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-inputs">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher..."
            className="search-input"
          />
          
          <select
            value={status}
            onChange={(e) => setSearchStatus(e.target.value)}
            className="search-select"
          >
            <option value="">Tous les appareils</option>
            <option value="Allumé">Appareils actifs</option>
            <option value="Éteint">Appareils éteints</option>
          </select>

          <button type="submit" className="search-button">
            Rechercher
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
