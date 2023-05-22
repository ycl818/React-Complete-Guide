import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Input, MenuItem, Select, Slider, Stack, Switch, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBarLayout, setBarStack, setBarStyle } from '../../../store'

const BarStyleSetting = ({isCompose=false}) => {
  const dispatch = useDispatch()
  const barStyle = useSelector((state) => state.barSetting.value)
  
  const [accordionExpand, setAccordionExpand] = useState(false)

  const [opacityValue, setOpacityValue] = useState(barStyle.fillOpacity * 100)
  useEffect(() => {
    dispatch(setBarStyle({type: 'fillOpacity', value: opacityValue / 100}))
  }, [opacityValue])

  return (
    <Accordion expanded={accordionExpand} onChange={() => setAccordionExpand(!accordionExpand)} disableGutters={true}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Bar Style</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ p: 1.5, border: 1, borderColor: '#333333', borderRadius: 1 }}>
          {/* Bar layout orientation */}
          <Stack spacing={0.5} direction='column' sx={{ mb: 3 }} alignItems='left'>
            <Typography variant='body2'>Bar Orientation</Typography>
            <ToggleButtonGroup
              // color="secondary"
              value={barStyle.layout}
              exclusive
              size="small"
              onChange={(e) => dispatch(setBarLayout({value: e.target.value, isCompose}))}
              // onChange={(e) => dispatch(setBarStyle({type: 'layout', value: e.target.value}))}
              aria-label="Platform"
            >
              <ToggleButton value="horizontal">Vertical</ToggleButton>
              <ToggleButton value="vertical">Horizontal</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          {/* Bar Stack */}
          <Stack spacing={2} direction='row' sx={{mb: 3}} alignItems='left'>
            <Typography variant='body2'>Stacking</Typography>
            <Switch
              checked={barStyle.stacked}
              // color="secondary"
              size="small"
              onChange={(e) => dispatch(setBarStack(e.target.checked))}
              // onChange={(e) => dispatch(setBarStyle({ type: 'stacked', value: e.target.checked }))}
            />
          </Stack>

          {/* Bar value */}
          <Stack spacing={2} direction='row' sx={{mb: 3}} alignItems='left'>
            <Typography variant='body2'>Show Values</Typography>
            <Switch
              checked={barStyle.label_show}
              // color="secondary"
              size="small"
              onChange={(e) => dispatch(setBarStyle({ type: 'label_show', value: e.target.checked }))}
            />
          </Stack>

          {/* bar value position */}
          {barStyle.label_show ? (
            <Stack spacing={2} direction='row' sx={{mb: 3}} alignItems='left'>
              <Typography variant='body2'>Values Position</Typography>
              <Select
                value={barStyle.label_position}
                label='Position'
                autoWidth
                size='small'
                onChange={(e) => dispatch(setBarStyle({ type: 'label_position', value: e.target.value }))}
              >
                <MenuItem value='center'>center</MenuItem>
                <MenuItem value='insideLeft'>left</MenuItem>
                <MenuItem value='insideRight'>right</MenuItem>
                <MenuItem value='insideTop'>top</MenuItem>
                <MenuItem value='insideBottom'>bottom</MenuItem>
              </Select>
            </Stack>
          ) : null}

          {isCompose ? null : (
            <>
              {/* Bar Category Gap */}
              <Stack spacing={2} direction='row' sx={{mb: 3}} alignItems='left'>
                <Typography variant='body2'>Bar Category Gap</Typography>
                <Switch
                  checked={barStyle.barCategoryGap !== 0}
                  // color="secondary"
                  size="small"
                  onChange={(e) => dispatch(setBarStyle({ type: 'barCategoryGap', value: e.target.checked ? '10%' : 0 }))}
                />
              </Stack>

              {/* Bar Gap */}
              {barStyle.stacked ? null : (
                <Stack spacing={2} direction='row' sx={{mb: 3}} alignItems='left'>
                  <Typography variant='body2'>Bar Gap</Typography>
                  <Switch
                    checked={barStyle.barGap !== 0}
                    // color="secondary"
                    size="small"
                    onChange={(e) => dispatch(setBarStyle({ type: 'barGap', value: e.target.checked ? '10%' : 0 }))}
                  />
                </Stack>
              )}
            </>
          )}
          
          
          {/* Bar fill opacity */}
          <Stack spacing={0} direction='column' sx={{mb: 3}} alignItems='left'>
            <Typography variant='body2'>Opacity</Typography>
            <Stack spacing={1} direction='row' alignItems='left'>
              <Slider
                size="small"
                // color="secondary"
                value={opacityValue}
                onChange={(_, value) => setOpacityValue(value)}
                aria-labelledby="input-slider"
              />
              <Input
                value={opacityValue}
                size="small"
                onChange={(e) => setOpacityValue(e.target.value === '' ? 0 : Number(e.target.value))}
                onBlur={() => {
                  if (opacityValue < 0) {
                  setOpacityValue(0)
                  } else if (opacityValue > 100) {
                  setOpacityValue(100)
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
export default React.memo(BarStyleSetting)
