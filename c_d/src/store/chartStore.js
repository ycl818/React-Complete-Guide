import { createContext } from "react";

export const ChartContext = createContext({});

export const initChartState = {
        type: '',
        title:[], 
}

export const chartReducer = (state, action) => {
    switch(action.type) {
        case "CHANGE_CHART_TYPE":
            return {
                ...state,
                type: action.payload
            }
        case "CHANGE_CHART_NAME":
            return {
                ...state, 
                title: action.payload
            }
        default:
            return state
    }
}