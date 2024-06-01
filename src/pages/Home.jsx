import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import BestSeller from "../components/BestSeller";
import ErrorDialog from "../components/ErrorDialog";
function Home() {
  const fetchUrl = "http://localhost:9999/orders";
  const fetchOrder = useFetch(fetchUrl);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const ordersWithAccumulatedQuantity = [];
    if (fetchOrder.data.length > 0) {
      fetchOrder.data.forEach((order) => {
        order.dishes.forEach((dish) => {
          let foundDish = ordersWithAccumulatedQuantity.find(
            (d) => d.id === dish.id
          );
          if (foundDish === undefined) {
            ordersWithAccumulatedQuantity.push(dish);
          } else {
            foundDish.quantity += dish.quantity;
          }
        });
      });
      ordersWithAccumulatedQuantity.sort((a, b) => b.quantity - a.quantity);
      const topFiveSellers = ordersWithAccumulatedQuantity.slice(0, 5);
      setBestSellers(topFiveSellers);
    }
  }, [fetchOrder.data]);

  return (
    <div id="home-container">
      <div id="home-hero-wrapper">
        <h1>Heavenly good burgers</h1>
      </div>
      <div id="home-best-sellers-wrapper">
        <div id="home-best-sellers-label-wrapper">
          <em>Our bestsellers</em>
        </div>
        {fetchOrder.loading ? (
          <h3>Loading bestsellers...</h3>
        ) : fetchOrder.error ? (
          <ErrorDialog
            errorText={fetchOrder.error}
            action="fetching bestsellers"
            url={fetchUrl}
          ></ErrorDialog>
        ) : (
          <div id="home-best-sellers">
            {bestSellers.map((d) => (
              <div className="best-seller" key={d.id}>
                <BestSeller dish={d} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
