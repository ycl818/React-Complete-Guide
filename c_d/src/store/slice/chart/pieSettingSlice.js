import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: {
    innerRadius: '0%',
    outerRadius: '80%',
    paddingAngle: 0,
    label: false,
    label_text: 'percent'
  }
}

export const pieSettingSlice = createSlice({
  name: 'pieSetting',
  initialState,
  reducers: {
    setPieStyle: (state, action) => {
      // action.payload => [{type: 'string', value: ...}]
      // string of type must be same as key in value
      state.value[action.payload.type] = action.payload.value
    },
    setPieSetting: (state, action) => {
      // action.payload => {...all setting}
      state.value = action.payload
    },
    clearPieSetting: (state, action) => {
      state.value = initialState.value
    }
  }
})

export const {
  setPieStyle,
  setPieSetting,
  clearPieSetting
} = pieSettingSlice.actions

export const pieSettingReducer = pieSettingSlice.reducer