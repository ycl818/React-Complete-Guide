import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { setChartType } from '../../../store'
import BarChartSetting from './BarChartSetting'
import LineChartSetting from './LineChartSetting'
import AreaChartSetting from './AreaChartSetting'
import PieChartSetting from './PieChartSetting'
import ComposeSetting from './ComposeSetting'

const ChartSettingOption = () => {
  const chartData = useSelector((state) => state.chartData)

  const switch_setting = () => {
    switch (chartData.value.chartType) {
      case 'Bar Chart':
        return <BarChartSetting />
      case 'Line Chart':
        return <LineChartSetting />
      case 'Area Chart':
        return <AreaChartSetting />
      case 'Pie Chart':
        return <PieChartSetting />
      case 'Compose Chart':
        return <ComposeSetting />
      default:
        break;
    }
  }

  return (
    <Box>
      <Box sx={{ height: '1vh' }} />
      <Box>
        {switch_setting()}
      </Box>
    </Box>
  )
}

export default ChartSettingOption
