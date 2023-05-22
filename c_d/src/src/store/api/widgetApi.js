import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const widgetApi = createApi({
  reducerPath: "fetchFromDataBase",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001/test/widget_data",
  }),
  endpoints(builder) {
    return {
      fetchWidgetData: builder.query({
        query: () => {
          return {
            url: "/",
          };
        },
      }),
    };
  },
});

export const { useFetchWidgetDataQuery } = widgetApi;
export { widgetApi };
