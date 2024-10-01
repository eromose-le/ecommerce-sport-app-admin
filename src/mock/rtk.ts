import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { generateMockAgents } from "./data";

export const mockApi = createApi({
  reducerPath: "mockApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      queryFn: async ({ pageIndex, pageSize, sorting, globalFilter }) => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        let data = generateMockAgents(20);

        // Filtering
        if (globalFilter) {
          data = data.filter((agent) =>
            agent.name.toLowerCase().includes(globalFilter.toLowerCase())
          );
        }

        // Sorting
        if (sorting?.length) {
          const { id, desc } = sorting[0]; // Assume single column sorting
          data.sort((a: any, b: any) => {
            if (a[id] < b[id]) return desc ? 1 : -1;
            if (a[id] > b[id]) return desc ? -1 : 1;
            return 0;
          });
        }

        // Pagination
        const start = pageIndex * pageSize;
        const paginatedData = data.slice(start, start + pageSize);

        return { data: paginatedData };
      },
    }),
  }),
});

export const { useGetUsersQuery } = mockApi;
