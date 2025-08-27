import { sportygalaxyAdminApi } from "@/store/storeQuerySlice";
import { RtkqTagEnum } from "@/constants/RtkqTagEnums";

export const ApiReviewStoreSlice = sportygalaxyAdminApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<
      any,
      {
        pageIndex: number;
        pageSize: number;
        sorting: any;
        globalFilter: string | null;
        reviewStatus: any;
        isDeleted?: boolean;
        isRequestDelete?: boolean;
      }
    >({
      query: ({
        pageIndex,
        pageSize,
        sorting,
        globalFilter,
        reviewStatus,
        isDeleted,
        isRequestDelete,
      }) => {
        let params = new URLSearchParams({
          page: pageIndex, // Ensure 1-based index
          limit: pageSize,
          ...(globalFilter && { q: globalFilter }),
          ...(reviewStatus && { q: reviewStatus }),
          ...(isDeleted && { isDeleted }),
          ...(isRequestDelete && { isRequestDelete }),
          ...(sorting?.length && {
            sort: `${sorting[0].id},${sorting[0].desc ? "desc" : "asc"}`,
          }),
        });

        // console.log("params", params.toString());

        return {
          url: `/reviews?${params.toString()}`,
        };
      },
      providesTags: [RtkqTagEnum.REVIEWS],
    }),
    deactivateReview: builder.mutation<any, any>({
      query: ({ id, ...data }: any) => ({
        url: `/reviews/${id}/de-activate`,
        data,
        method: "PUT",
      }),
      invalidatesTags: [RtkqTagEnum.REVIEWS],
    }),
    reactivateReview: builder.mutation<any, any>({
      query: ({ id, ...data }: any) => ({
        url: `/reviews/${id}/re-activate`,
        data,
        method: "PUT",
      }),
      invalidatesTags: [RtkqTagEnum.REVIEWS],
    }),
  }),
  overrideExisting: false,
});