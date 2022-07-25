import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { characterDetail } from "./api/breakingBadApi";

type character = {
    char_id: number,
    name: string,
    portrayed: string,
    category: string,
    nickname: string,
    img?: string,
    isFavourite:boolean,
    occupation?:string[],
    appearance?:number[],
    birthday?: string
}

type InitialState = {
    charactersData: character[],
    favourites: character[],
    searchText: string
    singleCharacterDetails: character[]
}

type characterDetails = {
    char_id: number,
    name: string,
    portrayed: string,
    category?: string,
    nickname: string,
    img?: string,
    isFavourite:boolean
}

type singleCharacterDetails = {
    char_id: number
}

const initialState: InitialState = {
    charactersData: [],
    favourites: [{char_id: 3, name: 'abhi', portrayed:'abhishek', category:'dev', nickname:'abhi', isFavourite: true}],
    searchText: '',
    singleCharacterDetails: []
}

export const breakingBadSlice = createSlice({
    name:'breakingbad',
    initialState,
    reducers:{
        characterDataAction: (state, action: PayloadAction<character[]>) => {
            state.charactersData = action.payload.map((item) => ({...item, isFavourite: false}))
        },
        addFavourites:(state, action: PayloadAction<character>) => {
            state.charactersData = state.charactersData.map(item => item.char_id === action.payload.char_id ? ({...item, isFavourite: true}) : ({...item}))
            // state.favourites.push(action.payload)
        },
        removeFavourites:(state, action: PayloadAction<number>) => {
            state.charactersData = state.charactersData.map(item => item.char_id === action.payload ? ({...item, isFavourite:false}) : ({...item}))
        },
        setSearch:(state, action: PayloadAction<string>) => {
            state.searchText = action.payload
        },
        characterDetailAction: (state, action: PayloadAction<character[]>) => {
            state.singleCharacterDetails = action.payload
        },
        cleanCharacterDetail: (state) => {
            state.singleCharacterDetails = initialState.singleCharacterDetails
        }
    },
})

export const { characterDataAction, addFavourites, removeFavourites, setSearch, characterDetailAction, cleanCharacterDetail } = breakingBadSlice.actions;
export default breakingBadSlice.reducer;