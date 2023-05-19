import { createSlice } from "@reduxjs/toolkit"
import { setAreaLayout } from "./areaSettingSlice"
import { setBarLayout } from "./barSettingSlice"

const initialState = {
  value: {
    layout: 'horizontal',
    type: 'monotone',
    // stacked: false,
    // stackId: null,
    dot: true,
    activeDot: false,
    strokeWidth: 1,
    // fillOpacity: 0.3,
  }
}

export const lineSettingSlice = createSlice({
  name: 'lineSetting',
  initialState,
  reducers: {
    setLineLayout: (state, action) => {
      // action.payload => {value: 'string', isCompose: bool} (vertical or horizontal)
      state.value.layout = action.payload.value
    },
    setLineStyle: (state, action) => {
      // action.payload => [{type: 'string', value: ...}]
      // string of type must be same as key in value
      state.value[action.payload.type] = action.payload.value
    },
    // setLineStack: (state, action) => {
    //   // action.payload => bool (true -> stack bar)
    //   state.value.stacked = action.payload
    //   state.value.stackId = action.payload ? '' : null
    // },
    setLineSetting: (state, action) => {
      // action.payload => {...all setting}
      state.value = action.payload
    },
    clearLineSetting: (state, action) => {
      state.value = initialState.value
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(setBarLayout, (state, action) => {
        if (action.payload.isCompose) state.value.layout = action.payload.value
      })
      .addCase(setAreaLayout, (state, action) => {
        if (action.payload.isCompose) state.value.layout = action.payload.value
      })
  }
})

export const {
  setLineLayout,
  setLineStyle,
  setLineSetting,
  clearLineSetting
} = lineSettingSlice.actions

export const lineSettingReducer = lineSettingSlice.reducer