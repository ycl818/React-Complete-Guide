import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Input, MenuItem, Select, Slider, Stack, Switch, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPieStyle } from '../../../store'

const PieStyleSetting = () => {
  const dispatch = useDispatch()
  const pieStyle = useSelector((state) => state.pieSetting.value)
  const [accordionExpand, setAccordionExpand] = useState(false)

  const [scrollInputs, setScrollInputs] = useState({
    paddingAngle: pieStyle.paddingAngle,
  })
  useEffect(() => {
    dispatch(setPieStyle({ type: 'paddingAngle', value: scrollInputs.paddingAngle }))
  }, [scrollInputs.paddingAngle])
  

  return (
    <Accordion expanded={accordionExpand} onChange={() => setAccordionExpand(!accordionExpand)} disableGutters={true}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Pie Style</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ p: 1.5, border: 1, borderColor: '#333333', borderRadius: 1 }}>
          <Stack spacing={0.5} direction='column' sx={{mb: 3}} alignItems='left'>
            <Typography variant='body2'>Pie Chart type</Typography>
            <ToggleButtonGroup
              value={pieStyle.innerRadius === '0%' ? 'pie' : 'donut'}
              exclusive
              size="small"
              onChange={(e) => dispatch(setPieStyle({type: 'innerRadius', value: e.target.value === 'pie' ? '0%' : '60%'}))}
              aria-label="Platform"
            >
              <ToggleButton value="pie">pie</ToggleButton>
              <ToggleButton value="donut">donut</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack spacing={2} direction='row' sx={{mb: 3}} alignItems='left'>
            <Typography variant='body2'>Label</Typography>
            <Switch
              checked={pieStyle.label}
              size="small"
              onChange={(e) => {
                dispatch(setPieStyle({ type: 'label', value: e.target.checked }))
                dispatch(setPieStyle({ type: 'labels', value: e.target.checked ? 'percent' : '' }))
              }}
            />
          </Stack>

          {pieStyle.label ? (
          <Stack spacing={2} direction='row' sx={{mb: 3}} alignItems='left'>
            <Typography variant='body2'>Label Select</Typography>
            <Select
              value={pieStyle.label_text}
              label='Label'
              autoWidth
              size='small'
              onChange={(e) => dispatch(setPieStyle({ type: 'label_text', value: e.target.value }))}
            >
              <MenuItem value='percent'>percent</MenuItem>
              <MenuItem value='name'>name</MenuItem>
              <MenuItem value='value'>value</MenuItem>
            </Select>
          </Stack>
          ) : null}

          <Stack spacing={0} direction='column' sx={{mb: 3}} alignItems='left'>
            <Typography variant='body2'>Padding</Typography>
            <Stack spacing={1} direction='row' alignItems='left'>
              <Slider
                size="small"
                value={scrollInputs.paddingAngle}
                min={0}
                step={1}
                max={10}
                onChange={(_, value) => setScrollInputs((prev) => { return { ...prev, paddingAngle: value } })} //dispatch(setPanelStrokeOpacity(newValue))
                aria-labelledby="input-slider"
              />
              <Input
                value={scrollInputs.paddingAngle}
                size="small"
                onChange={(e) => setScrollInputs((prev) => {
                  return { ...prev, paddingAngle: e.target.value === '' ? 0 : Number(e.target.value) }
                })}
                onBlur={() => {
                  if (scrollInputs.paddingAngle < 0) {
                    setScrollInputs((prev) => { return { ...prev, paddingAngle: 0 } })
                  } else if (scrollInputs.paddingAngle > 10) {
                    setScrollInputs((prev) => { return { ...prev, paddingAngle: 10 } })
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

export default React.memo(PieStyleSetting)
