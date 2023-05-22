import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Input, MenuItem, Select, Slider, Stack, Switch, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLineLayout, setLineStyle } from '../../../store'

const LineStyleSetting = ({isCompose=false}) => {
  const dispatch = useDispatch()
  const lineStyle = useSelector((state) => state.lineSetting.value)
  const [accordionExpand, setAccordionExpand] = useState(false)

  const [scrollInputs, setScrollInputs] = useState({
    strokeWidth: lineStyle.strokeWidth,
  })
  useEffect(() => {
    dispatch(setLineStyle({ type: 'strokeWidth', value: scrollInputs.strokeWidth }))
  }, [scrollInputs.strokeWidth])

  return (
    <Accordion expanded={accordionExpand} onChange={() => setAccordionExpand(!accordionExpand)} disableGutters={true}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Line Style</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ p: 1.5, border: 1, borderColor: '#333333', borderRadius: 1 }}>
          <Stack spacing={0.5} direction='column' sx={{ mb: 3 }} alignItems='left'>
            <Typography variant='body2'>Line Orientation</Typography>
            <ToggleButtonGroup
              value={lineStyle.layout}
              exclusive
              size="small"
              onChange={(e) => dispatch(setLineLayout({value: e.target.value, isCompose}))}
              aria-label="Platform"
            >
              <ToggleButton value="vertical">Vertical</ToggleButton>
              <ToggleButton value="horizontal">Horizontal</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack spacing={0.5} direction='column' sx={{mb: 3}} alignItems='left'>
            <Typography variant='body2'>Line type</Typography>
            <ToggleButtonGroup
              value={lineStyle.type}
              exclusive
              size="small"
              onChange={(e) => dispatch(setLineStyle({type: 'type', value: e.target.value}))}
              aria-label="Platform"
            >
              <ToggleButton value="linear">linear</ToggleButton>
              <ToggleButton value="monotone">monotone</ToggleButton>
              <ToggleButton value="step">step</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack spacing={2} direction='row' sx={{mb: 3}} alignItems='left'>
            <Typography variant='body2'>Dot</Typography>
            <Switch
              checked={lineStyle.dot}
              size="small"
              onChange={(e) => dispatch(setLineStyle({ type: 'dot', value: e.target.checked }))}
            />
          </Stack>
          {
            lineStyle.dot ? (
              <Stack spacing={2} direction='row' sx={{mb: 3}} alignItems='left'>
                <Typography variant='body2'>Active Dot</Typography>
                <Switch
                  checked={lineStyle.activeDot}
                  size="small"
                  onChange={(e) => dispatch(setLineStyle({ type: 'activeDot', value: e.target.checked }))} />
              </Stack>
            ) : null
          }

          <Stack spacing={0} direction='column' sx={{mb: 3}} alignItems='left'>
            <Typography variant='body2'>Stroke Width</Typography>
            <Stack spacing={1} direction='row' alignItems='left'>
              <Slider
                size="small"
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
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default React.memo(LineStyleSetting)
