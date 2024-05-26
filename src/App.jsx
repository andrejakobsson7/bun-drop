import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Signin" element={<SignIn />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Menu" element={<Menu />}></Route>
          <Route path="/Cart" element={<Cart />}></Route>
          <Route path="/Payment" element={<Payment />}></Route>
          <Route path="/Confirmation" element={<Confirmation />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
