import React, { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const handleInputChange = () => {};

  const handleKeyDown = () => [];

  return (
    <React.Fragment>
      <form>
        <div className="input-group input-group">
          <input
            type="text"
            className="form-control"
            id="search"
            name="search"
            placeholder="Search by tag, e.g.#username"
            value={search}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          ></input>
        </div>
      </form>
    </React.Fragment>
  );
};

export default SearchBar;
