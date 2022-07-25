import React, { useEffect } from "react";
import {
  favourites as favouritesIcon,
  favouritesUnselected,
} from "../../assets";
import Styles from "./Card.module.css";
import "../../fonts/fonts.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addFavourites, removeFavourites } from "../../redux/reducer";
import { useNavigate } from "react-router-dom";
// import { favourites as favouritesIcon } from "../../assets/index";

interface Card {
  char_id: number;
  img?: string;
  name: string;
  nickname: string;
  portrayed: string;
  category: string;
  isFavourite: boolean;
}

const Card: React.FC<Card> = (props) => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const addHandleFavourites = (data: Card) => {
    dispatch(addFavourites(data));
  };

  const removeHandleFavourites = (data: number) => {
    dispatch(removeFavourites(data));
  };

  return (
    <div className={Styles.card}>
      <img src={props.img} className={Styles.card_img} />
      <div
        onClick={() =>
          navigate("CharacterDetails", { state: { char_id: props.char_id } })
        }
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <h2 className={Styles.card_title}>{props.name}</h2>
        <p className={Styles.card_subtitle}>{props.nickname}</p>
        <div className={Styles.portrayed}>
          <h5 style={{ fontFamily: "Roboto-Regular", color: "green" }}>
            Portrayed
          </h5>
          <h5
            className="portrayed"
            style={{
              color: "white",
              paddingLeft: 10,
              fontFamily: "Roboto-Regular",
            }}
          >
            {props.portrayed}
          </h5>
        </div>
      </div>
      <div className={Styles.favourite_select}>
        {props.isFavourite ? (
          <img
            onClick={() => removeHandleFavourites(props.char_id)}
            src={favouritesIcon}
            height={30}
          />
        ) : (
          <img
            onClick={() => addHandleFavourites(props)}
            src={favouritesUnselected}
            height={30}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
