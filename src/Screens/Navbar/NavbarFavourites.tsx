import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home } from "../Home/Home";
import { favourites, search, logo, back } from "../../assets/index";
import Styles from "../Navbar/Navbar.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSearch } from "../../redux/reducer";
import "../../fonts/fonts.module.css";

export const NavbarFavourites = () => {
  const dispatch = useAppDispatch();
  const { searchText } = useAppSelector((state) => state.characterReducer);
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ backgroundColor: "black" }}>
      <div className={Styles.container}>
        <div className={Styles.divLogo}>
          <Link className={Styles.link} to="/">
            <img
              style={{ margin: "20px" }}
              className={Styles.back_img}
              src={back}
            />
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo} />
          <Link className={Styles.link} to="/">
            <h4 style={{ color: "white" }}>The Breaking bad</h4>
          </Link>
        </div>
        <div className={Styles.divSearch}>
          <div className={Styles.favourites}>
            <label style={{ color: "#18CA75", fontFamily: "Roboto-Regular" }}>
              Favourites
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};
