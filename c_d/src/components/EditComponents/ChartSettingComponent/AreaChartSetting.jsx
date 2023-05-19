import { Box } from '@mui/material'
import React from 'react'
import RechartPanelSetting from './RechartPanelSetting'
import RechartAxisSetting from './RechartAxisSetting'
import RechartLegendSetting from './RechartLegendSetting'
import AreaStyleSetting from './AreaStyleSetting'

const AreaChartSetting = () => {
  return (
    <Box>
      <RechartPanelSetting />
      <AreaStyleSetting />
      <RechartAxisSetting />
      <RechartLegendSetting />
    </Box>
  )
}

export default AreaChartSetting
