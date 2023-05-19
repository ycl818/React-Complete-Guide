import * as dfd from 'danfojs'
import { concatenateFields, merge } from "./transformFunction";

export const dataLabelCreate = (num) => {
  var str = '', q, r;
  while (num > 0) {
    q = (num - 1) / 26
    r = (num - 1) % 26
    num = Math.floor(q)
    str = String.fromCharCode(65 + r) + str
  }
  return str
}

export const chackDataType = (data) => {
  if (Array.isArray(data)) {
    if (!Array.isArray(data[0]) && typeof data[0] === 'object') {
      return true
    }
  }
  return false
}

export const getValueFromKeys = (obj, keys) => {
  if (keys.length === 1) {
    return obj[keys[0]]
  }
  const current_key = keys[0]
  const current_obj = obj[current_key]
  if (current_obj === undefined) {
    return undefined
  }
  return getValueFromKeys(current_obj, keys.slice(1))
}

export const getSelectData = (selected_cols, selected_names, current_data) => {
  // let selected_cols = state.widgetArray[panelIndex].data[dataPanelId].columnSelect
  // let selected_names = state.widgetArray[panelIndex].data[dataPanelId].columnName
  // const current_data = state.widgetArray[panelIndex].data[dataPanelId].dataDetail
  
  let unique_name = selected_names.filter((name) => {
    return selected_names.indexOf(name) === selected_names.lastIndexOf(name);
  })
  let cols_name = unique_name.map((name) => {return {name, cols: selected_cols[unique_name.indexOf(name)]}})
  
  let selected_data = current_data.map((data_obj) => {
    let row_data = cols_name.map(({ name, cols }) => {
      let val = getValueFromKeys(data_obj, cols)
      if (!Array.isArray(val) && typeof val === 'object') val = '[object Object]'
      if (Array.isArray(val)) val = '[object Array]'
      return [name + ' ', val]
    })
    return Object.fromEntries(row_data)
  })

  return selected_data
}
export const getTransformData = (panelData, transformRules) => {
  // dataTables = {dataName: 'id', dataLabel: 'string...', dataTable: []}
  // transformRules = [
  //   { id: "merge", options: {} },
  //   { id: "sortBy", options: { fields: {???}, sort: [{ desc: true, field: 'A age' }] } },
  //   ...
  // ]

  // {
  //   id: "groupBy",
  //   options: [
  //     {
  //       target_table: 'B',
  //       groupby: ['col_1', '...'],
  //       calculate: [
  //         // {colname: 'col_2', cal: 'sum'}, //`${colname}_${cal}`
  //         // {colname: 'col_2', cal: 'mean'},

  //         { cal: 'sum', columns: ['col_2', 'col_3', '...'] }, //`${colname[0]}_${cal}`  `${colname[1]}_${cal}`  ....
  //         { cal: 'mean', columns: ['col_2', 'col_3', '...'] } 
          
  //       ]
  //     }
  //   ]
  // }

  let panel_dataFrames = panelData.map((data) => {
    let df = new dfd.DataFrame(data.dataTable)
    return {dataName: data.dataName, dataLabel: data.dataLabel, dataFrame: df}
  })

  for (const rule of transformRules) {
    switch (rule.id) {
      case 'merge':
        panel_dataFrames = merge(panel_dataFrames)
        break;
      case 'concatenate_fields':
        panel_dataFrames = concatenateFields(panel_dataFrames)
        break;

      default:
        break;
    }
  }  

  panel_dataFrames = panel_dataFrames.map((data) => {
    let df = data.dataFrame.fillNa("")
    return {dataName: data.dataName, dataLabel: data.dataLabel, dataTable: dfd.toJSON(df)}
  })

  return panel_dataFrames
}