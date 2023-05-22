import React from 'react'
import { useSelector } from 'react-redux'
import { Area, AreaChart, CartesianAxis, CartesianGrid, Label, LabelList, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'


const AreaChartDisplay = ({ data, xKey, yKey, styleSetting, otherSetting }) => {
  const {
    colorOption
  } = useSelector(state => {
    return {
      colorOption: state.chartSetting.color
    }
  })

  const tickFormatter = (value) => {
    const limit = 6; // put your maximum character
    let v = String(value)
    if (v.length <= limit) return v;
    return `${v.slice(0, limit)}...`;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        layout={styleSetting.layout}
        margin={{
          top: 20,
          right: 30,
          bottom: 55
        }}
      >
        <CartesianGrid
          strokeDasharray={otherSetting.RechartPanel.stroke}
          opacity={otherSetting.RechartPanel.strokeOpacity}
        />
        <XAxis
          dataKey={styleSetting.layout === 'horizontal' ? xKey : null }
          type={styleSetting.layout === 'horizontal' ? 'category' : 'number'}
          hide={otherSetting.RechartXaxis.hide}
          orientation={otherSetting.RechartXaxis.orientation}
          textAnchor={otherSetting.RechartXaxis.textAnchor}
          interval={otherSetting.RechartXaxis.interval}
          angle={otherSetting.RechartXaxis.angle}
          fontSize={otherSetting.RechartXaxis.fontSize}
          padding={otherSetting.RechartXaxis.padding}
          // tickFormatter={tickFormatter}
          tickFormatter={styleSetting.layout === 'horizontal' ? tickFormatter : null}
          tick={{fill: '#c4c4c4'}}
        >
          {otherSetting.RechartXaxis.label_hide ? null : (
            <Label value={otherSetting.RechartXaxis.label_value} angle={0} position={otherSetting.RechartXaxis.label_position} />
          )}
        </XAxis>
        <YAxis
          dataKey={styleSetting.layout === 'vertical' ? xKey : null }
          type={styleSetting.layout === 'vertical' ? 'category' : 'number'}
          hide={otherSetting.RechartYaxis.hide}
          orientation={otherSetting.RechartYaxis.orientation}
          textAnchor={otherSetting.RechartYaxis.textAnchor}
          interval={otherSetting.RechartYaxis.interval}
          angle={otherSetting.RechartYaxis.angle}
          fontSize={otherSetting.RechartYaxis.fontSize}
          padding={otherSetting.RechartYaxis.padding}
          tickFormatter={styleSetting.layout === 'vertical' ? tickFormatter : null}
          tick={{fill: '#c4c4c4'}}
        >
          {otherSetting.RechartYaxis.label_hide ? null : (
            <Label value={otherSetting.RechartYaxis.label_value} angle={180} position={otherSetting.RechartYaxis.label_position} />
          )}
        </YAxis>
        {otherSetting.RechartLegend.show ? (
          <Legend
            layout={otherSetting.RechartLegend.layout}
            align={otherSetting.RechartLegend.align}
            verticalAlign={otherSetting.RechartLegend.verticalAlign}
            iconType={otherSetting.RechartLegend.iconType}
            wrapperStyle={otherSetting.RechartLegend.layout === 'vertical' ?
              { paddingLeft: "30px", height: '80%', overflow: 'auto' } :
              otherSetting.RechartLegend.verticalAlign === 'top' ? { paddingBottom: "15px" } : { paddingTop: "15px" }
            }
          />
        ) : null}
        <Tooltip
          contentStyle={{ backgroundColor: 'rgba(85, 91, 102, 0.9)', borderColor: '#555b66', textAnchor: 'start'}}
          wrapperStyle={{ height: '150px', overflow: 'auto', pointerEvents: 'auto' }}
          position={{ y: 0 }}
        />
        {
          yKey.map((y, idx) => (
            <Area
              key={y}
              dataKey={y}
              type={styleSetting.type}
              stackId={styleSetting.stackId}
              dot={styleSetting.dot}
              activeDot={styleSetting.activeDot}
              strokeWidth={styleSetting.strokeWidth}
              fillOpacity={styleSetting.fillOpacity}
              stroke={colorOption[idx % 15]}
              fill={colorOption[idx % 15]}
              connectNulls
            />
          ))
        }
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChartDisplay
