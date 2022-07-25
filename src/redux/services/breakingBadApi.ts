import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character } from '../../models/character.model'

export const breakingBadApi = createApi({
    reducerPath: 'breakingBadApi',
    baseQuery: fetchBaseQuery({ baseUrl : 'https://www.breakingbadapi.com/api/'}),
    endpoints: (builder) => ({
        characters: builder.query<Character[], void>({
            query: () => '/characters'
        })
    })
})

export const { useCharactersQuery } = breakingBadApi;