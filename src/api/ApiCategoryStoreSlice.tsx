import { sportygalaxyAdminApi } from "@/store/storeQuerySlice";
import { RtkqTagEnum } from "@/constants/RtkqTagEnums";

export const ApiCategoryStoreSlice = sportygalaxyAdminApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategorys: builder.query<any, void>({
      query: () => ({
        url: "/products/category",
        method: "GET",
      }),
      providesTags: [RtkqTagEnum.PRODUCTS, RtkqTagEnum.CATEGORIES],
    }),
    getCategoryInfo: builder.query<any, any>({
      query: ({ id }: any) => ({
        url: `/products/category/${id}`,
        method: "GET",
      }),
      providesTags: [RtkqTagEnum.PRODUCTS, RtkqTagEnum.CATEGORIES],
    }),
    createCategory: builder.mutation<any, any>({
      query: ({ ...data }: any) => ({
        url: "/products/category",
        data,
        method: "POST",
      }),
      invalidatesTags: [RtkqTagEnum.PRODUCTS, RtkqTagEnum.CATEGORIES],
    }),
    updateCategory: builder.mutation<any, any>({
      query: ({ ...data }: any) => ({
        url: "/products/category",
        data,
        method: "PUT",
      }),
      invalidatesTags: [RtkqTagEnum.PRODUCTS, RtkqTagEnum.CATEGORIES],
    }),
    deleteCategory: builder.mutation<any, any>({
      query: ({ ...data }: any) => ({
        url: "/products/category",
        data,
        method: "DELETE",
      }),
      onQueryStarted: async ({ queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {}
      },
      invalidatesTags: [RtkqTagEnum.PRODUCTS, RtkqTagEnum.CATEGORIES],
    }),
  }),
  overrideExisting: false,
});
