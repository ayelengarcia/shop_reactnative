import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realtimeDataBase";

export const shopApi = createApi({
  reducerPath: "ShopApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["profileImageGet"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `categories.json`,
    }),
    getProductsByCategory: builder.query({
      query: (category) =>
        `products.json?orderBy="category"&equalTo="${category}"`,
      transformResponse: (res) => {
        const transformedResponse = Object.values(res);
        return transformedResponse;
      },
    }),
    getProductById: builder.query({
      query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
      transformResponse: (res) => {
        const transformedResponse = Object.values(res);
        if (transformedResponse.length) return transformedResponse[0];
      },
    }),
    postOder: builder.mutation({
      query: ({ ...order }) => ({
        url: "order.json",
        method: "POST",
        body: order,
      }),
    }),
    getImageUser: builder.query({
      query: (localId) => `profileImages/${localId}.json`,
      providesTags: ["profileImageGet"],
    }),
    postImageUser: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profileImages/${localId}.json`,
        method: "PUT",
        body: {
          image: image,
        },
      }),
      invalidatesTags: ["profileImageGet"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  usePostOderMutation,
  useGetImageUserQuery,
  usePostImageUserMutation,
} = shopApi;