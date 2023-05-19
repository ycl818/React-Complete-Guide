import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Input, MenuItem, Select, Slider, Stack, Switch, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAreaLayout, setAreaStack, setAreaStyle } from '../../../store'

const AreaStyleSetting = ({isCompose=false}) => {
  const dispatch = useDispatch()
  const areaStyle = useSelector((state) => state.areaSetting.value)
  const [accordionExpand, setAccordionExpand] = useState(false)

  const [scrollInputs, setScrollInputs] = useState({
    fillOpacity: areaStyle.fillOpacity * 100,
    strokeWidth: areaStyle.strokeWidth,
  })
  useEffect(() => {
    dispatch(setAreaStyle({ type: 'fillOpacity', value: scrollInputs.fillOpacity / 100 }))
  }, [scrollInputs.fillOpacity])
  useEffect(() => {
    dispatch(setAreaStyle({ type: 'strokeWidth', value: scrollInputs.strokeWidth }))
  }, [scrollInputs.strokeWidth])

  return (
    <Accordion expanded={accordionExpand} onChange={() => setAccordionExpand(!accordionExpand)} disableGutters={true}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Area Style</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ p: 1.5, border: 1, borderColor: '#333333', borderRadius: 1 }}>
          <Stack spacing={0.5} direction='column' sx={{ mb: 3 }} alignItems='left'>
            <Typography variant='body2'>Area Orientation</Typography>
            <ToggleButtonGroup
              // color="secondary"
              value={areaStyle.layout}
              exclusive
              size="small"
              onChange={(e) => dispatch(setAreaLayout({value: e.target.value, isCompose}))}
              aria-label="Platform"
            >
              <ToggleButton value="vertical">Vertical</ToggleButton>
              <ToggleButton value="horizontal">Horizontal</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack spacing={0.5} direction='column' sx={{mb: 3}} alignItems='left'>
            <Typography variant='body2'>Area type</Typography>
            <ToggleButtonGroup
              // color="secondary"
              value={areaStyle.type}
              exclusive
              size="small"
              onChange={(e) => dispatch(setAreaStyle({type: 'type', value: e.target.value}))}
              aria-label="Platform"
            >
              <ToggleButton value="linear">linear</ToggleButton>
              <ToggleButton value="monotone">monotone</ToggleButton>
              <ToggleButton value="step">step</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack spacing={2} direction='row' sx={{mb: 3}} alignItems='left'>
            <Typography variant='body2'>Stacking</Typography>
            <Switch
              checked={areaStyle.stacked}
              // color="secondary"
              size="small"
              onChange={(e) => dispatch(setAreaStack(e.target.checked))}
            />
          </Stack>

          <Stack spacing={2} direction='row' sx={{mb: 3}} alignItems='left'>
            <Typography variant='body2'>Dot</Typography>
            <Switch
              checked={areaStyle.dot}
              // color="secondary"
              size="small"
              onChange={(e) => dispatch(setAreaStyle({ type: 'dot', value: e.target.checked }))}
            />
          </Stack>
          {
            areaStyle.dot ? (
              <Stack spacing={2} direction='row' sx={{mb: 3}} alignItems='left'>
                <Typography variant='body2'>Active Dot</Typography>
                <Switch
                  checked={areaStyle.activeDot}
                  // color="secondary"
                  size="small"
                  onChange={(e) => dispatch(setAreaStyle({ type: 'activeDot', value: e.target.checked }))} />
              </Stack>
            ) : null
          }

          <Stack spacing={0} direction='column' sx={{mb: 3}} alignItems='left'>
            <Typography variant='body2'>Stroke Width</Typography>
            <Stack spacing={1} direction='row' alignItems='left'>
              <Slider
                size="small"
                // color="secondary"
                value={scrollInputs.strokeWidth}
                min={0}
                step={1}
                max={10}
                onChange={(_, value) => setScrollInputs((prev) => { return { ...prev, strokeWidth: value } })} //dispatch(setPanelStrokeOpacity(newValue))
                aria-labelledby="input-slider"
              />
              <Input
                value={scrollInputs.strokeWidth}
                size="small"
                onChange={(e) => setScrollInputs((prev) => {
                  return { ...prev, strokeWidth: e.target.value === '' ? 0 : Number(e.target.value) }
                })}
                onBlur={() => {
                  if (scrollInputs.strokeWidth < 0) {
                    setScrollInputs((prev) => { return { ...prev, strokeWidth: 0 } })
                  } else if (scrollInputs.strokeWidth > 10) {
                    setScrollInputs((prev) => { return { ...prev, strokeWidth: 10 } })
                  }
                }}
                inputProps={{
                    step: 1,
                    min: 0,
                    max: 10,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                }}
              />
            </Stack>
          </Stack>

          <Stack spacing={0} direction='column' sx={{mb: 3}} alignItems='left'>
            <Typography variant='body2'>Area Opacity</Typography>
            <Stack spacing={1} direction='row' alignItems='left'>
              <Slider
                size="small"
                // color="secondary"
                value={scrollInputs.fillOpacity}
                min={0}
                step={1}
                max={100}
                onChange={(_, value) => setScrollInputs((prev) => { return { ...prev, fillOpacity: value } })} //dispatch(setPanelStrokeOpacity(newValue))
                aria-labelledby="input-slider"
              />
              <Input
                value={scrollInputs.fillOpacity}
                size="small"
                onChange={(e) => setScrollInputs((prev) => {
                  return { ...prev, fillOpacity: e.target.value === '' ? 0 : Number(e.target.value) }
                })}
                onBlur={() => {
                  if (scrollInputs.fillOpacity < 0) {
                    setScrollInputs((prev) => { return { ...prev, fillOpacity: 0 } })
                  } else if (scrollInputs.fillOpacity > 100) {
                    setScrollInputs((prev) => { return { ...prev, fillOpacity: 100 } })
                  }
                }}
                inputProps={{
                    step: 10,
                    min: 0,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                }}
              />
            </Stack>
          </Stack>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default React.memo(AreaStyleSetting)
