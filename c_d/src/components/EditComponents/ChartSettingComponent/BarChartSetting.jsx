import { Box } from '@mui/material'
import React from 'react'
import BarStyleSetting from './BarStyleSetting'
import RechartAxisSetting from './RechartAxisSetting'
import RechartLegendSetting from './RechartLegendSetting'
import RechartPanelSetting from './RechartPanelSetting'
import RechartTooltipSetting from './RechartTooltipSetting'

const BarChartSetting = () => {
  return (
    <Box>
      <RechartPanelSetting />
      <BarStyleSetting />
      <RechartAxisSetting />
      <RechartLegendSetting />
      <RechartTooltipSetting />
    </Box>
  )
}

export default BarChartSetting
