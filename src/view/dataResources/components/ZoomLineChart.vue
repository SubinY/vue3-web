<template>
  <div class="line-chart-wrap">
    <div id="echart" ref="chartRef" :style="{ width, height }"></div>
  </div>
</template>

<script setup name="ZoomLineChart">
import { defineProps, ref, onMounted } from 'vue'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent
} from 'echarts/components'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { lineData } from '../lineData'
import { useResize } from '@/hooks/useResize'

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])

const props = defineProps({
  width: {
    type: [String, Number],
    default: '100%'
  },
  height: {
    type: [String, Number],
    default: '300px'
  }
})

const chartRef = ref()

const newData = {
  x: [],
  y: []
}
lineData.forEach(([x, y]) => {
  newData.x.push(x)
  newData.y.push(y)
})

const option = {
  tooltip: {
    trigger: 'axis',
    formatter(params) {
      for (let x in params) {
        return 'X: ' + params[x].axisValue + '</br>' + 'Y: ' + params[x].value
      }
    }
  },
  xAxis: {
    data: newData.x
    // boundaryGap: false
  },
  yAxis: {
    // type: 'value',
    // boundaryGap: [0, '100%']
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 100
    },
    {
      start: 0,
      end: 100
    }
  ],
  series: [
    {
      name: 'Fake Data',
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: {
        normal: {
          color: '#34349a'
        }
      },
      itemStyle: {
        normal: {
          color: 'rgba(0,0,0, 0)'
        }
      },
      data: newData.y
    }
  ]
}

onMounted(() => {
  const myChart = echarts.init(chartRef.value)
  useResize(() => myChart.resize())
  option && myChart.setOption(option)
})
</script>

<style lang="less" scoped>
.line-chart-wrap {
  width: 100%;
}
</style>
