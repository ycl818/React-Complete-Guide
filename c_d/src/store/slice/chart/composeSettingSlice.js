import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: {
    BarKey: [],
    LineKey: [],
    AreaKey: []
  }
}

export const composeSettingSlice = createSlice({
  name: 'composeSetting',
  initialState,
  reducers: {
    setComposeKey : (state, action) => {
      // action.payload => [{type: 'string', value: ...}]
      // string of type must be same as key in value
      state.value[action.payload.type] = action.payload.value
    },
    setComposeSetting : (state, action) => {
      state.value = action.payload
    },
    clearComposeSetting: (state, action) => {
      state.value = initialState.value
    }
  }
})

export const {
  setComposeKey,
  setComposeSetting,
  clearComposeSetting
} = composeSettingSlice.actions

export const composeSettingReducer = composeSettingSlice.reducer