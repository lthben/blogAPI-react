import React, { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = () => {};

  return (
    <form className="w-50 navbar-nav mx-auto">
      <input
        type="search"
        className="form-control nav-item"
        id="search"
        name="search"
        placeholder="Search by tag, e.g.#username #topic"
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      ></input>
    </form>
  );
};

export default SearchBar;
