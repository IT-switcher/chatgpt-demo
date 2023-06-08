import React, { useState } from "react";

function SearchUser({ onSearchUser }) {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSearch = () => {
    onSearchUser(userId)
      .then((data) => {
        setUserName(data.name);
        setError("");
      })
      .catch((error) => {
        setUserName("");
        setError(error.message);
      });
  };

  return (
    <div>
      <h2>Search User</h2>
      <div className="input-container">
        <input
          type="text"
          value={userId}
          onChange={handleUserIdChange}
          placeholder="Enter user ID"
          className="name-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      {userName && <p className="search-result">User Name: {userName}</p>}
      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
}

export default SearchUser;
