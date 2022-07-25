import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { characterDetail } from "../../redux/api/breakingBadApi";
import { useAppSelector } from "../../redux/hooks";
import {
  characterDetailAction,
  cleanCharacterDetail,
} from "../../redux/reducer";
import Styles from "./CharacterDetails.module.css";
import "../../fonts/fonts.module.css";
import { back, birthday } from "../../assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";

interface LocationState {
  char_id: number;
}
type character = {
  char_id: number;
  name: string;
  portrayed: string;
  category: string;
  nickname: string;
  img?: string;
  isFavourite: boolean;
  occupation?: string[];
  appearance?: number[];
  birthday?: string;
};
export const CharacterDetails = () => {
  let navigate = useNavigate();
  const [otherChar, setOtherChar] = useState<character[]>([]);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { char_id } = state as LocationState;
  const { singleCharacterDetails, charactersData } = useAppSelector(
    (state) => state.characterReducer
  );

  const getCharacter = async () => {
    dispatch(cleanCharacterDetail());
    const characterResponse = await fetch(characterDetail + `/${char_id}`);
    const res = await characterResponse.json();
    dispatch(characterDetailAction(res));
    return res;
  };
  useEffect(() => {
    getCharacter();
  }, []);

  const convertBirthday = () => {
    const birthday = moment(singleCharacterDetails[0].birthday).format(
      "DD-MMM-YYYY"
    );
    return birthday;
  };

  const findOtherCharacters = useMemo(() => {
    let categoryArray = [];
    if (singleCharacterDetails.length > 0) {
      console.log("In");
      for (let index = 0; index < charactersData.length; index++) {
        if (
          charactersData[index].category ===
            singleCharacterDetails[0].category &&
          charactersData[index].char_id != singleCharacterDetails[0].char_id
        ) {
          if (categoryArray.length === 3) {
            break;
          }
          categoryArray.push(charactersData[index]);
        } else if (
          charactersData[index].category !=
            singleCharacterDetails[0].category &&
          index === charactersData.length - 1
        ) {
          break;
        }
      }
      return categoryArray;
    }
  }, singleCharacterDetails);

  return (
    <div className={Styles.container}>
      {singleCharacterDetails.length > 0 && (
        <div className={Styles.row_div}>
          <img className={Styles.image} src={singleCharacterDetails[0].img} />
          <img
            className={Styles.back_img}
            src={back}
            onClick={() => navigate(-1)}
          />
          <div className={Styles.image_first_div}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                className={Styles.small_img}
                src={singleCharacterDetails[0].img}
              />
              <label
                className={Styles.left_div_name}
                style={{
                  color: "white",
                  fontFamily: "Roboto-Regular",
                  fontSize: "2vw",
                  fontWeight: "700",
                }}
              >
                {singleCharacterDetails[0].name}
              </label>
              <label
                style={{
                  color: "white",
                  fontFamily: "Roboto-Regular",
                  fontSize: "1vw",
                }}
              >
                {singleCharacterDetails[0].nickname}
              </label>
            </div>
          </div>
          <div className={Styles.detail_container_div}>
            <div className={Styles.detail_div}>
              <div className={Styles.detail_container_sub_div}>
                <label
                  style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: "1.2vw",
                    color: "#18CA75",
                  }}
                >
                  Portrayed
                </label>
                <p
                  style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: "1vw",
                    color: "white",
                  }}
                  className={Styles.a}
                >
                  {singleCharacterDetails[0].portrayed}
                </p>
                <label
                  style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: "1.2vw",
                    color: "#18CA75",
                    marginTop: "30px",
                  }}
                >
                  Occupation
                </label>

                {singleCharacterDetails[0].occupation?.map((item) => (
                  <label
                    style={{
                      fontFamily: "Roboto-Regular",
                      fontSize: "1vw",
                      color: "white",
                      marginTop: "10px",
                    }}
                  >
                    {item}
                  </label>
                ))}
                <label
                  style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: "1.2vw",
                    color: "#18CA75",
                    marginTop: "30px",
                  }}
                >
                  Appeared in
                </label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "10px",
                  }}
                >
                  {singleCharacterDetails[0].appearance?.map((item) => (
                    <div className={Styles.appearance_div}>
                      <label
                        style={{
                          fontFamily: "Roboto-Regular",
                          fontSize: "1vw",
                          color: "white",
                          fontWeight: "300",
                          // marginTop: "10px",
                        }}
                      >
                        Season {item}
                      </label>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label
                    style={{
                      fontFamily: "Roboto-Regular",
                      fontSize: "1.2vw",
                      color: "white",
                      marginTop: "80px",
                    }}
                  >
                    Other Characters
                  </label>
                  <div
                    style={{
                      paddingTop: "10px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    {findOtherCharacters?.map((item) => (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <img className={Styles.other_char_img} src={item.img} />
                        <label
                          style={{
                            color: "white",
                            paddingTop: "10px",
                            fontFamily: "Roboto-Regular",
                            fontWeight: "Bold",
                          }}
                        >
                          {item.name}
                        </label>
                        <label
                          style={{
                            color: "white",
                            paddingTop: "5px",
                            fontFamily: "Roboto-Regular",
                            fontWeight: "300",
                          }}
                        >
                          {item.nickname}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={Styles.birthday_div}>
            <img className={Styles.birthday_logo} src={birthday} />
            <label
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: "1vw",
                color: "white",
                paddingLeft: "10px",
              }}
            >
              {convertBirthday()}
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
