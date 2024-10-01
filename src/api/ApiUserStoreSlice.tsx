import { sportygalaxyAdminApi } from "@/store/storeQuerySlice";
import {
  type GetUserResponse,
  type GetMeResponse,
  type GetUserInfoRequest,
  type GetUserInfoResponse,
} from "@/types/user";
import { RtkqTagEnum } from "@/constants/RtkqTagEnums";

export const ApiUserStoreSlice = sportygalaxyAdminApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<GetMeResponse, void>({
      query: () => ({
        url: "/api/v2/users/info",
        method: "GET",
      }),
      providesTags: [RtkqTagEnum.USERS, RtkqTagEnum.AUTH],
    }),
    getUserInfo: builder.query<GetUserInfoResponse, GetUserInfoRequest>({
      query: ({ id }: GetUserInfoRequest) => ({
        url: `/auth/users/${id}`,
        method: "GET",
      }),
      providesTags: [RtkqTagEnum.USERS],
    }),
    getUser: builder.query<GetUserResponse, { id: string | undefined }>({
      query: ({ id }) => ({
        url: `/api/v2/users/lookup/${id}`,
      }),
      providesTags: [RtkqTagEnum.USERS],
    }),
  }),
  overrideExisting: false,
});
