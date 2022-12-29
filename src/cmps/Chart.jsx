import React from 'react'

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts"

export default function Chart({ data, title, unit, period, color }) {

    const stats = data.map(coords => ({ [period]: new Date(coords.x * 1000).toLocaleDateString(), [unit]: coords.y }))

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">
              <p className="label">{`Day: ${label}`}</p>
              <p className="label">{`${unit}: ${payload[0].value}`}</p>
              {/* <p className="desc">Anything you want can be displayed here.</p> */}
            </div>
          );
        }
      
        return null;
      };

    return (
        <section className='chart'>
            <h3>{title}</h3>
            <AreaChart
                width={800}
                height={250}
                data={stats}
                margin={{
                    top: 10,
                    right: 0,
                    left: 0,
                    bottom: 0
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={period} />
                <YAxis tickFormatter={num => {
                    if(num > 1000000) {
                        console.log( num/1000000 , num);
                        return num/1000000 + 'M'
                    }
                    return num.toLocaleString()
                }} />
                 <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey={unit} stroke={'white'} fill={color} />
            </AreaChart>
        </section>
    )
}
