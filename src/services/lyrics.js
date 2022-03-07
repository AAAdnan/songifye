import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const lyricsApi = createApi({
    reducerPath: 'lyricsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.lyrics.ovh/suggest/' }),
    endpoints: (builder) => ({
      getLyricsByArtist: builder.query({
        query: (search) => `/${search}`,
      }),
    }),
  })

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLyricsByArtistQuery } = lyricsApi

