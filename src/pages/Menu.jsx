import React, { useEffect, useState } from "react";
import PageLabel from "../components/PageLabel";
import FilterButton from "../components/FilterButton";
import Dish from "../components/Dish";
import useFetch from "../hooks/useFetch";
function Menu() {
  //Get all dishes in menu
  const fetchMenu = useFetch("http://localhost:9999/menu");
  const [menu, setMenu] = useState([]);
  const [originalMenu, setOriginalMenu] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Show all");
  const defaultFilterOption = "Show all";

  useEffect(() => {
    setMenu(fetchMenu.data);
    setOriginalMenu(fetchMenu.data);
    let categories = [];
    fetchMenu.data.forEach((d) => {
      const category = d.category[0].toUpperCase() + d.category.slice(1);
      if (categories.includes(category) === false) {
        categories.push(category);
      }
    });
    categories.unshift(defaultFilterOption);
    setFilterOptions(categories);
  }, [fetchMenu.data]);

  function handleFilter(e) {
    const filterOption = e.target.innerText;
    if (filterOption === defaultFilterOption) {
      setMenu(originalMenu);
    } else {
      const filteredMenu = originalMenu.filter(
        (dish) => dish.category === filterOption.toLowerCase()
      );
      setMenu(filteredMenu);
    }
    setActiveFilter(filterOption);
  }
  return (
    <div id="menu-container">
      <div id="menu-label-wrapper">
        <PageLabel label="MENU" />
      </div>
      <div id="menu-filters-wrapper">
        <label>Filters</label>
        <div id="menu-filters">
          {filterOptions.map((f) => (
            <FilterButton
              key={f}
              name={f}
              active={activeFilter === f}
              onFilter={handleFilter}
            />
          ))}
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
      {fetchMenu.loading ? (
        <p>Loading menu</p>
      ) : fetchMenu.error ? (
        <p>Error {fetchMenu.error} fetching menu</p>
      ) : (
        <div id="menu-items-wrapper">
          {menu.map((d) => (
            <Dish key={d.id} dish={d} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
