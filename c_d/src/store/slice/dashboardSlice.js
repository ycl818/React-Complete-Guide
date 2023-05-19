import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  metrics: [],
  selectedMetrics: [],
  timeRange: { start: Date.now() - 3600000, end: Date.now() },
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addMetric: (state, action) => {
      state.metrics.push(action.payload);
    },
    removeMetric: (state, action) => {
      state.metrics = state.metrics.filter(
        (metric) => metric.id !== action.payload
      );
    },
    selectMetric: (state, action) => {
      state.selectedMetrics.push(action.payload);
    },
    deselectMetric: (state, action) => {
      state.selectedMetrics = state.selectedMetrics.filter(
        (metric) => metric.id !== action.payload
      );
    },
    updateTimeRange: (state, action) => {
      state.timeRange = { ...state.timeRange, ...action.payload };
    },
  },
});

export const {
  addMetric,
  removeMetric,
  selectMetric,
  deselectMetric,
  updateTimeRange,
} = dashboardSlice.actions;

export const dashboardReducer = dashboardSlice.reducer;
