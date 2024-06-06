import React, { useEffect, useState, useContext } from "react";
import PageLabel from "../components/PageLabel";
import FilterButton from "../components/FilterButton";
import Dish from "../components/Dish";
import useFetch from "../hooks/useFetch";
import usePost from "../hooks/usePost";
import useLocalStorage from "../hooks/useLocalStorage";
import { AuthContext } from "../contexts/AuthProvider";
import ErrorDialog from "../components/ErrorDialog";
import "../styles/pages/Menu.css";
function Menu() {
  //Get all dishes in menu
  const fetchUrl = "http://localhost:9999/menu";
  const baseUrl = "http://localhost:9999/users/";
  const [postUrl, setPostUrl] = useState("");
  const fetchMenu = useFetch(fetchUrl);
  const postHandler = usePost();
  const [menu, setMenu] = useState([]);
  const [originalMenu, setOriginalMenu] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Show all");
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState({});
  const localStorageHandler = useLocalStorage();
  const [cart, setCart] = useState([]);
  const defaultFilterOption = "Show all";
  const favoritesFilter = "My favorites";
  const authHandler = useContext(AuthContext);

  useEffect(() => {
    if (fetchMenu.data !== null) {
      setMenu(fetchMenu.data);
      setOriginalMenu(fetchMenu.data);
      let categories = [];
      fetchMenu.data.forEach((d) => {
        const category = d.category[0].toUpperCase() + d.category.slice(1);
        if (categories.includes(category) === false) {
          categories.push(category);
        }
      });
      if (authHandler.isAuthenticated) {
        categories.unshift(favoritesFilter);
      }
      categories.unshift(defaultFilterOption);
      setFilterOptions(categories);
    }
  }, [fetchMenu.data]);

  useEffect(() => {
    const getItemsInCart = async () => {
      const items = await localStorageHandler.getLocalStorage("cartItems");
      setCart(items);
    };
    const getUser = async () => {
      const user = await localStorageHandler.getLocalStorage("signedInUser");
      if (user !== null) {
        setUser(user);
        setPostUrl(baseUrl + user.id);
      }
    };
    getItemsInCart();
    getUser();
  }, []);

  useEffect(() => {
    if (postHandler.data !== null) {
      localStorageHandler.setLocalStorage("signedInUser", postHandler.data);
      setUser(postHandler.data);
    }
  }, [postHandler.data]);

  function handleFilter(e) {
    setSearchValue("");
    const filterOption = e.target.innerText;
    if (filterOption === defaultFilterOption) {
      setMenu(originalMenu);
    } else if (filterOption === favoritesFilter) {
      setMenu(user.favorites);
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
    setSearchValue(searchValue);
    if (activeFilter === defaultFilterOption) {
      foundDishes = originalMenu.filter((d) =>
        d.title.toLowerCase().includes(searchValue)
      );
    } else if (activeFilter === favoritesFilter) {
      foundDishes = user.favorites.filter((d) =>
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
  async function handleFavoriteAdd(dish) {
    const userCopy = { ...user };
    userCopy.favorites.push(dish);
    userCopy.favorites.sort((a, b) => a.id - b.id);
    if (activeFilter === favoritesFilter) {
      setMenu(userCopy.favorites);
    }
    await updateUser(userCopy);
  }
  async function handleFavoriteRemove(dishId) {
    const userCopy = { ...user };
    const remainingFavorites = userCopy.favorites.filter(
      (f) => f.id !== dishId
    );
    userCopy.favorites = remainingFavorites;
    if (activeFilter === favoritesFilter) {
      setMenu(userCopy.favorites);
    }
    await updateUser(userCopy);
  }
  async function updateUser(userObj) {
    await postHandler.saveData(postUrl, userObj, "PUT");
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
            value={searchValue}
          />
        </div>
      </div>
      {fetchMenu.loading ? (
        <div id="menu-items-wrapper">
          <p>Loading menu</p>
        </div>
      ) : fetchMenu.error ? (
        <ErrorDialog
          errorText={fetchMenu.error}
          action="fetching menu"
          url={fetchUrl}
        />
      ) : (
        <div id="menu-items-wrapper">
          {menu.length > 0 ? (
            menu.map((d) => (
              <Dish
                key={d.id}
                dish={d}
                cart={cart}
                favorite={
                  authHandler.isAuthenticated
                    ? user.favorites.some((f) => f.id === d.id)
                      ? true
                      : false
                    : null
                }
                onFavoriteRemove={handleFavoriteRemove}
                onFavoriteAdd={handleFavoriteAdd}
              />
            ))
          ) : searchValue !== "" ? (
            <p>No dishes in current filter matched the search criteria</p>
          ) : (
            <p>No dishes in current filter</p>
          )}
        </div>
      )}
      <>
        {postHandler.error !== "" ? (
          <ErrorDialog
            action="saving favorites"
            errorText={postHandler.error}
            infoText="You can continue with your order."
          />
        ) : (
          ""
        )}
      </>
    </div>
  );
}

export default Menu;
