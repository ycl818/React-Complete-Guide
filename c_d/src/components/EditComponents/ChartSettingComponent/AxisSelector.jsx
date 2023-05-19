import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setXKeyIndex, setYKeyIndex } from '../../../store/slice/chart/chartDataSlice';

const AxisSelector = ({ panelID }) => {
  const dispatch = useDispatch()
  const { chartXindex, chartYindex, dataArray } = useSelector((state) => {
    const panelArray = state.widget.widgetArray;
    const targetPanel = panelArray.filter((panel) => panel.i === panelID);
    return {
      dataArray: targetPanel[0]?.data,
      chartXindex: state.chartData.value.xKeyIndex,
      chartYindex: state.chartData.value.yKeyIndex,
    };
  });

  // console.log('dddddd', dataArray[0].dataTable)

  let chart_data = dataArray[0].dataTable; ///////////////data[0] 不確定是否永遠data[0]
  let keysArry = []
  if (chart_data && chart_data.length > 0) {
    keysArry = Object.keys(chart_data[0]);
  }
  // console.log(chartXindex, chartYindex)

  const [axisIndex, setAxisIndex] = useState({ xKey: chartXindex, yKey: chartYindex })

  // console.log(axisIndex)
  
  // useEffect(() => {
  //   // dispatch(setXKey(keysArry[0]))
  //   // dispatch(setYKey(keysArry.slice(1,)))
  //   setAxisIndex({ xKey: 0, yKey: [1] })
  // }, [dataArray])

  // console.log(axisKeys)

  // if (keysArry.length > 0 && (chart_X === null || chart_Y === null)) {
  //   console.log(chart_X, chart_X)
  //   dispatch(setXKey(keysArry[0]))
  //   dispatch(setYKey(keysArry.slice(1,)))
  // }
  
  return (
    <Box>
      {/* {keysArry.length ? (
        <Stack spacing={2} direction='column' alignItems='left' sx={{ p: 1, mt: 2, mb: 1 }}>
          <FormControl size='small' fullWidth>
            <InputLabel>X-Axis Select</InputLabel>
            <Select
              // error={!keysArry.includes(chart_X)}
              // renderValue= {(value) => value}
              value={axisIndex.xKey}
              label='Xaxis'
              onChange={(e) => {
                setAxisIndex({ ...axisIndex, xKey: e.target.value })
                dispatch(setXKeyIndex(e.target.value))
              }}
            >
              {keysArry.map((k, i) => <MenuItem key={'x_' + k} value={i}>{k}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size='small' fullWidth>
            <InputLabel>Y-Axis Select</InputLabel>
            <Select
              // error={chart_Y === null || !chart_Y.every((k) => keysArry.includes(k))}
              multiple
              // renderValue= {(value) => value}
              value={axisIndex.yKey}
              label='Yaxis'
              onChange={(e) => {
                setAxisIndex({ ...axisIndex, yKey: e.target.value })
                dispatch(setYKeyIndex(e.target.value))
              }}
            >
              {keysArry.map((k, i) => <MenuItem key={'y_' + k} value={i}>{k}</MenuItem>)}
            </Select>
          </FormControl>
        </Stack>
      ) : null} */}
    </Box>
  )
}

export default AxisSelector //React.memo(AxisSelector)
