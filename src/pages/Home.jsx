import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import BestSeller from "../components/BestSeller";
function Home() {
  const fetchMenu = useFetch("http://localhost:9999/menu");
  const fetchOrder = useFetch("http://localhost:9999/orders");
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {}, []);
  useEffect(() => {
    const menuCopy = [...fetchMenu.data];
    if (menuCopy.length > 0) {
      fetchOrder.data.forEach((order) => {
        order.dishes.forEach((d) => {
          let dishQuantity = menuCopy[d.id - 1].quantity;
          if (dishQuantity === undefined) {
            menuCopy[d.id - 1].quantity = d.quantity;
          } else {
            menuCopy[d.id - 1].quantity += d.quantity;
          }
        });
      });
      menuCopy.sort((a, b) => b.quantity - a.quantity);
      const topFiveSellers = menuCopy.slice(0, 5);
      setBestSellers(topFiveSellers);
    }
  }, [fetchMenu.data]);
  return (
    <div id="home-container">
      <div id="home-hero-wrapper">
        <h1>Heavenly good burgers</h1>
      </div>
      <div id="home-best-sellers-wrapper">
        <div id="home-best-sellers-label-wrapper">
          <em>Our bestsellers</em>
        </div>
        {fetchMenu.loading ? (
          <h3>Loading bestsellers...</h3>
        ) : fetchMenu.error ? (
          <h3>Error fetching bestsellers</h3>
        ) : (
          <div id="home-best-sellers">
            {bestSellers.map((d) => (
              <BestSeller key={d.id} dish={d} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
