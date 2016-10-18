import React from 'react'
import styles from './style.css'
import * as d3 from 'd3'
import geojson from '../../worldmap.json'
import { feature } from 'topojson'

const countries = feature(geojson, geojson.objects.land)

export default class CountryMap extends React.Component {

  static propTypes = {
    centerLat: React.PropTypes.number.isRequired,
    centerLng: React.PropTypes.number.isRequired,
  }

  render() {
    var width = 130
    var height = 130

    const {centerLat, centerLng} = this.props

    var projection = d3.geoOrthographic()
        .scale(65)
        .rotate([-centerLng, -centerLat, 0])
        .translate([width / 2, height / 2])
        .precision(0.1)

    const geoPath = d3.geoPath()
        .projection(projection)

    return (
      <div>
        <svg width={width} height={height} ref={(svg) => { this.svg = d3.select(svg) }}>
          <circle className={styles.sea} cx={width / 2} cy={height / 2} r={width / 2}></circle>
          <path className={styles.land} d={geoPath(countries)}></path>
          <path transform="translate(52,42) scale(0.05)" fill="#FFDA44" d="M269.061,484.131c-3.185,8.461-11.255,14.049-20.273,14.089c-9.028,0.029-17.147-5.501-20.39-13.913c-44.034-114.321-132.63-261.205-132.63-330.964C95.767,68.801,164.539,0,249.12,0c84.541,0,153.333,68.801,153.333,153.343C402.462,223.307,312.557,368.579,269.061,484.131z M249.12,29.164c-66.32,0-120.261,53.941-120.261,120.232c0,66.33,53.941,120.3,120.261,120.3c66.3,0,120.241-53.951,120.241-120.3C369.351,83.105,315.42,29.164,249.12,29.164z"/>
        </svg>
      </div>
    )
  }
}