import React, { useState } from "react";
import "./App.css";
import SearchUser from "./SearchUser";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = () => {
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: userName }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserId(data.userId);
        setCurrentPage("home"); // Navigate back to home page after saving user
      })
      .catch((error) => {
        console.error("Error saving user:", error);
      });
  };

  const handleSearchUser = (userId) => {
    return fetch(`http://localhost:4000/users/${userId}`)
      .then((response) => response.json())
      .catch((error) => {
        throw new Error("Error searching user: " + error.message);
      });
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  let pageContent;
  if (currentPage === "home") {
    pageContent = (
      <div className="page-container">
        <h1 className="app-heading">Welcome to My Application</h1>
        <p className="app-description">
          Here we are training our development skills
        </p>
        <p className="app-description">Please add your name below</p>
        <div className="input-container">
          <input
            type="text"
            value={userName}
            onChange={handleUserNameChange}
            placeholder="Enter your name"
            className="name-input"
          />
          <button onClick={handleSaveUser} className="save-button">
            Save
          </button>
        </div>
        {userId && (
          <p className="user-id">
            Your user ID: <span className="highlight">{userId}</span>
          </p>
        )}
        <button
          onClick={() => navigateToPage("search")}
          className="search-button"
        >
          Search User
        </button>
      </div>
    );
  } else if (currentPage === "search") {
    pageContent = (
      <div className="page-container">
        <button onClick={() => navigateToPage("home")} className="back-button">
          Back to User Creation
        </button>
        <SearchUser onSearchUser={handleSearchUser} />
      </div>
    );
  }

  return <div className="app">{pageContent}</div>;
}

export default App;
