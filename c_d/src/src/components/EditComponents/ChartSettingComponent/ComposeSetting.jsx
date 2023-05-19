import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { setComposeKey } from '../../../features/slices/chart/composeSettingSlice'
import ComposeStyleSetting from './ComposeStyleSetting'
import RechartPanelSetting from './RechartPanelSetting'
import RechartAxisSetting from './RechartAxisSetting'
import RechartLegendSetting from './RechartLegendSetting'
import RechartTooltipSetting from './RechartTooltipSetting'
import BarStyleSetting from './BarStyleSetting'
import AreaStyleSetting from './AreaStyleSetting'
import LineStyleSetting from './LineStyleSetting'

const ComposeSetting = () => {
  const dispatch = useDispatch()
  const composeSetting = useSelector((state) => state.composeSetting.value)

  // const [accordionExpand, setAccordionExpand] = useState(false)

  return (
    <Box>
      <ComposeStyleSetting />
      {Object.values(composeSetting).flat(1).length > 0 ? (
        <>
          <RechartPanelSetting />
          {composeSetting.BarKey.length > 0 ? <BarStyleSetting isCompose={true} /> : null}
          {composeSetting.LineKey.length > 0 ? <LineStyleSetting isCompose={true} /> : null}
          {composeSetting.AreaKey.length > 0 ? <AreaStyleSetting isCompose={true} /> : null}
          <RechartAxisSetting />
          <RechartLegendSetting isCompose={true}/>
          <RechartTooltipSetting />
        </>
      ) : null}
      
    </Box>
  )
}

export default ComposeSetting
