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
    const limit = 5; // put your maximum character
    
    if (value.length <= limit) return value;
    return `${value.slice(0, limit)}...`;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} layout={styleSetting.layout}>
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
          />
        ) : null}
        <Tooltip contentStyle={{ backgroundColor: '#555b66' }} cursor={{ stroke: '#333333' }} />
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
