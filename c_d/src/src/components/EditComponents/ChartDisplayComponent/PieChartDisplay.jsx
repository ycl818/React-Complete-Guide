import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Sector, Tooltip, XAxis } from 'recharts'

const PieChartDisplay = ({ data, xKey, yKey, styleSetting, otherSetting }) => {
  const {
    colorOption
  } = useSelector(state => {
    return {
      colorOption: state.chartSetting.color
    }
  })
  const [activeSlice, setActiveSlice] = useState(null)

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius - 5}
        outerRadius={outerRadius + 5}
        fill={fill}
      />
    )
  }

  const renderCustomizedLabel = (e) => {
    const RADIAN = Math.PI / 180;
    const radius = e.innerRadius + (e.outerRadius - e.innerRadius) * 0.7;

    const x = e.cx + radius * Math.cos(-e.midAngle * RADIAN);
    const y = e.cy + radius * Math.sin(-e.midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={'middle'} dominantBaseline="central">
        {styleSetting.label_text === 'percent' ? `${(e[styleSetting.label_text] * 100).toFixed(0)}%` : e[styleSetting.label_text]}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart >
        {otherSetting.RechartLegend.show ? (
          <Legend
            layout={otherSetting.RechartLegend.layout}
            align={otherSetting.RechartLegend.align}
            verticalAlign={otherSetting.RechartLegend.verticalAlign}
            payload={
              data.map(
                (item, idx) => ({
                  // id: item.name,
                  type: otherSetting.RechartLegend.iconType,
                  value: item[xKey],
                  color: colorOption[idx % 15],
                  payload: { strokeDasharray: "" }
                })
              )
            }
          />
        ): null}
        <Tooltip contentStyle={{ backgroundColor: '#555b66' }} cursor={{ stroke: '#333333' }} />
        <Pie
          data={data}
          dataKey={yKey[0]}
          nameKey={xKey}
          innerRadius={styleSetting.innerRadius}
          outerRadius={styleSetting.outerRadius}
          paddingAngle={styleSetting.paddingAngle}
          label={styleSetting.label ? renderCustomizedLabel : false}
          labelLine={false}
          isAnimationActive={false}
          activeIndex={activeSlice}
          activeShape={renderActiveShape}
          onMouseEnter={(_, index) => setActiveSlice(index)}
          onMouseOut={() => setActiveSlice(null)}
        >
          {data.map((item, idx) => (
            <Cell
              key={idx}
              fill={colorOption[idx % 15]}
              stroke={colorOption[idx % 15]}
              style={{ outline: 'none' }}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartDisplay
