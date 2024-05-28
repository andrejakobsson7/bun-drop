import React from "react";
function FilterButton(props) {
  return (
    <button
      onClick={props.onFilter}
      className={`filter-btn ${props.active ? "active-filter" : ""}`}
    >
      {props.name}
    </button>
  );
}

export default FilterButton;
