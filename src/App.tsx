import React from "react";
import { Routes, Route } from "react-router-dom";
import { CharacterDetails } from "./Screens/CharacterDetail/CharacterDetails";
import Favourites from "./Screens/Favourites/Favourites";
import { Home } from "./Screens/Home/Home";
import { Navbar } from "./Screens/Navbar/Navbar";
import { NavbarFavourites } from "./Screens/Navbar/NavbarFavourites";
import NoMatch from "./Screens/NoMatch";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="favourites"
          element={
            <>
              <NavbarFavourites />
              <Favourites />
            </>
          }
        />
        <Route path="CharacterDetails" element={<CharacterDetails />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
