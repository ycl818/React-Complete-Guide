import { createSlice } from "@reduxjs/toolkit"
import { setBarLayout } from "./barSettingSlice"
import { setLineLayout } from "./lineSettingSlice"

const initialState = {
  value: {
    layout: 'horizontal',
    type: 'monotone',
    stacked: false,
    stackId: null,
    dot: true,
    activeDot: false,
    strokeWidth: 1,
    fillOpacity: 0.3,
  }
}

export const areaSettingSlice = createSlice({
  name: 'areaSetting',
  initialState,
  reducers: {
    setAreaLayout: (state, action) => {
      // action.payload => {value: 'string', isCompose: bool} (vertical or horizontal)
      state.value.layout = action.payload.value
    },
    setAreaStyle: (state, action) => {
      // action.payload => [{type: 'string', value: ...}]
      // string of type must be same as key in value
      state.value[action.payload.type] = action.payload.value
    },
    setAreaStack: (state, action) => {
      // action.payload => bool (true -> stack bar)
      state.value.stacked = action.payload
      state.value.stackId = action.payload ? '' : null
    },
    setAreaSetting: (state, action) => {
      // action.payload => {...all setting}
      state.value = action.payload
    },
    clearAreaSetting: (state, action) => {
      state.value = initialState.value
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(setBarLayout, (state, action) => {
        if (action.payload.isCompose) state.value.layout = action.payload.value
      })
      .addCase(setLineLayout, (state, action) => {
        if (action.payload.isCompose) state.value.layout = action.payload.value
      })
  }
})

export const {
  setAreaLayout,
  setAreaStyle,
  setAreaStack,
  setAreaSetting,
  clearAreaSetting
} = areaSettingSlice.actions

export const areaSettingReducer = areaSettingSlice.reducer