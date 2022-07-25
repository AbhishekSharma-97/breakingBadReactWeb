import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home } from "../Home/Home";
import { favourites, search, logo } from "../../assets/index";
import Styles from "../Navbar/Navbar.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSearch } from "../../redux/reducer";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const { searchText } = useAppSelector((state) => state.characterReducer);
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ backgroundColor: "black" }}>
      <div className={Styles.container}>
        <div className={Styles.divLogo}>
          <img src={logo} />
          <Link className={Styles.link} to="/">
            <h2 style={{ color: "white" }}>The Breaking bad</h2>
          </Link>
        </div>
        <div className={Styles.divSearch}>
          {open ? (
            <div
              style={{
                border: "1px solid ",
                borderRadius: "5px",
                display: "flex",
                // flexDirection: "row",
                background: "#131313",
              }}
            >
              <input
                value={searchText}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                style={{
                  border: "none",
                  backgroundColor: "#131313",
                  color: "white",
                  height: "35px",
                  width: "15em",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "10px",
                }}
              >
                <img
                  // style={{ alignSelf: "center" }}
                  src={search}
                  onClick={() => setOpen(false)}
                />
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "10px",
              }}
            >
              <img src={search} onClick={() => setOpen(true)} />
            </div>
          )}
          <div className={Styles.favourites}>
            <Link to="/favourites">
              <img src={favourites} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
