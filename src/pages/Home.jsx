import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import BestSeller from "../components/BestSeller";
function Home() {
  const fetchOrder = useFetch("http://localhost:9999/orders");
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
          <h3>Error fetching bestsellers. Contact support department</h3>
        ) : (
          <div id="home-best-sellers">
            {bestSellers.map((d) => (
              <div className="best-seller">
                <BestSeller key={d.id} dish={d} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
