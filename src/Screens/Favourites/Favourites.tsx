import React, { useEffect } from "react";
import Card from "../../Components/Card/Card.component";
import { characterApi } from "../../redux/api/breakingBadApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { characterDataAction } from "../../redux/reducer";
import { useCharactersQuery } from "../../redux/services/breakingBadApi";
import Styles from "../Home/Home.module.css";

const Favourites = () => {
  const { charactersData, favourites, searchText } = useAppSelector(
    (state) => state.characterReducer
  );
  const dispatch = useAppDispatch();

  // const getCharacter = async () => {
  //   const characterResponse = await fetch(characterApi);
  //   const res = await characterResponse.json();
  //   dispatch(characterDataAction(res));
  // };

  // useEffect(() => {
  //   getCharacter();
  // }, []);

  return (
    <div style={{ backgroundColor: "black" }}>
      {
        <div className={Styles.body}>
          {charactersData
            .filter(
              (item) => item.name.includes(searchText) && item.isFavourite
            )
            ?.map((item) => (
              <Card
                img={item.img}
                char_id={item.char_id}
                name={item.name}
                nickname={item.nickname}
                portrayed={item.portrayed}
                category={item.category}
                isFavourite={item.isFavourite}
              />
            ))}
        </div>
      }
      {/*************** using rtk query ********/}
      {/* {isLoading && <h2>...LOADING</h2>}
      {isSuccess && (
        <div>
          {data?.map((item) => (
            <div>
              <h4>{item.name}</h4>
              <h4>{item.nickname}</h4>
            </div>
          ))}
        </div>
      )}
      {isError && <h2>Something went wrong</h2>} */}
    </div>
  );
};

export default Favourites;
