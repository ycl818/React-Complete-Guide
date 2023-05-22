import { Box } from '@mui/material'
import React from 'react'
import PieStyleSetting from './PieStyleSetting'
import RechartLegendSetting from './RechartLegendSetting'
import RechartTooltipSetting from './RechartTooltipSetting'

const PieChartSetting = () => {
  return (
    <Box>
      <PieStyleSetting />
      <RechartLegendSetting />
      <RechartTooltipSetting />
    </Box>
  )
}

export default PieChartSetting
