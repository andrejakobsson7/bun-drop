import React from "react";
import PageLabel from "../components/PageLabel";
import FilterButton from "../components/FilterButton";
import Dish from "../components/Dish";
function Menu() {
  return (
    <div id="menu-container">
      <div id="menu-label-wrapper">
        <PageLabel label="MENU" />
      </div>
      <div id="menu-filters-wrapper">
        <label>Filters</label>
        <div id="menu-filters">
          <FilterButton name="Show all" />
          <FilterButton name="Burgers" />
          <FilterButton name="Sides" />
          <FilterButton name="Drinks" />
          <FilterButton name="Desserts" />
        </div>
      </div>
      <div id="menu-search-wrapper">
        <label>Search</label>
        <div id="menu-search">
          <input
            id="menu-search-input"
            type="search"
            placeholder="Search dishes"
          />
        </div>
      </div>
      <div id="menu-items-wrapper">
        <Dish />
        <Dish />
        <Dish />
        <Dish />
        <Dish />
      </div>
    </div>
  );
}

export default Menu;
