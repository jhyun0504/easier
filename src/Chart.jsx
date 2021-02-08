import React from 'react'
import c3 from 'c3'
import 'c3/c3.css'


class Chart extends React.Component {
  chartEl = null

  chart = null

  generateChart = () => {
    this.chart = c3.generate({
      bindto: this.chartEl,
      ...this.props.config,
      legend: {
        ...this.props.config.legend,
        item: {
          onclick: id => {
            if (this.chart) {
              // this is to focus on the selected legend instead of focus out
              if (
                this.chart.internal.hiddenTargetIds.length &&
                !this.chart.internal.hiddenTargetIds.includes(id)
              ) {
                this.chart.show()
              } else {
                this.chart.hide()
                this.chart.show(id, { withLegend: true })
              }
            }
          }
        }
      }
    })
  }

  componentWillUnmount() {
    this.chart = null
  }

  componentDidMount() {
    this.generateChart()
  }

  componentDidUpdate() {
    this.chart = null
    this.generateChart()
  }

  render() {
    return <div ref={el => (this.chartEl = el)}></div>
  }
}

export default Chart
