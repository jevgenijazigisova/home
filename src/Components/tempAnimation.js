import React, { Component } from 'react'
import '../index.css'
import { fetchTemperature } from '../actions/index'
import { connect } from 'react-redux'

class TemperatureSpot extends Component {
    state = {
        temperature: ""
    }
    componentWillReceiveProps(nextProps) {
        const temperature = nextProps.temperature 
            ? nextProps.temperature.temp_c
            : ""
        this.setState({
            temperature: temperature
        })
    }
    componentWillMount() {
        this.props.fetchTemperature()
    }

    renderRGBA = () => {
        const temperature = Math.round(this.state.temperature)
        const tempChangePoint = 5
        let opacity = this.getOpacity()
        opacity = opacity.toFixed(2)
        const rgbString = ( temperature > tempChangePoint ) 
            ? `rgba(255, 111, 86, ${opacity})` 
            : `rgba(0, 21, 92, ${opacity})`
        return rgbString
    }
    
    getOpacity = () => {
        const maxTemp = 30
        const minTemp = -30
        const tempChangePoint = 5
       
        const currentTemp = Math.round(this.state.temperature)
        const isCold = ( currentTemp > tempChangePoint ) ? false : true

        const maxOpacity = 1
        const minOpacity = 0.2
        const opacityDiff = maxOpacity - minOpacity

        const tempDifference = isCold ? tempChangePoint - minTemp : maxTemp - tempChangePoint
        const tempRange = Math.abs(tempChangePoint - currentTemp)
        const diffPerOneDegree = opacityDiff / tempDifference
        const currentOpacity = minOpacity + diffPerOneDegree * tempRange
        
        return currentOpacity
    }
    render() {
        const color = this.renderRGBA()
        return (
            <div id="temp-bubble" className="col-1" style={{order: 4}}>
                <svg width='320' height='320' viewBox='-50 -50 320 320' xmlns='http://www.w3.org/2000/svg'>

                    <g id='Welcome' fill='none' fillRule='evenodd'>
                        <g id='Desktop-HD-Copy-11' transform='translate(-1104 -666)'>
                            <g id='Group-6' transform='translate(1067 640)'>
                                <g id='Oval'>
                                    <path fill={color} 
                                    className='path' d={`M111.692195,234.790293 C184.41961,216.536386 223.413416,153.726077 223.237635,97.2311713 C223.061854,40.7362657 182.290704,-1.35033246 118.453967,0.0331407357 C54.6172308,1.41661393 5.97429755,19.9309175 0.463561686,97.2311713 C-5.04717418,174.531425 38.9647802,253.044199 111.692195,234.790293 Z`} />
                                </g>
                            </g>
                        </g>
                    </g>
                </svg> 
            </div>
           
        )
    }
}

function mapStateToProps(state) {
    return { 
        temperature: state.data.temperature
    }
}
export default connect(mapStateToProps, {fetchTemperature})(TemperatureSpot)

