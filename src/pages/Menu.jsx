import React, { useEffect, useState } from "react";
import PageLabel from "../components/PageLabel";
import FilterButton from "../components/FilterButton";
import Dish from "../components/Dish";
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";
import Error from "../components/Error";
function Menu() {
  //Get all dishes in menu
  const fetchUrl = "http://localhost:9999/menu";
  const fetchMenu = useFetch(fetchUrl);
  const [menu, setMenu] = useState([]);
  const [originalMenu, setOriginalMenu] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Show all");
  const localStorageHandler = useLocalStorage();
  const [cart, setCart] = useState([]);
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

  useEffect(() => {
    const getItemsInCart = async () => {
      const items = await localStorageHandler.getLocalStorage("cartItems");
      setCart(items);
    };
    getItemsInCart();
  }, []);

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
  function handleSearch(e) {
    let foundDishes = [];
    const searchValue = e.target.value.toLowerCase();
    if (activeFilter === defaultFilterOption) {
      foundDishes = originalMenu.filter((d) =>
        d.title.toLowerCase().includes(searchValue)
      );
    } else {
      foundDishes = originalMenu.filter(
        (d) =>
          d.title.toLowerCase().includes(searchValue) &&
          d.category === activeFilter.toLowerCase()
      );
    }
    setMenu(foundDishes);
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
            onChange={handleSearch}
          />
        </div>
      </div>
      {fetchMenu.loading ? (
        <div id="menu-items-wrapper">
          <p>Loading menu</p>
        </div>
      ) : fetchMenu.error ? (
        <Error
          errorText={fetchMenu.error}
          action="fetching menu"
          url={fetchUrl}
        />
      ) : (
        <div id="menu-items-wrapper">
          {menu.map((d) => (
            <Dish key={d.id} dish={d} cart={cart} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
