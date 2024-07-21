import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realtimeDataBase";

export const shopApi = createApi({
  reducerPath: "ShopApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["profileImageGet", "profileLocationGet"],

  endpoints: (builder) => ({
    //METODOS COLLECCION CATEGORIAS
    getCategories: builder.query({
      query: () => `categories.json`,
    }),

    //METODOS COLLECCION PRODUCTOS
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

    //METODOS COLLECCION ORDERS
    //Agregar get order
    postOder: builder.mutation({
      query: ({ ...order }) => ({
        url: "orders.json",
        method: "POST",
        body: order,
      }),
    }),
    getOderByUser: builder.query({
      query: (user) => `orders.json?orderBy="user"&equalTo="${user}"`,
      transformResponse: (res) => {
        const transformedResponse = Object.values(res);
        return transformedResponse;
      },
    }),

    //METODOS IMAGEN PERFIL
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

    //METODOS UBICACION PERFIL
    getLocationUser: builder.query({
      query: (localId) => `profileLocation/${localId}.json`,
      providesTags: ["profileLocationGet"],
    }),
    postLocationUser: builder.mutation({
      query: ({ location, localId }) => ({
        url: `profileLocation/${localId}.json`,
        method: "PUT",
        body: {
          latitude: location.latitude,
          longitud: location.longitud,
          address: location.address,
          updatedAt: location.updatedAt,
        },
      }),
      invalidatesTags: ["profileLocationGet"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  usePostOderMutation,
  useGetOderByUserQuery,
  useGetImageUserQuery,
  usePostImageUserMutation,
  useGetLocationUserQuery,
  usePostLocationUserMutation,
} = shopApi;