import React, { act, useEffect, useState } from "react";
import PageLabel from "../components/PageLabel";
import FilterButton from "../components/FilterButton";
import Dish from "../components/Dish";
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";
function Menu() {
  //Get all dishes in menu
  const fetchMenu = useFetch("http://localhost:9999/menu");
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

  async function handleAddToCart(dish, e) {
    // setDishClicked(dish);
    //Get cart items from local storage
    const itemsInCart = await localStorageHandler.getLocalStorage("cartItems");
    //Check if cart is new (null) and create it if so.
    if (itemsInCart === null) {
      const cart = [];
      dish.quantity = 1;
      cart.push(dish);
      //Set item in local storage
      await localStorageHandler.setLocalStorage("cartItems", cart);
      setCart(cart);
    }
    //If cart is not new, we need to check if the dish already exists in the cart to set the correct quantity.
    else {
      const foundItemIndex = itemsInCart.findIndex((i) => i.id === dish.id);
      if (foundItemIndex === -1) {
        dish.quantity = 1;
        itemsInCart.push(dish);
      } else {
        itemsInCart[foundItemIndex].quantity += 1;
      }
      await localStorageHandler.setLocalStorage("cartItems", itemsInCart);
      setCart(itemsInCart);
    }
    // e.target.innerText = `${dish.title} was added to cart!`;
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
        <div id="menu-items-wrapper">
          <p>
            Error An error occurred fetching the menu. Error code:{" "}
            {fetchMenu.error}. Please contact the support department.
          </p>
        </div>
      ) : (
        <div id="menu-items-wrapper">
          {menu.map((d) => (
            <Dish
              key={d.id}
              dish={d}
              onCartAdd={handleAddToCart}
              isInCart={cart.find((i) => i.id === d.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
