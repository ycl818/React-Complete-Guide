import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setComposeKey } from '../../../store'

const ComposeStyleSetting = () => {
  const dispatch = useDispatch()
  const {
    yKey,
    composeSetting
  } = useSelector(state => {
    return {
      yKey: state.chartData.value.yKey,
      composeSetting: state.composeSetting.value,
    }
  })

  const [accordionExpand, setAccordionExpand] = useState(true)

  return (
    <Accordion expanded={accordionExpand} onChange={() => setAccordionExpand(!accordionExpand)} disableGutters={true}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Chart Setting</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ p: 1.5, border: 1, borderColor: '#333333', borderRadius: 1 }}>
          <Stack spacing={2} direction='row' sx={{mb: 3}} alignItems='left'>
            <Typography variant='body2'>Bar</Typography>
            <Select
              value={composeSetting.BarKey}
              multiple
              label='Position'
              autoWidth
              size='small'
              onChange={(e) => dispatch(setComposeKey({ type: 'BarKey', value: e.target.value }))}
            >
              {yKey.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
            </Select>
          </Stack>

          <Stack spacing={2} direction='row' sx={{mb: 3}} alignItems='left'>
            <Typography variant='body2'>Line</Typography>
            <Select
              value={composeSetting.LineKey}
              multiple
              label='Position'
              autoWidth
              size='small'
              onChange={(e) => dispatch(setComposeKey({ type: 'LineKey', value: e.target.value }))}
            >
              {yKey.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
            </Select>
          </Stack>

          <Stack spacing={2} direction='row' sx={{mb: 3}} alignItems='left'>
            <Typography variant='body2'>Area</Typography>
            <Select
              value={composeSetting.AreaKey}
              multiple
              label='Position'
              autoWidth
              size='small'
              onChange={(e) => dispatch(setComposeKey({ type: 'AreaKey', value: e.target.value }))}
            >
              {yKey.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
            </Select>
          </Stack>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default React.memo(ComposeStyleSetting)
