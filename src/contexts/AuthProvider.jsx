import React, { createContext, useEffect, useState, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const localStorageHandler = useLocalStorage();

  useEffect(() => {
    const fetchSignedInUser = async () => {
      const signedInUser = await localStorageHandler.getLocalStorage(
        "signedInUser"
      );
      if (signedInUser !== null) {
        setIsAuthenticated(true);
      }
    };
    fetchSignedInUser();
  }, []);

  function signIn(user) {
    setIsAuthenticated(true);
    localStorageHandler.setLocalStorage("signedInUser", user);
  }

  function signOut() {
    setIsAuthenticated(false);
    localStorageHandler.removeFromLocalStorage("signedInUser");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
