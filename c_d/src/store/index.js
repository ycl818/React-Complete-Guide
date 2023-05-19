import { configureStore } from "@reduxjs/toolkit";
import {
  addMetric,
  removeMetric,
  selectMetric,
  deselectMetric,
  updateTimeRange,
} from "./slice/dashboardSlice";
import { widgetReducer } from "./slice/widgetSlice";
import { widgetApi } from "./api/widgetApi";
import { variableReducer } from "./slice/variableSlice";
import { chartDataReducer } from "./slice/chart/chartDataSlice";
import { chartSettingReducer } from "./slice/chart/chartSettingSlice";
import { areaSettingReducer } from "./slice/chart/areaSettingSlice";
import { barSettingReducer } from "./slice/chart/barSettingSlice";
import { pieSettingReducer } from "./slice/chart/pieSettingSlice";
import { composeSettingReducer } from "./slice/chart/composeSettingSlice";
import { lineSettingReducer } from "./slice/chart/lineSettingSlice";

export const store = configureStore({
  reducer: {
    widget: widgetReducer,
    variable: variableReducer,
    [widgetApi.reducerPath]: widgetApi.reducer,

    chartData: chartDataReducer,
    chartSetting: chartSettingReducer,
    areaSetting: areaSettingReducer,
    lineSetting: lineSettingReducer,
    barSetting: barSettingReducer,
    pieSetting: pieSettingReducer,
    composeSetting: composeSettingReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(widgetApi.middleware);
  },
});

window.store = store;

export {
  addMetric,
  removeMetric,
  selectMetric,
  deselectMetric,
  updateTimeRange,
};

export * from "./slice/variableSlice";
export * from "./slice/widgetSlice";
export * from "./slice/chart/chartDataSlice"
export * from "./slice/chart/areaSettingSlice"
export * from "./slice/chart/lineSettingSlice"
export * from "./slice/chart/barSettingSlice"
export * from "./slice/chart/chartSettingSlice"
export * from "./slice/chart/composeSettingSlice"
export * from "./slice/chart/pieSettingSlice"

export { useFetchWidgetDataQuery } from "./api/widgetApi";
