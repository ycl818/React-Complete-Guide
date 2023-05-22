import React from 'react'
import { useSelector } from 'react-redux'
import { Area, Bar, CartesianGrid, ComposedChart, Label, LabelList, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const ComposeDisplay = ({ data, xKey, styleSetting, otherSetting }) => {
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
      <ComposedChart
        data={data}
        layout={styleSetting.AreaSetting.layout}
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
          dataKey={styleSetting.AreaSetting.layout === 'horizontal' ? xKey : null }
          // dataKey={chartData.xKey}
          type={styleSetting.AreaSetting.layout === 'horizontal' ? 'category' : 'number'}
          // type={otherSetting.RechartXaxis.type}
          hide={otherSetting.RechartXaxis.hide}
          orientation={otherSetting.RechartXaxis.orientation}
          textAnchor={otherSetting.RechartXaxis.textAnchor}
          interval={otherSetting.RechartXaxis.interval}
          angle={otherSetting.RechartXaxis.angle}
          fontSize={otherSetting.RechartXaxis.fontSize}
          padding={otherSetting.RechartXaxis.padding}
          // tickFormatter={tickFormatter}
          tickFormatter={styleSetting.AreaSetting.layout === 'horizontal' ? tickFormatter : null}
          tick={{fill: '#c4c4c4'}}
        >
          {otherSetting.RechartXaxis.label_hide ? null : (
            <Label value={otherSetting.RechartXaxis.label_value} angle={0} position={otherSetting.RechartXaxis.label_position} />
          )}
        </XAxis>
        <YAxis
          dataKey={styleSetting.AreaSetting.layout === 'vertical' ? xKey : null }
          type={styleSetting.AreaSetting.layout === 'vertical' ? 'category' : 'number'}
          // type={otherSetting.RechartYaxis.type}
          hide={otherSetting.RechartYaxis.hide}
          orientation={otherSetting.RechartYaxis.orientation}
          textAnchor={otherSetting.RechartYaxis.textAnchor}
          interval={otherSetting.RechartYaxis.interval}
          angle={otherSetting.RechartYaxis.angle}
          fontSize={otherSetting.RechartYaxis.fontSize}
          padding={otherSetting.RechartYaxis.padding}
          tickFormatter={styleSetting.AreaSetting.layout === 'vertical' ? tickFormatter : null}
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
            wrapperStyle={otherSetting.RechartLegend.layout === 'vertical' ?
              { paddingLeft: "30px", height: '80%', overflow: 'auto' } :
              otherSetting.RechartLegend.verticalAlign === 'top' ? { paddingBottom: "15px" } : { paddingTop: "15px" }
            }
            // iconType={otherSetting.RechartLegend.iconType}
          />
        ) : null}
        <Tooltip
          contentStyle={{ backgroundColor: 'rgba(85, 91, 102, 0.8)', borderColor: '#555b66', textAnchor: 'start'}}
          wrapperStyle={{ height: '150px', overflow: 'auto', pointerEvents: 'auto' }}
          position={{ y: 0 }}
        />
        
        {styleSetting.keys.BarKey.map((y, idx) => (
          <Bar
            key={'bar' + y}
            dataKey={y}
            stackId={styleSetting.BarSetting.stackId}
            stroke={colorOption[idx % 15]}
            fill={colorOption[idx % 15]}
            fillOpacity={styleSetting.BarSetting.fillOpacity}
          >
            {styleSetting.BarSetting.label_show ? (
              <LabelList dataKey={y} position={styleSetting.BarSetting.label_position} />
            ) : null}
          </Bar>
        ))}
        {styleSetting.keys.LineKey.map((y, idx) => (
          <Line
            key={'line' + y}
            dataKey={y}
            type={styleSetting.LineSetting.type}
            dot={styleSetting.LineSetting.dot}
            activeDot={styleSetting.LineSetting.activeDot}
            strokeWidth={styleSetting.LineSetting.strokeWidth}
            stroke={colorOption[(idx + styleSetting.keys.BarKey.length) % 15]}
            connectNulls
          />
        ))}
        {styleSetting.keys.AreaKey.map((y, idx) => (
          <Area
            key={'area' + y}
            dataKey={y}
            type={styleSetting.AreaSetting.type}
            stackId={styleSetting.AreaSetting.stackId}
            dot={styleSetting.AreaSetting.dot}
            activeDot={styleSetting.AreaSetting.activeDot}
            strokeWidth={styleSetting.AreaSetting.strokeWidth}
            fillOpacity={styleSetting.AreaSetting.fillOpacity}
            stroke={colorOption[(idx + styleSetting.keys.BarKey.length + styleSetting.keys.LineKey.length) % 15]}
            fill={colorOption[(idx + styleSetting.keys.BarKey.length + styleSetting.keys.LineKey.length) % 15]}
            connectNulls
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default ComposeDisplay
