import { createSlice, isAnyOf } from "@reduxjs/toolkit"

const initialState = {
  value: {
    Recharts: {
      RechartPanel: {
        stroke: '3 3',
        strokeOpacity: 0.1
      },
      RechartXaxis: {
        // type: 'category',
        hide: false,
        orientation: 'bottom',
        textAnchor: 'middle',
        interval: 0,
        angle: 0,
        fontSize: 15,
        padding: { left: 0, right: 0 },
        label_hide: true,
        label_value: 'x-axis',
        label_position: 'insideBottom'
      },
      RechartYaxis: {
        // type: 'number',
        hide: false,
        orientation: 'left',
        textAnchor: 'end',
        interval: 0,
        angle: 0,
        fontSize: 15,
        padding: { top: 0, bottom: 0 },
        label_hide: true,
        label_value: 'y-axis',
        label_position: 'insideLeft'
      },
      RechartTooltip: {
        
      },
      RechartLegend: {
        show: true,
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        iconType: 'line',
      }
    }
  },
  color: [
    '#d88484', 
    '#974dbf',    
    '#82ca9d',
    '#8884d8',
    '#ffc658',
    '#5cb6f2',
    '#f25cf2',
    '#aef25c',
    '#f25ca2',
    '#f0cf89',
    '#a14242',
    '#348a44',
    '#8f6410',
    '#252799',
    '#5e2a58'
  ]
}

export const chartSettingSlice = createSlice({
  name: 'chartSetting',
  initialState,
  reducers: {
    setRechartPanel: (state, action) => {
      state.value.Recharts.RechartPanel[action.payload.type] = action.payload.value
    },
    setRechartXaxis: (state, action) => {
      // action.payload => [{type: 'string', value: ...}]
      // string of type must be same as key in RechartXaxis
      state.value.Recharts.RechartXaxis[action.payload.type] = action.payload.value
    },
    setRechartYaxis: (state, action) => {
      state.value.Recharts.RechartYaxis[action.payload.type] = action.payload.value
    },
    setRechartTooltip: (state, action) => {

    },
    setRechartLegend: (state, action) => {
      state.value.Recharts.RechartLegend[action.payload.type] = action.payload.value
    },
    setChartSetting: (state, action) => {
      // action.payload => {type: 'string (Recharts)', setting: {...all setting}}
      state.value[action.payload.type] = action.payload.setting
    },
    clearChartSetting: (state, action) => {
      state.value = initialState.value
    }
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addMatcher(isAnyOf(setBarLayout, setAreaLayout), (state, action) => {
  //       if (action.payload === 'horizontal') {
  //         state.value.RechartXaxis.type = 'category'
  //         state.value.RechartYaxis.type = 'number'
  //       } else if (action.payload === 'vertical') {
  //         state.value.RechartXaxis.type = 'number'
  //         state.value.RechartYaxis.type = 'category'
  //       }
  //     })
  // }
})

export const {
  setRechartPanel,
  setRechartXaxis,
  setRechartYaxis,
  setRechartLegend,
  setChartSetting,
  clearChartSetting
} = chartSettingSlice.actions

export const chartSettingReducer = chartSettingSlice.reducer