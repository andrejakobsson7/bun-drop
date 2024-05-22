import React from "react";
function Home() {
  return (
    <div id="home-container">
      <div id="home-hero-wrapper">
        <h1>Heavenly good burgers</h1>
      </div>
      <div id="home-best-sellers-wrapper">
        <div id="home-best-sellers-label-wrapper">
          <em>Our bestsellers</em>
        </div>
        <div id="home-best-sellers">
          <div className="favorite"></div>
          <div className="favorite"></div>
          <div className="favorite"></div>
          <div className="favorite"></div>
          <div className="favorite"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
