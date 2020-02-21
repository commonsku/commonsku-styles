import React from 'react'

import sparkline from './sparkline.png'
import expand from './icons/expand.png'


const GlobalSearch = ({ stats, width }: {stats: string[], width: number|string}) => {
  return <div className="box stats-box" style={{ width }}>
    <div className="expand">
      <h3>Key Performance Indicators</h3>
      <img src={expand} alt="expand"/>
    </div>
    {stats.map((stat) => {
      return <div className="spark-section">
        <h4>{stat}</h4>
        <img src={sparkline} alt="sparkline"/>
        <span className="value">{Math.floor(Math.random() * 100)}%</span>
      </div>
    })}
  </div>
}

export default GlobalSearch;