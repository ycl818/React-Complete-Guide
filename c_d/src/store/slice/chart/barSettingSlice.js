import { createSlice } from "@reduxjs/toolkit"
import { setAreaLayout } from "./areaSettingSlice"
import { setLineLayout } from "./lineSettingSlice"

const initialState = {
  value: {
    layout: 'horizontal',
    stacked: false,
    stackId: null,
    barCategoryGap: '10%',
    barGap: '10%',
    fillOpacity: 1,
    // margin: {}, // {'bottom': ..(if horizontal), 'left': ..(if vertical)}
    label_show: false,
    label_position: 'center',
  }
}

export const barSettingSlice = createSlice({
  name: 'barSetting',
  initialState,
  reducers: {
    setBarLayout: (state, action) => {
      //  action.payload => {value: 'string', isCompose: bool} (vertical or horizontal)
      state.value.layout = action.payload.value
    },
    setBarStack: (state, action) => {
      // action.payload => bool (true -> stack bar)
      state.value.stacked = action.payload
      state.value.stackId = action.payload ? '' : null
    },
    setBarStyle: (state, action) => {
      // action.payload => [{type: 'string', value: ...}]
      // string of type must be same as key in value
      state.value[action.payload.type] = action.payload.value
    },
    setBarSetting: (state, action) => {
      // action.payload => {...all setting}
      state.value = action.payload
    },
    clearBarSetting: (state, action) => {
      state.value = initialState.value
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(setAreaLayout, (state, action) => {
        if (action.payload.isCompose) state.value.layout = action.payload.value
      })
      .addCase(setLineLayout, (state, action) => {
        if (action.payload.isCompose) state.value.layout = action.payload.value
      })
  }
})

export const {
  setBarLayout,
  setBarStack,
  setBarStyle,
  setBarSetting,
  clearBarSetting
} = barSettingSlice.actions

export const barSettingReducer = barSettingSlice.reducer