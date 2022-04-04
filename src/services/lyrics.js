import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const lyricsApi = createApi({
    reducerPath: 'lyricsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.lyrics.ovh/' }),
    endpoints: (builder) => ({
      getSongsByArtist: builder.query({
        query: (search) => `/suggest/${search}`,
      }),
      getLyricsByArtist: builder.query({
          query: (arg) => {
              const { artist, songTitle } = arg;
              return {
                  url: `v1/${artist}/${songTitle}`,
              }
          }
      })
    }),
  })

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSongsByArtistQuery, useGetLyricsByArtistQuery } = lyricsApi


// const lyricsApi = createApi({
//     reducerPath: 'lyricsApi',
//     baseQuery: fetchBaseQuery({ baseUrl }),
//     endpoints: (builder) => ({
//       getSongsByArtist: builder.query({
//         query: (search) => `suggest/${search}`,
//       }),
//       getLyricsByArtist: builder.query({
//           query: (arg) => {
//               const { artist, songTitle } = arg;
//               return {
//                   url: 'v1',
//                   params: { artist, songTitle}
//               }
//           }
//       })
//     })
// })


