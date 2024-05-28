import React from "react";
function useLocalStorage() {
  async function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  async function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  return { setLocalStorage, getLocalStorage };
}

export default useLocalStorage;
