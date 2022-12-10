import React from "react";
import $ from "jquery";

const Search = () => {
  $("#button").click(function () {
    $("#search").toggle();
  });

  return (
    <div className="search-box">
      <img
        className="img-fluid"
        id="button"
        src="/images/loupe.png"
        alt="search"
      />
      <input
        type="search"
        id="search"
        placeholder="search for food / grocery item"
      />
    </div>
  );
};

export default Search;
