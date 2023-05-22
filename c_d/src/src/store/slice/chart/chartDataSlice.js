import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: {
    xKey: '',
    yKey: [],
    allKeys: [],
    data: [],
    chartType: 'Bar Chart'
  },
  allChartType: [
    'Bar Chart',
    'Line Chart',
    'Area Chart',
    'Pie Chart',
    // 'Compose Chart'
  ]
}

export const chartDataSlice = createSlice({
  name: 'chartData',
  initialState,
  reducers: {
    setXKey: (state, action) => {
      state.value.xKey = action.payload
    },
    setYKey: (state, action) => {
      state.value.yKey = action.payload
    },
    setAllKeys: (state, action) => {
      state.value.allKeys = action.payload
    },
    setChartData: (state, action) => {
      state.value.data = action.payload
    },
    setChartType: (state, action) => {
      state.value.chartType = action.payload
    },
    clearChartData: (state, action) => {
      state.value = initialState.value
    }
    // clearChartData: (state, action) => {
    //   state.value.xKey = ''
    //   state.value.yKey = []
    //   state.value.data = []
    // }
  }
})


export const {
  setXKey,
  setYKey,
  setChartData,
  setChartType,
  clearChartData
} = chartDataSlice.actions
export const chartDataReducer = chartDataSlice.reducer