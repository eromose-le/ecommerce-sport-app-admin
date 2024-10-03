import { sportygalaxyAdminApi } from "@/store/storeQuerySlice";
import { RtkqTagEnum } from "@/constants/RtkqTagEnums";

export const ApiSubcategoryStoreSlice = sportygalaxyAdminApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubcategorys: builder.query<any, void>({
      query: () => ({
        url: "/products/subcategory",
        method: "GET",
      }),
      providesTags: [RtkqTagEnum.PRODUCTS, RtkqTagEnum.SUBCATEGORIES],
    }),
    getSubcategoryInfo: builder.query<any, any>({
      query: ({ id }: any) => ({
        url: `/products/subcategory/${id}`,
        method: "GET",
      }),
      providesTags: [RtkqTagEnum.PRODUCTS, RtkqTagEnum.SUBCATEGORIES],
    }),
    createSubcategory: builder.mutation<any, any>({
      query: ({ ...data }: any) => ({
        url: "/products/subcategory",
        data,
        method: "POST",
      }),
      invalidatesTags: [RtkqTagEnum.PRODUCTS, RtkqTagEnum.SUBCATEGORIES],
    }),
    updateSubcategory: builder.mutation<any, any>({
      query: ({ ...data }: any) => ({
        url: "/products/subcategory",
        data,
        method: "PUT",
      }),
      invalidatesTags: [RtkqTagEnum.PRODUCTS, RtkqTagEnum.SUBCATEGORIES],
    }),
    deleteSubcategory: builder.mutation<any, any>({
      query: ({ ...data }: any) => ({
        url: "/products/subcategory",
        data,
        method: "DELETE",
      }),
      onQueryStarted: async ({ queryFulfilled }: any) => {
        try {
          await queryFulfilled;
        } catch (error) {}
      },
      invalidatesTags: [RtkqTagEnum.PRODUCTS, RtkqTagEnum.SUBCATEGORIES],
    }),
  }),
  overrideExisting: false,
});
