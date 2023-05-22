import { nanoid } from '@reduxjs/toolkit'
import * as dfd from 'danfojs'

export const merge = (panel_dataFrames) => {
  let panel_df = panel_dataFrames.map((data) => data.dataFrame)
  panel_df = panel_df.filter((df) => df.shape[1] > 0)

  if (panel_df.length === 1) {
    return [{ dataName: nanoid(), dataLabel: 'Merge', dataFrame: panel_df[0] }]
  } else if (panel_df.length > 0) {
    panel_df = dfd.concat({ dfList: panel_df, axis: 0 })
    return [{ dataName: nanoid(), dataLabel: 'Merge', dataFrame: panel_df }]
  }
  return [{ dataName: nanoid(), dataLabel: 'Merge', dataFrame: new dfd.DataFrame([]) }]
}

export const concatenateFields = (panel_dataFrames) => {
  let panel_df = panel_dataFrames.map((data) => data.dataFrame)
  panel_df = panel_df.filter((df) => df.shape[1] > 0)
  
  if (panel_df.length === 1) {
    return [{ dataName: nanoid(), dataLabel: 'Concatenate Fields', dataFrame: panel_df[0] }]
  } else if (panel_df.length > 0){
    panel_df = dfd.concat({ dfList: panel_df, axis: 1 })
    return [{ dataName: nanoid(), dataLabel: 'Concatenate Fields', dataFrame: panel_df }]
  }
  return [{ dataName: nanoid(), dataLabel: 'Concatenate Fields', dataFrame: new dfd.DataFrame([]) }]
}
  
 