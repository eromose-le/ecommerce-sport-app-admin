import { sportygalaxyAdminApi } from "@/store/storeQuerySlice";
import { RtkqTagEnum } from "@/constants/RtkqTagEnums";

export const ApiProductStoreSlice = sportygalaxyAdminApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      any,
      {
        pageIndex: number;
        pageSize: number;
        sorting: any;
        globalFilter: string | null;
        productStatus: string | null;
        isDeleted?: boolean;
        isRequestDelete?: boolean;
      }
    >({
      query: ({
        pageIndex,
        pageSize,
        sorting,
        globalFilter,
        productStatus,
        isDeleted,
        isRequestDelete,
      }) => {
        let params = new URLSearchParams({
          page: (pageIndex + 1).toString(), // Ensure 1-based index
          limit: pageSize,
          ...(globalFilter && { q: globalFilter }),
          ...(productStatus && { q: productStatus }),
          ...(isDeleted && { isDeleted }),
          ...(isRequestDelete && { isRequestDelete }),
          ...(sorting?.length && {
            sort: `${sorting[0].id},${sorting[0].desc ? "desc" : "asc"}`,
          }),
        });

        // console.log("params", params.toString());

        return {
          url: `/admin-products?${params.toString()}`,
        };
      },
      providesTags: [RtkqTagEnum.PRODUCTS],
    }),
    getProductInfo: builder.query<any, any>({
      query: ({ id }: any) => ({
        url: `/admin-products/${id}`,
        method: "GET",
      }),
      providesTags: [RtkqTagEnum.PRODUCTS],
    }),
    createProduct: builder.mutation<any, any>({
      query: ({ ...data }: any) => ({
        url: "/products",
        data,
        method: "POST",
      }),
      invalidatesTags: [RtkqTagEnum.PRODUCTS],
    }),
    updateProduct: builder.mutation<any, any>({
      query: ({ id, ...data }: any) => ({
        url: `/products/${id}`,
        data,
        method: "PUT",
      }),
      invalidatesTags: [RtkqTagEnum.PRODUCTS],
    }),
    deactivateProduct: builder.mutation<any, any>({
      query: ({ id, ...data }: any) => ({
        url: `/admin-products/${id}/de-activate`,
        data,
        method: "PUT",
      }),
      invalidatesTags: [RtkqTagEnum.PRODUCTS],
    }),
    reactivateProduct: builder.mutation<any, any>({
      query: ({ id, ...data }: any) => ({
        url: `/admin-products/${id}/re-activate`,
        data,
        method: "PUT",
      }),
      invalidatesTags: [RtkqTagEnum.PRODUCTS],
    }),
  }),
  overrideExisting: false,
});

//  uploadPhoto: builder.mutation<UploadPhotoResponse, UploadPhotoRequest>({
//       query: (data: UploadPhotoRequest) => ({
//         url: "/api/v2/upload/file",
//         data,
//         method: "POST",
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }),
//       invalidatesTags: [RtkqTagEnum.USERS],
//     }),
