import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, FormControl, FormControlLabel, FormLabel, Input, Slider, Stack, Switch, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRechartXaxis, setRechartYaxis } from '../../../store'


const RechartAxisSetting = () => {
  const dispatch = useDispatch()
  const { xAxisSetting, yAxisSetting } = useSelector(state => {
    return {
      xAxisSetting: state.chartSetting.value.Recharts.RechartXaxis,
      yAxisSetting: state.chartSetting.value.Recharts.RechartYaxis
    }
  })

  const [accordionExpand, setAccordionExpand] = useState(false)

  const [scrollInputs, setScrollInputs] = useState({
    xAngle: xAxisSetting.angle,
    yAngle: yAxisSetting.angle,
    xFont: xAxisSetting.fontSize,
    yFont: yAxisSetting.fontSize
  })
  useEffect(() => {
    dispatch(setRechartXaxis({type: 'angle', value: scrollInputs.xAngle}))
  }, [scrollInputs.xAngle])
  useEffect(() => {
    dispatch(setRechartYaxis({type: 'angle', value: scrollInputs.yAngle}))
  }, [scrollInputs.yAngle])
  useEffect(() => {
    dispatch(setRechartXaxis({type: 'fontSize', value: scrollInputs.xFont}))
  }, [scrollInputs.xFont])
  useEffect(() => {
    dispatch(setRechartYaxis({type: 'fontSize', value: scrollInputs.yFont}))
  }, [scrollInputs.yFont])

  return (
    <Accordion expanded={accordionExpand} onChange={() => setAccordionExpand(!accordionExpand)} disableGutters={true}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Axis</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ p: 1.5, border: 1, borderColor: '#333333', borderRadius: 1 }}>
          {/* axis orientation */}
          <Typography variant='body2'>Axis Orientation</Typography>
          <Stack spacing={0.5} direction='column' sx={{ mt: 1, mb: 3 }} alignItems='left'>
            <Typography variant='caption'>X-Axis</Typography>
            <ToggleButtonGroup
              value={xAxisSetting.hide ? 'hide' : xAxisSetting.orientation}
              exclusive
              size="small"
              onChange={(e) => {
                if (e.target.value === 'hide') {
                  dispatch(setRechartXaxis({ type: 'hide', value: true }))
                } else {
                  dispatch(setRechartXaxis({ type: 'orientation', value: e.target.value }))
                  dispatch(setRechartXaxis({ type: 'hide', value: false }))
                }
              }}
              aria-label="Platform"
            >
              <ToggleButton value="bottom">bottom</ToggleButton>
              <ToggleButton value="top">top</ToggleButton>
              <ToggleButton value="hide">hide</ToggleButton>
            </ToggleButtonGroup>
            <Typography variant='caption'>Y-Axis</Typography>
            <ToggleButtonGroup
              value={yAxisSetting.hide ? 'hide' : yAxisSetting.orientation}
              exclusive
              size="small"
              onChange={(e) => {
                if (e.target.value === 'hide') {
                  dispatch(setRechartYaxis({ type: 'hide', value: true }))
                } else {
                  dispatch(setRechartYaxis({ type: 'orientation', value: e.target.value }))
                  dispatch(setRechartYaxis({ type: 'hide', value: false }))
                }
              }}
              aria-label="Platform"
            >
              <ToggleButton value="left">left</ToggleButton>
              <ToggleButton value="right">right</ToggleButton>
              <ToggleButton value="hide">hide</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Typography variant='body2'>Axis Padding</Typography>
          <Stack spacing={0.5} direction='column' sx={{ mt: 1, mb: 3 }} alignItems='left'>
            <Stack spacing={2} direction="row" alignItems="left">
              <Typography variant="caption">X-Axis</Typography>
              <Switch
                checked={xAxisSetting.padding.left !== 0}
                size="small"
                onChange={(e) => dispatch(setRechartXaxis({
                  type: 'padding',
                  value: e.target.checked ? { left: 10, right: 10 } : { left: 0, right: 0 }
                }))}
              />
            </Stack>
            <Stack spacing={2} direction="row" alignItems="left">
              <Typography variant="caption">Y-Axis</Typography>
              <Switch
                checked={yAxisSetting.padding.top !== 0}
                size="small"
                onChange={(e) => dispatch(setRechartYaxis({
                  type: 'padding',
                  value: e.target.checked ? { top: 10, bottom: 10 } : { top: 0, bottom: 0 }
                }))}
              />
            </Stack>
          </Stack>

          {xAxisSetting.hide && yAxisSetting.hide ? null : (
            <>
              {/* axis text anchor */}
              <Typography variant='body2'>Text Anchor</Typography>
              <Stack spacing={0.5} direction='column' sx={{ mt: 1, mb: 3 }} alignItems='left'>
                {xAxisSetting.hide ? null : (
                  <>
                    <Typography variant='caption'>X-Axis</Typography>
                    <ToggleButtonGroup
                      value={xAxisSetting.textAnchor}
                      exclusive
                      size="small"
                      onChange={(e) => dispatch(setRechartXaxis({type: 'textAnchor', value: e.target.value}))}
                      aria-label="Platform"
                    >
                      <ToggleButton value="start">start</ToggleButton>
                      <ToggleButton value="middle">middle</ToggleButton>
                      <ToggleButton value="end">end</ToggleButton>
                    </ToggleButtonGroup>
                  </>
                )}
                {yAxisSetting.hide ? null : (
                  <>
                    <Typography variant='caption'>Y-Axis</Typography>
                    <ToggleButtonGroup
                      value={yAxisSetting.textAnchor}
                      exclusive
                      size="small"
                      onChange={(e) => dispatch(setRechartYaxis({type: 'textAnchor', value: e.target.value}))}
                      aria-label="Platform"
                    >
                      <ToggleButton value="start">start</ToggleButton>
                      <ToggleButton value="middle">middle</ToggleButton>
                      <ToggleButton value="end">end</ToggleButton>
                    </ToggleButtonGroup>
                  </>
                )}
              </Stack>

              {/* axis angle */}
              <Typography variant='body2'>Text Angle</Typography>
              <Stack spacing={0} direction="column" sx={{ mt: 1, mb: 3 }} alignItems="left">
                {xAxisSetting.hide ? null : (
                  <>
                    <Typography variant="caption" id="input-slider">X-Axis</Typography>
                    <Stack spacing={1} direction='row' alignItems='left'>
                      <Slider
                        size="small"
                        value={scrollInputs.xAngle}
                        min={0}
                        step={10}
                        max={360}
                        marks={[
                          { value: 0 },
                          { value: 90 },
                          { value: 180 },
                          { value: 270 },
                          { value: 360 },
                        ]}
                        onChange={(_, value) => setScrollInputs((prev) => { return { ...prev, xAngle: value } })}
                        aria-labelledby="input-slider"
                      />
                      <Input
                        value={scrollInputs.xAngle}
                        size="small"
                        onChange={(e) => setScrollInputs((prev) => {
                          return { ...prev, xAngle: e.target.value === '' ? 0 : Number(e.target.value) }
                        })}
                        onBlur={() => {
                          if (scrollInputs.xAngle < 0) {
                            setScrollInputs((prev) => { return { ...prev, xAngle: 0 } })
                          } else if (scrollInputs.xAngle > 360) {
                            setScrollInputs((prev) => { return { ...prev, xAngle: 360 } })
                          }
                        }}
                        inputProps={{
                          step: 10,
                          min: 0,
                          max: 360,
                          type: 'number',
                          'aria-labelledby': 'input-slider',
                        }}
                      />
                    </Stack>
                  </>
                )}
                {yAxisSetting.hide ? null : (
                  <>
                    <Typography variant="caption" id="input-slider">Y-Axis</Typography>
                    <Stack spacing={1} direction='row' alignItems='left'>
                      <Slider
                        size="small"
                        value={scrollInputs.yAngle}
                        min={0}
                        step={10}
                        max={360}
                        marks={[
                          { value: 0 },
                          { value: 90 },
                          { value: 180 },
                          { value: 270 },
                          { value: 360 },
                        ]}
                        onChange={(_, value) => setScrollInputs((prev) => { return { ...prev, yAngle: value } })}
                        aria-labelledby="input-slider"
                      />
                      <Input
                        value={scrollInputs.yAngle}
                        size="small"
                        onChange={(e) => setScrollInputs((prev) => {
                          return { ...prev, yAngle: e.target.value === '' ? 0 : Number(e.target.value) }
                        })} 
                        onBlur={() => {
                          if (scrollInputs.yAngle < 0) {
                            setScrollInputs((prev) => { return { ...prev, yAngle: 0 } })
                          } else if (scrollInputs.yAngle > 360) {
                            setScrollInputs((prev) => { return { ...prev, yAngle: 360 } })
                          }
                        }}
                        inputProps={{
                          step: 10,
                          min: 0,
                          max: 360,
                          type: 'number',
                          'aria-labelledby': 'input-slider',
                        }}
                      />
                    </Stack>
                  </>
                )}
              </Stack>

              {/* font size */}
              <Typography variant='body2'>Font Size</Typography>
              <Stack spacing={0} direction="column" sx={{ mt: 1, mb: 3 }} alignItems="left">
                {xAxisSetting.hide ? null : (
                  <>
                    <Typography variant="caption" id="input-slider">X-Axis</Typography>
                    <Stack spacing={1} direction='row' alignItems='left'>
                      <Slider
                        size="small"
                        value={scrollInputs.xFont}
                        min={0}
                        step={1}
                        max={20}
                        onChange={(_, value) => setScrollInputs((prev) => { return { ...prev, xFont: value } })}
                        aria-labelledby="input-slider"
                      />
                      <Input
                        value={scrollInputs.xFont}
                        size="small"
                        onChange={(e) => setScrollInputs((prev) => {
                          return { ...prev, xFont: e.target.value === '' ? 0 : Number(e.target.value) }
                        })}
                        onBlur={() => {
                          if (scrollInputs.xFont < 0) {
                            setScrollInputs((prev) => { return { ...prev, xFont: 0 } })
                          } else if (scrollInputs.xFont > 20) {
                            setScrollInputs((prev) => { return { ...prev, xFont: 20 } })
                          }
                        }}
                        inputProps={{
                          step: 1,
                          min: 0,
                          max: 20,
                          type: 'number',
                          'aria-labelledby': 'input-slider',
                        }}
                      />
                    </Stack>
                  </>
                )}
                {yAxisSetting.hide ? null : (
                  <>
                    <Typography variant="caption" id="input-slider">Y-Axis</Typography>
                    <Stack spacing={1} direction='row' alignItems='left'>
                      <Slider
                        size="small"
                        value={scrollInputs.yFont}
                        min={0}
                        step={1}
                        max={20}
                        onChange={(_, value) => setScrollInputs((prev) => { return { ...prev, yFont: value } })}
                        aria-labelledby="input-slider"
                      />
                      <Input
                        value={scrollInputs.yFont}
                        size="small"
                        onChange={(e) => setScrollInputs((prev) => {
                          return { ...prev, yFont: e.target.value === '' ? 0 : Number(e.target.value) }
                        })}
                        onBlur={() => {
                          if (scrollInputs.yFont < 0) {
                            setScrollInputs((prev) => { return { ...prev, yFont: 0 } })
                          } else if (scrollInputs.yFont > 20) {
                            setScrollInputs((prev) => { return { ...prev, yFont: 20 } })
                          }
                        }}
                        inputProps={{
                          step: 1,
                          min: 0,
                          max: 20,
                          type: 'number',
                          'aria-labelledby': 'input-slider',
                        }}
                      />
                    </Stack>
                  </>
                )}
              </Stack>
            </>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default React.memo(RechartAxisSetting)
