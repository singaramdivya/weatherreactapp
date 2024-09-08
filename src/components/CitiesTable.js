import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import './style.css'; 

const CitiesTable = () => {
  const [cities, setCities] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [filters, setFilters] = useState({ name: '', country: '', timezone: '' });
  const [showFilter, setShowFilter] = useState({ name: false, country: false, timezone: false });
  const navigate = useNavigate();

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=${searchTerm}&start=${(page - 1) * 20}&rows=20`
      );
      const fetchedCities = response.data.records.map((record) => record.fields);
      setCities((prevCities) => [...prevCities, ...fetchedCities]);
      if (fetchedCities.length < 20) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, [page, searchTerm]);

  // Handle sorting for each column
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sorting function
  const sortedCities = cities.sort((a, b) => {
    if (sortConfig.key) {
      const valueA = a[sortConfig.key]?.toString().toLowerCase();
      const valueB = b[sortConfig.key]?.toString().toLowerCase();

      if (valueA < valueB) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  // Filtering function
  const filteredCities = sortedCities.filter((city) => {
    return (
      city.name?.toLowerCase().includes(filters.name.toLowerCase()) &&
      city.cou_name_en?.toLowerCase().includes(filters.country.toLowerCase()) &&
      city.timezone?.toLowerCase().includes(filters.timezone.toLowerCase())
    );
  });
  
  // Left-click navigation
  const handleCityClick = (cityName) => {
    navigate(`/weather/${cityName}`);
  };

  // right-click navigation
  const handleCityRightClick = (event, cityName) => {
    event.preventDefault();
    window.open(`/weather/${encodeURIComponent(cityName)}`, '_blank');
  };

  // Toggle filter dropdowns for each column
  const toggleFilter = (column) => {
    setShowFilter((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  // Handle filter selection
  const handleFilterSelection = (column, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [column]: value,
    }));
    setShowFilter({ name: false, country: false, timezone: false });
  };

  return (
    <div className="cities-container">
      <input
        type="text"
        placeholder="Search cities..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCities([]);
          setPage(1);
        }}
      />

      <InfiniteScroll
        dataLength={cities.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                City Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                <span className="filter-icon" onClick={() => toggleFilter('name')}>
                  &#x25BC; 
                </span>
                {showFilter.name && (
                  <div className="filter-dropdown">
                    <ul>
                      <li onClick={() => handleFilterSelection('name', '')}>All Cities</li>
                      {Array.from(new Set(cities.map((city) => city.name))).map((name) => (
                        <li key={name} onClick={() => handleFilterSelection('name', name)}>
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </th>
              <th onClick={() => handleSort('cou_name_en')}>
                Country {sortConfig.key === 'cou_name_en' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                <span className="filter-icon" onClick={() => toggleFilter('country')}>
                  &#x25BC;
                </span>
                {showFilter.country && (
                  <div className="filter-dropdown">
                    <ul>
                      <li onClick={() => handleFilterSelection('country', '')}>All Countries</li>
                      {Array.from(new Set(cities.map((city) => city.cou_name_en))).map((country) => (
                        <li key={country} onClick={() => handleFilterSelection('country', country)}>
                          {country}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </th>
              <th onClick={() => handleSort('timezone')}>
                Timezone {sortConfig.key === 'timezone' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                <span className="filter-icon" onClick={() => toggleFilter('timezone')}>
                  &#x25BC;
                </span>
                {showFilter.timezone && (
                  <div className="filter-dropdown">
                    <ul>
                      <li onClick={() => handleFilterSelection('timezone', '')}>All Timezones</li>
                      {Array.from(new Set(cities.map((city) => city.timezone))).map((timezone) => (
                        <li key={timezone} onClick={() => handleFilterSelection('timezone', timezone)}>
                          {timezone}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCities.map((city, index) => (
              <tr key={index}>
                <td
                  onClick={() => handleCityClick(city.name)}
                  onContextMenu={(event) => handleCityRightClick(event, city.name)}
                  style={{ cursor: 'pointer', color: 'blue' }}
                >
                  {city.name}
                </td>
                <td>{city.cou_name_en}</td>
                <td>{city.timezone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default CitiesTable;
