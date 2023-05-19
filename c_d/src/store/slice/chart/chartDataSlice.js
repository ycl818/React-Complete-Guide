import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { setColumnName, setColumnSelect, setDefaultColumnSelect, updateData } from "../widgetSlice"

const initialState = {
  value: {
    xKeyIndex: 0,
    yKeyIndex: [1],
    // allKeys: [],
    // data: [],
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
    setXKeyIndex: (state, action) => {
      state.value.xKeyIndex = action.payload
    },
    setYKeyIndex: (state, action) => {
      state.value.yKeyIndex = action.payload
    },
    // setAllKeys: (state, action) => {
    //   state.value.allKeys = action.payload
    // },
    // setChartData: (state, action) => {
    //   state.value.data = action.payload
    // },
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
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(updateData, setDefaultColumnSelect, setColumnSelect, setColumnName), (state, action) => {
        state.value.xKeyIndex = 0
        state.value.yKeyIndex = [1]
      })
  }
})


export const {
  setXKeyIndex,
  setYKeyIndex,
  setChartData,
  setChartType,
  clearChartData
} = chartDataSlice.actions
export const chartDataReducer = chartDataSlice.reducer