import { createSlice, isAnyOf, nanoid } from "@reduxjs/toolkit";
import { chackDataType, dataLabelCreate, getSelectData, getTransformData, getValueFromKeys } from "./helper/helpWidget";


const initialState = {
  dashboardName: "New dashboard",
  widgetArray:
    [
      {
        i: nanoid(),
        x: 0,
        y: 0,
        w: 4,
        h: 2,
        panelName: "",
        data: [
          {
            dataLabel: "A",
            dataName: nanoid(),
            datasource: null,
            datasource_url: null,
            dataType: null,
            dataDetail: null,
            fetchError: false,
            fetchErrorMessage: "",

            acceptType: false,
            columnSelect: [],
            columnName: [],
            dataTable: [],
          },
        ],

        transform_data: [], // [{dataName: 'id', dataLabel: 'string...', dataTable: []}]
        // transform_option: [],
        transform_rules: [],
        // { id: "merge", options: {} },
        // { id: "sortBy", options: { fields: {???}, sort: [{ desc: true, field: 'A age' }] } }

        chart_option: {
          chartType: null,
          setting: {
            style: {}, // bar, area, pie... setting detail
            other : {} // tooltip, axis, legend... setting detail
          },
          x_key: null,
          y_key: null,
        },
      },
    ] || [],
};

const widgetSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    loadUploadDashboardName: (state, action) => {
      state.dashboardName = action.payload.dashboardName;
    },
    updateDashboardName: (state, action) => {
      state.dashboardName = action.payload;
    },
    fetchErrorShowBorder: (state, action) => {
      console.log(action);
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.id
      );
      const dataPanelId = state.widgetArray[panelIndex].data.findIndex(
        (data) => data.dataName === action.payload.dataPanelID
      );
      state.widgetArray[panelIndex].data[dataPanelId].fetchError =
        action.payload.res;
      state.widgetArray[panelIndex].data[dataPanelId].fetchErrorMessage =
        action.payload.message;
    },
    fetchExistDashboard: (state, action) => {
      console.log(action.payload.data);
      state.widgetArray = action.payload.panelArray;
    },
    updateDataSourceWithURL: (state, action) => {
      //console.log("update URL~~~~~~~~~~", action.payload);
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      const dataPanelId = state.widgetArray[panelIndex].data.findIndex(
        (data) => data.dataName === action.payload.dataPanelID
      );

      state.widgetArray[panelIndex].data[dataPanelId].datasource_url =
        action.payload.datasource_url;
      state.widgetArray[panelIndex].data[dataPanelId].datasource =
        action.payload.datasourceName;
    },
    updatePanelName: (state, action) => {
      console.log(action.payload);
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      state.widgetArray[panelIndex].panelName = action.payload.name;
    },
    loadUploadData: (state, action) => {
      //console.log(action.payload.widgetArray);
      state.widgetArray = action.payload.widgetArray;
    },
    updateDataType: (state, action) => {
      //console.log(action);
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      state.widgetArray[panelIndex].data.dataType = action.payload.selectedType;
    },
    updateData: (state, action) => {
      // console.log("🚀 ~ file: widgetSlice.js:107 ~ action:", action.payload);
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      const dataPanelId = state.widgetArray[panelIndex].data.findIndex(
        (data) => data.dataName === action.payload.dataPanelID
      );

      // state.widgetArray[panelIndex].data[dataPanelId].dataDetail =
      //   action.payload?.data;
      let queried_data = action.payload?.data
      if (!Array.isArray(queried_data) && typeof queried_data === 'object') queried_data = [queried_data];
      state.widgetArray[panelIndex].data[dataPanelId].dataDetail = queried_data
      
      const acceptType = chackDataType(queried_data)
      state.widgetArray[panelIndex].data[dataPanelId].acceptType = acceptType   
    },
    updataDataPanel: (state, action) => {
      console.log("🚀 ~ file: widgetSlice.js:117 ~ action:", action.payload);
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );

      state.widgetArray[panelIndex].data = action.payload.textValue;
    },
    addDataPanel: (state, action) => {
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );

      const data_num = state.widgetArray[panelIndex].data.length
      const all_dataLabel = state.widgetArray[panelIndex].data.map((d) => d.dataLabel)
      let label = dataLabelCreate(data_num + 1)
      if (all_dataLabel.includes(label)) {
        for (let i = 1; i <= data_num + 1; i++) {
          label = dataLabelCreate(i)
          if (!all_dataLabel.includes(label)) break
        }
      }

      state.widgetArray[panelIndex].data = [
        ...state.widgetArray[panelIndex].data,
        {
          // dataLabel: "New Source",
          dataLabel: label,
          dataName: nanoid(),
          datasource: null,
          datasource_url: null,
          dataType: null,
          dataDetail: null,
          fetchError: false,
          fetchErrorMessage: "",

          acceptType: false,
          columnSelect: [],
          columnName: [],
          dataTable: [],
        },
      ];
    },
    removeDataPanel: (state, action) => {
      console.log("Remove data panel~~", action.payload);
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      const dataPanelId = state.widgetArray[panelIndex].data.findIndex(
        (data) => data.dataName === action.payload.dataPanelID
      );

      state.widgetArray[panelIndex].data.splice(dataPanelId, 1);
    },
    updateDataSourceName: (state, action) => {
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      const dataPanelId = state.widgetArray[panelIndex].data.findIndex(
        (data) => data.dataName === action.payload.dataPanelID
      );
      state.widgetArray[panelIndex].data[dataPanelId].dataLabel =
        action.payload?.name;
    },
    modifyLayouts: (state, action) => {
      // const tempArray = state.widgetArray.map((widget) => ({
      //   ...widget,
      //   data: { ...widget.data },
      // }));
      const tempArray = [...state.widgetArray];
      // console.log("temp:", tempArray);
      //console.log(action);
      action.payload.layouts?.forEach((position) => {
        const widgetIndex = tempArray.findIndex(
          (widget) => widget.i === position.i
        );
        if (widgetIndex !== -1) {
          tempArray[Number(widgetIndex)].x = position.x;
          tempArray[Number(widgetIndex)].y = position.y;
          tempArray[Number(widgetIndex)].w = position.w;
          tempArray[Number(widgetIndex)].h = position.h;
        }
      });
      state.widgetArray = tempArray;
    },
    addWidget: (state) => {
      const panelNumber = state.widgetArray?.length;
      state.widgetArray = [
        ...state.widgetArray,
        {
          i: nanoid(),
          x: 0,
          y: -1.5 * panelNumber,
          w: 4,
          h: 2,
          panelName: "",
          data: [
            {
              dataLabel: "A",
              dataName: nanoid(),
              datasource: null,
              datasource_url: null,
              dataType: null,
              dataDetail: null,
              fetchError: false,
              fetchErrorMessage: "",

              acceptType: false,
              columnSelect: [],
              columnName: [],
              dataTable: [],
            },
          ],

          transform_data: [],
          // transform_option: [],
          transform_rules: [],

          chart_option: {
            chartType: null,
            setting: {
              style: {},
              other : {}
            },
            x_key: null,
            y_key: null
          },
        },
      ];
    },
    deleteWidget: (state, action) => {
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.id
      );
      const tempArray = [...state.widgetArray];
      tempArray.splice(panelIndex, 1);
      state.widgetArray = tempArray;
    },
    cleanUpAllPanel: (state, action) => {
      console.log(action);
      state.widgetArray = initialState;
    },
    
    setChartOption: (state, action) => {
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelId
      );
      state.widgetArray[panelIndex].chart_option = action.payload.chartOption;
    },
    setDefaultColumnSelect: (state, action) => {
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      const dataPanelId = state.widgetArray[panelIndex].data.findIndex(
        (data) => data.dataName === action.payload.dataPanelID
      );
      const dataDetail = state.widgetArray[panelIndex].data[dataPanelId].dataDetail

      if (Array.isArray(dataDetail)) {
        if (!Array.isArray(dataDetail[0]) && typeof dataDetail[0] === 'object') {
          state.widgetArray[panelIndex].data[dataPanelId].columnSelect = Object.keys(dataDetail[0]).map((k) => [k])
          state.widgetArray[panelIndex].data[dataPanelId].columnName = Object.keys(dataDetail[0])
        }
      }
    },
    setColumnSelect: (state, action) => {
      // action.payload = {panelID, dataPanelID (dataName), colIdx, keyIdx, action: string (update/add/deleteCol/deleteKey), value: string (from select)}
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      const dataPanelId = state.widgetArray[panelIndex].data.findIndex(
        (data) => data.dataName === action.payload.dataPanelID
      );
      const columnIndex = action.payload.colIdx
      const keyIndex = action.payload.keyIdx

      if (action.payload.action === 'add_col') {
        state.widgetArray[panelIndex].data[dataPanelId].columnSelect.push(action.payload.value)
        state.widgetArray[panelIndex].data[dataPanelId].columnName.push(action.payload.value[0])
      } else if(action.payload.action === 'update_key') {
        state.widgetArray[panelIndex].data[dataPanelId].columnSelect[columnIndex][keyIndex] = action.payload.value
        const updated_keys = state.widgetArray[panelIndex].data[dataPanelId].columnSelect[columnIndex].slice(0, keyIndex+1)
        state.widgetArray[panelIndex].data[dataPanelId].columnSelect[columnIndex] = updated_keys
      } else if (action.payload.action === 'add_key') {
        state.widgetArray[panelIndex].data[dataPanelId].columnSelect[columnIndex].push(action.payload.value)
      } else if (action.payload.action === 'delete_col') {
        state.widgetArray[panelIndex].data[dataPanelId].columnSelect.splice(columnIndex, 1)
        state.widgetArray[panelIndex].data[dataPanelId].columnName.splice(columnIndex, 1)
      } else if (action.payload.action === 'delete_key') {
        state.widgetArray[panelIndex].data[dataPanelId].columnSelect[columnIndex].splice(keyIndex, 1)
      }
    },
    setColumnName: (state, action) => {
      // action.payload = {panelID, dataPanelID (dataName), colIdx, value, nameError
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      const dataPanelId = state.widgetArray[panelIndex].data.findIndex(
        (data) => data.dataName === action.payload.dataPanelID
      );
      const columnIndex = action.payload.colIdx
      state.widgetArray[panelIndex].data[dataPanelId].columnName[columnIndex] = action.payload.value
    },
    addTransformRules: (state, action) => {
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      state.widgetArray[panelIndex].transform_rules.push(action.payload.rule)
    },
    deleteTransformRule: (state, action) => {
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      state.widgetArray[panelIndex].transform_rules.splice(action.payload.index, 1)
    },
    updateTransformRules: (state, action) => {
      // action.payload = {panelId, transformIndex, rule}
      // rule = {id: "", options: {...}}
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      state.widgetArray[panelIndex].transform_rules[action.payload.transformIndex] =  action.payload.rule
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(
        updateData,
        setDefaultColumnSelect,
        setColumnSelect,
        setColumnName), (state, action) =>
      {
        const panelIndex = state.widgetArray.findIndex(
          (panel) => panel.i === action.payload.panelID
        );
        const dataPanelId = state.widgetArray[panelIndex].data.findIndex(
          (data) => data.dataName === action.payload.dataPanelID
        );
        if (state.widgetArray[panelIndex].data[dataPanelId].acceptType) {
          let selected_cols = state.widgetArray[panelIndex].data[dataPanelId].columnSelect
          let selected_names = state.widgetArray[panelIndex].data[dataPanelId].columnName
          const current_data = state.widgetArray[panelIndex].data[dataPanelId].dataDetail
          if (selected_cols.length === 0) {
            selected_cols = Object.keys(current_data[0]).map((k) => [k])
            selected_names = Object.keys(current_data[0])
          }
          state.widgetArray[panelIndex].data[dataPanelId].dataTable = getSelectData(selected_cols, selected_names, current_data)

          // transform below....
          if (state.widgetArray[panelIndex].transform_rules.length > 0) {
            const panelData = state.widgetArray[panelIndex].data.map((data) => {
              return { dataName: data.dataName, dataLabel: data.dataLabel, dataTable: data.dataTable}
            })
            state.widgetArray[panelIndex].transform_data = getTransformData(panelData, state.widgetArray[panelIndex].transform_rules)
          } else {
            state.widgetArray[panelIndex].transform_data = []
          }

        }
      })
      .addMatcher(isAnyOf(removeDataPanel, addTransformRules, deleteTransformRule, updateTransformRules), (state, action) => {
        const panelIndex = state.widgetArray.findIndex(
          (panel) => panel.i === action.payload.panelID
        );

        const panelData = state.widgetArray[panelIndex].data.map((data) => {
          return { dataName: data.dataName, dataLabel: data.dataLabel, dataTable: data.dataTable}
        })

        // let tmp = getTransformData(panelData, state.widgetArray[panelIndex].transform_rules)
        // console.log(panelData)
        if (state.widgetArray[panelIndex].transform_rules.length > 0) {
          state.widgetArray[panelIndex].transform_data = getTransformData(panelData, state.widgetArray[panelIndex].transform_rules)
        } else {
          state.widgetArray[panelIndex].transform_data = []
        }

      })
  }
});

export const {
  modifyLayouts,
  addWidget,
  deleteWidget,
  updateData,
  updateDataType,
  loadUploadData,
  updatePanelName,
  updateDataSourceWithURL,
  fetchExistDashboard,
  fetchErrorShowBorder,
  cleanUpAllPanel,
  updateDashboardName,
  loadUploadDashboardName,
  addDataPanel,
  removeDataPanel,
  updataDataPanel,
  updateDataSourceName,

  setChartOption,
  setDefaultColumnSelect,
  setColumnSelect,
  setColumnName,
  addTransformRules,
  deleteTransformRule,
  updateTransformRules
} = widgetSlice.actions;
export const widgetReducer = widgetSlice.reducer;
