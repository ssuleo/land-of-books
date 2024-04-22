import React, { createContext, useContext, useState } from 'react';

const NavbarContext = createContext();

export const useNavbar = () => useContext(NavbarContext);

export const NavbarProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  const login = (userData) => {
    setUser(userData); 
  };

  const logout = () => {
    setUser(null); 
  };

  return (
    <NavbarContext.Provider value={{ user, login, logout }}>
      {children}
    </NavbarContext.Provider>
  );
};