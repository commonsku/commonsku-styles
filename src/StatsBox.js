import React from 'react'
import './App.css'
import sparkline from './sparkline.png'
import expand from './icons/expand.png'


class GlobalSearch extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <div className="box stats-box" style={{ width: this.props.width }}>
                    <div class="expand">
                        <h3>Key Performance Indicators</h3>
                        <img src={expand}/>
                    </div>
                    { 
                        this.props.stats.map(
                            (stat) => {
                                return <div className="spark-section">
                                    <h4>{stat}</h4>
                                    <img src={sparkline}/>
                                    <span className="value">{Math.floor(Math.random() * 100)}%</span>
                                </div>
                            }
                        )
                    }
               </div>
    }
}

export default GlobalSearch;