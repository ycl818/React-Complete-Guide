import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, FormControl, FormControlLabel, FormLabel, Input, Slider, Stack, Switch, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRechartLegend } from '../../../store'


const RechartLegendSetting = ({isCompose}) => {
  const dispatch = useDispatch()
  const legendSetting = useSelector((state) => state.chartSetting.value.Recharts.RechartLegend)
  const [accordionExpand, setAccordionExpand] = useState(false)
  
  return (
    <Accordion expanded={accordionExpand} onChange={() => setAccordionExpand(!accordionExpand)} disableGutters={true}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Legend</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ p: 1.5, border: 1, borderColor: '#333333', borderRadius: 1 }}>
          <Stack spacing={2} direction="row" alignItems="left">
            <Typography variant="body2">Set Legend</Typography>
            <Switch
              checked={legendSetting.show}
              size="small"
              onChange={(e) => dispatch(setRechartLegend({ type: 'show', value: e.target.checked }))}
            />
          </Stack>

          {legendSetting.show ? (
            <>
              {/* <Stack spacing={0.5} direction='column' sx={{mt: 3, mb: 3}} alignItems='left'>
                <Typography variant='body2'>Layout</Typography>
                <ToggleButtonGroup
                  // color="secondary"
                  value={legendSetting.layout}
                  exclusive
                  size="small"
                  onChange={(e) => {
                    dispatch(setRechartLegend({ type: 'layout', value: e.target.value }))
                    if (e.target.value === 'horizontal') {
                      dispatch(setRechartLegend({ type: 'verticalAlign', value: 'bottom' }))
                      dispatch(setRechartLegend({ type: 'align', value: 'center' }))
                    }
                    if (e.target.value === 'vertical') {
                      dispatch(setRechartLegend({type: 'align', value: 'right'}))
                      dispatch(setRechartLegend({ type: 'verticalAlign', value: 'top' }))
                    }
                    
                  }}
                  aria-label="Platform"
                >
                  <ToggleButton value="vertical">vertical</ToggleButton>
                  <ToggleButton value="horizontal">horizontal</ToggleButton>
                </ToggleButtonGroup>
              </Stack> */}

              <Stack spacing={0.5} direction='column' sx={{mb: 3}} alignItems='left'>
                <Typography variant='body2'>Align</Typography>
                <ToggleButtonGroup
                  value={legendSetting.align}
                  exclusive
                  size="small"
                  onChange={(e) => dispatch(setRechartLegend({type: 'align', value: e.target.value}))}
                  aria-label="Platform"
                >
                  <ToggleButton value="left">left</ToggleButton>
                  {legendSetting.layout === 'vertical' ? null : <ToggleButton value="center">center</ToggleButton>}
                  <ToggleButton value="right">right</ToggleButton>
                </ToggleButtonGroup>
              </Stack>

              
              {legendSetting.layout === 'horizontal' ? (
                <Stack spacing={0.5} direction='column' sx={{ mb: 3 }} alignItems='left'>
                  <Typography variant='body2'>Vertical Align</Typography>
                  <ToggleButtonGroup
                    value={legendSetting.verticalAlign}
                    exclusive
                    size="small"
                    onChange={(e) => dispatch(setRechartLegend({type: 'verticalAlign', value: e.target.value}))}
                    aria-label="Platform"
                  >
                    <ToggleButton value="top">top</ToggleButton>
                    {/* <ToggleButton value="middle">middle</ToggleButton> */}
                    {/* {legendSetting.layout === 'horizontal' ? null : <ToggleButton value="middle">middle</ToggleButton>} */}
                    <ToggleButton value="bottom">bottom</ToggleButton>
                  </ToggleButtonGroup>
                </Stack>
              ) : null}

              {isCompose ? null : (
                <Stack spacing={0.5} direction='column' sx={{mb: 3}} alignItems='left'>
                  <Typography variant='body2'>Icon Type</Typography>
                  <ToggleButtonGroup
                    // color="secondary"
                    value={legendSetting.iconType}
                    exclusive
                    size="small"
                    onChange={(e) => dispatch(setRechartLegend({type: 'iconType', value: e.target.value}))}
                    aria-label="Platform"
                  >
                    <ToggleButton value="line">line</ToggleButton>
                    <ToggleButton value="plainline">plainline</ToggleButton>
                    <ToggleButton value="square">square</ToggleButton>
                  </ToggleButtonGroup>
                </Stack>
              )}
              
            </>
          ) : null}
          
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default React.memo(RechartLegendSetting)
