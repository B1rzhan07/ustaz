// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../services/AuthService'


// Define a service using a base URL and expected endpoints
export const secretaryApi = createApi({
  reducerPath: 'secretaryApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL  }),
  endpoints: (builder) => ({
    getSecretaryGradeById: builder.query<any, number>({  
      query: (defenceId) => ({
        url: `/secretary/${defenceId}/grade`,
        headers: {
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
          },
        method: 'GET',
      }),
    }),
    getFinalists: builder.query<any, void>({
        query: () => ({
            url: `/secretary/getFinalists`,
            headers: {
                Authorization:
                "Bearer " +
                JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
            },
            method: 'GET',
        }),
        }),
  }),

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSecretaryGradeByIdQuery, useGetFinalistsQuery } = secretaryApi