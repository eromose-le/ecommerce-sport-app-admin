import { sportygalaxyAdminApi } from "@/store/storeQuerySlice";
import { RtkqTagEnum } from "@/constants/RtkqTagEnums";

export const ApiTypeStoreSlice = sportygalaxyAdminApi.injectEndpoints({
  endpoints: (builder) => ({
    getTypes: builder.query<any, void>({
      query: () => ({
        url: "/products/type",
        method: "GET",
      }),
      providesTags: [RtkqTagEnum.PRODUCTS, RtkqTagEnum.TYPES],
    }),
    getTypeInfo: builder.query<any, any>({
      query: ({ id }: any) => ({
        url: `/products/type/${id}`,
        method: "GET",
      }),
      providesTags: [RtkqTagEnum.PRODUCTS, RtkqTagEnum.TYPES],
    }),
    createType: builder.mutation<any, any>({
      query: ({ ...data }: any) => ({
        url: "/products/type",
        data,
        method: "POST",
      }),
      invalidatesTags: [RtkqTagEnum.PRODUCTS, RtkqTagEnum.TYPES],
    }),
    updateType: builder.mutation<any, any>({
      query: ({ ...data }: any) => ({
        url: "/products/type",
        data,
        method: "PUT",
      }),
      invalidatesTags: [RtkqTagEnum.PRODUCTS, RtkqTagEnum.TYPES],
    }),
    deleteType: builder.mutation<any, any>({
      query: ({ ...data }: any) => ({
        url: "/products/type",
        data,
        method: "DELETE",
      }),
      onQueryStarted: async ({ queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {}
      },
      invalidatesTags: [RtkqTagEnum.PRODUCTS, RtkqTagEnum.TYPES],
    }),
  }),
  overrideExisting: false,
});
