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
          ...(globalFilter && { search: globalFilter }),
          ...(productStatus && { search: productStatus }),
          ...(isDeleted && { isDeleted }),
          ...(isRequestDelete && { isRequestDelete }),
          ...(sorting?.length && {
            sort: `${sorting[0].id},${sorting[0].desc ? "desc" : "asc"}`,
          }),
        });

        // console.log("params", params.toString());

        return {
          url: `/products?${params.toString()}`,
        };
      },
      providesTags: [RtkqTagEnum.PRODUCTS],
    }),
    getProductInfo: builder.query<any, any>({
      query: ({ id }: any) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: [RtkqTagEnum.PRODUCTS],
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
