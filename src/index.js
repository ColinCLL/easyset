import jc from "jcalculator"
let ec = function (obj) {
  if (obj instanceof ec) return obj
  if (!(this instanceof ec)) return new ec(obj)
  this._wrapped = obj
}


// 版本
ec.VERSION = '1.0.0'


let opt = {}

//全局默认样式
opt.globalOption = {
  color: ["#1890FF", "#2FC25B", "#FACC14", "#223273", "#8543E0", "#13C2C2", "#3436C7", "#F04864"],
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    top: 48,
    left: 16,
    right: 16,
    bottom: 12,
    containLabel: true
  },
  title: {
    text: "",
    top: 4,
    left: 10,
    textStyle: {
      color: "#333"
    }
  },
  legend: {
    show: true,
    top: 8,
    right: 10
  },
}

/**
 * 格式化配置项
 * @param {object} option  图表配置项
 * @param {object} easySet easySet
 */
const setFormatter = (chartOption, easySet) => {
  let formatter = easySet.formatter
  if (!formatter) return {
    chartOption,
    easySet
  }

  let tooltip = chartOption.tooltip ? chartOption.tooltip : {},
    legend = chartOption.legend ? chartOption.legend : {},
    title = chartOption.title ? chartOption.title : {},
    xAxis = chartOption.xAxis && chartOption.xAxis[0] ? chartOption.xAxis[0] : {},
    yAxis = chartOption.yAxis && chartOption.yAxis[0] ? chartOption.yAxis[0] : {},
    xAxisLabel = xAxis.axisLabel = xAxis.axisLabel ? xAxis.axisLabel : {},
    yAxisLabel = yAxis.axisLabel = yAxis.axisLabel ? yAxis.axisLabel : {};

  if (formatter.tooltip) {
    tooltip.formatter = formatter.tooltip
  }

  if (formatter.legend) {
    legend.formatter = formatter.legend
  }

  if (formatter.xAxis) {
    xAxisLabel.formatter = formatter.xAxis
  }

  if (formatter.yAxis) {
    yAxisLabel.formatter = formatter.yAxis
  }

  if (formatter.xName) {
    xAxis.name = formatter.xName
  }

  if (formatter.yName) {
    yAxis.name = formatter.yName
  }

  if (formatter.title) {
    title.text = formatter.title
  }
  return {
    chartOption,
    easySet
  }
}

/**
 * 根据用户传入的配置和图表内置的配置输出相应echart选项
 * @param {object} option 外部用户传入的选项
 * @param {object} chartOpt 默认的图表选项
 */
const getOption = (option, chartOpt) => {
  let defaultOption = jc.extend(true, {}, opt.globalOption)
  defaultOption = jc.extend(true, defaultOption, chartOpt)
  let easySet
  if (option.easySet) {
    defaultOption = jc.extend(true, defaultOption, option)
    easySet = option.easySet
    delete defaultOption.easySet
  } else {
    easySet = option
  }

  let config = setFormatter(defaultOption, easySet)
  return config
}

/**
 * 多legend图表补点的方法（按照name完全对齐两个数据组的key，缺失数据默认值为0）
 * @param {array} data
 * @param {number} defaultValue
 */
const aligningGroupPoints = (data, defaultValue = 0) => {
  let keySets = new Set()
  let result = {}
  let groupData = {}
  data.forEach(item => {
    if (!groupData[item.name]) {
      groupData[item.name] = []
    }
    groupData[item.name].push(item)
  })
  Object.values(groupData).forEach(list => {
    list.forEach(item => {
      keySets.add(item.key)
    })
  })
  const keySetsList = [...keySets]
  Object.keys(groupData).forEach(groupKey => {
    let list = []
    keySetsList.forEach(uniKey => {
      const target = groupData[groupKey].find(item => item.key === uniKey)
      if (target) {
        list.push(target)
      } else {
        const { name = '', label = groupKey } = groupData[groupKey][0]
        list.push({ name, label, key: uniKey, value: defaultValue })
      }
    })
    result[groupKey] = list
  })
  return Object.values(result).reduce((prev, next) => prev.concat(next), [])
}

/******       图表        *********/

// 柱状图
opt.barOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: [{
    type: 'category',
    nameGap: 6
  }],
  yAxis: [{
    type: 'value',
    nameGap: 6
  }],
  series: [{
    type: 'bar'
  }]
}
ec.barChart = (data, option) => {
  let config = getOption(option, opt.barOption)
  let easySet = config.easySet
  let chartOption = config.chartOption
  let legendData = [], xAxisData = [], series = [], optSeries = chartOption.series[0]

  let legendGroup = jc.groupBy(data, easySet.legend)

  // 排序的数据
  let orderData = jc.sql({
    select: {
      col: {
        key: easySet.x
      },
      sum: {
        val: easySet.y
      }
    },
    from: data,
    groupBy: easySet.x,
    orderBy: easySet.orderBy ? { val: easySet.orderBy } : false
  })

  orderData.map(row => {
    let x = row["key"]
    xAxisData.push(x)
  })

  jc.forIn(legendGroup, (key, val) => {
    // let arr = jc.keyArray(val, [easySet.y])
    let newSeries = jc.extend(true, {}, optSeries)
    let index = jc.index(val, easySet.x)

    legendData.push(key)
    newSeries.data = []
    jc.map(xAxisData, row => {
      newSeries.data.push(index[row][easySet.y])
    })
    newSeries.name = key
    if (easySet.stack) newSeries.stack = '总量'
    series.push(newSeries)
  })

  chartOption.series = series
  chartOption.legend.data = legendData
  chartOption.xAxis[0].data = xAxisData

  if (easySet.direction === 'horizontal') {
    let t
    t = chartOption.xAxis[0]
    chartOption.xAxis[0] = chartOption.yAxis[0]
    chartOption.yAxis[0] = t
  }

  return chartOption
}


// 线图
opt.lineOption = {
  xAxis: [{
    type: 'category',
    boundaryGap: false
  }],
  yAxis: [{
    type: 'value'
  }],
  series: [{
    type: 'line'
  }]
}
ec.lineChart = (data, option) => {
  let config = getOption(option, opt.lineOption)
  let easySet = config.easySet
  let chartOption = config.chartOption
  let legendData = [], xAxisData = [], series = [], optSeries = chartOption.series[0]

  let legendGroup = jc.groupBy(data, easySet.legend)

  // 排序的数据
  let orderData = jc.sql({
    select: {
      col: {
        key: easySet.x
      },
      sum: {
        val: easySet.y
      }
    },
    from: data,
    groupBy: easySet.x,
    orderBy: easySet.orderBy ? { val: easySet.orderBy } : false
  })
  orderData.map(row => {
    let x = row["key"]
    xAxisData.push(x)
  })

  jc.forIn(legendGroup, (key, val) => {
    let arr = jc.keyArray(val, [easySet.y])
    let newSeries = jc.extend(true, {}, optSeries)
    let index = jc.index(val, easySet.x)

    legendData.push(key)
    newSeries.data = []
    jc.map(xAxisData, row => {
      newSeries.data.push(index[row])
    })
    newSeries.name = key

    if (easySet.stack) {
      newSeries.stack = '总量'
      if (!newSeries.areaStyle) newSeries.areaStyle = { normal: {} }
    }
    series.push(newSeries)
  })

  chartOption.series = series
  chartOption.legend.data = legendData
  chartOption.xAxis[0].data = xAxisData

  if (easySet.direction === 'horizontal') {
    let t
    t = chartOption.xAxis[0]
    chartOption.xAxis[0] = chartOption.yAxis[0]
    chartOption.yAxis[0] = t
  }

  return chartOption
}



// 饼图
opt.pieOption = {
  tooltip: {
    trigger: 'item',
    formatter: "{b}: {c} ({d}%)"
  },
  series: [
    {
      name: ' ',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
    }
  ]
}

ec.pieChart = (data, option) => {
  let config = getOption(option, opt.pieOption)
  let easySet = config.easySet
  let chartOption = config.chartOption
  let pieData = [], legendData = []

  pieData = jc.sql({
    select: {
      col: {
        name: easySet.legend,
        value: easySet.val
      }
    },
    from: data,
    orderBy: easySet.orderBy ? { value: easySet.orderBy } : false
  })

  legendData = (jc.keyArray(pieData, ['name']))['name']
  chartOption.series[0].data = pieData
  chartOption.legend.data = legendData
  return chartOption

}

// k图
opt.kOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: [{
    type: 'category'
  }],
  yAxis: [{
    type: 'value',
  }],
  series: [{
    type: 'k',
    itemStyle: {
      normal: {
        color: opt.globalOption.color[0],
        color0: opt.globalOption.color[0],
        borderColor: opt.globalOption.color[0],
        borderColor0: opt.globalOption.color[0]
      }
    },
  }]
}
ec.kChart = (data, option) => {
  let config = getOption(option, opt.kOption)
  let easySet = config.easySet
  let chartOption = config.chartOption
  let legendData = [], xAxisData = [], optSeries = chartOption.series[0]

  let legendGroup = jc.groupBy(data, easySet.legend)

  // 排序的数据
  let orderData = jc.sql({
    select: {
      col: {
        key: easySet.x,
        val: easySet.y
      },
    },
    from: data,
    groupBy: easySet.x,
    orderBy: easySet.orderBy ? { val: easySet.orderBy } : false
  })

  orderData.map(row => {
    let x = row["key"]
    xAxisData.push(x)
  })

  let newSeries = jc.extend(true, {}, optSeries)
  newSeries.data = []
  jc.forIn(legendGroup, (key, val) => {
    let arr = jc.keyArray(val, [easySet.y])
    let index = jc.index(val, easySet.x)

    legendData.push(key)
    jc.map(xAxisData, row => {
      newSeries.data.push(index[row][easySet.y])
    })
  })
  chartOption.series = newSeries
  // chartOption.legend.data = legendData
  chartOption.xAxis[0].data = xAxisData

  if (easySet.direction === 'horizontal') {
    let t
    t = chartOption.xAxis[0]
    chartOption.xAxis[0] = chartOption.yAxis[0]
    chartOption.yAxis[0] = t
  }

  return chartOption
}



// 地图
opt.mapOption = {
  color: ['#9d70e3', '#9d70e3'],
  tooltip: {
    trigger: 'item'
  },
  visualMap: {
    min: 0,
    // max: obj.max,
    left: 'left',
    top: 'bottom',
    text: ['高', '低'],           // 文本，默认为数值文本
    calculable: true,
    inRange: { color: ['#ddf5ff', '#5fb0ff'] }
  },
  legend: {
    show: false,
    orient: 'vertical',
    top: 'bottom',
    left: 'right',
    //,selectedMode: 'single'
  },
  series: [
    {
      name: '地图',
      type: 'map',
      mapType: "", //
      itemStyle: {
        normal: { label: { show: true } },
        emphasis: { label: { show: false } }
      },
      data: []
    }
  ]
};

ec.mapChart = (data, option) => {
  let config = getOption(option, opt.mapOption)
  let easySet = config.easySet
  let chartOption = config.chartOption
  let regionDic = {};

  let regionData = jc.sql({
    select: {
      col: {
        name: easySet.region,
        value: (row) => {
          let value = 0
          jc.map(easySet.val, d => {
            regionDic[easySet.region] = row
            value += row[d]
          })
          return value
        }
      }
    },
    from: data
  })
  let max = jc.max(regionData, "value")
  delete chartOption.xAxis
  delete chartOption.yAxis
  chartOption.visualMap.max = max.value
  chartOption.series[0].data = regionData
  chartOption.series[0].mapType = easySet.mapType

  return chartOption
}


// 盒须图
opt.boxplotOption = {
  "tooltip": {
    "trigger": 'item',
    "formatter": function (p) {
      let str = `${p.name}<br/>
        最大值: ${p.data[5]}<br/>
        上四分位: ${p.data[4]}<br/>
        中位数: ${p.data[3]}<br/>
        下四分位: ${p.data[2]}<br/>
        最小值: ${p.data[1]}
        `
      return str
    }
  },
  "xAxis": [{
    "type": "category",
    "boundaryGap": true,
    "nameGap": 30,
    "splitArea": {
      "show": false
    },
    "splitLine": {
      "show": false
    },
    "data": []
  }],
  "yAxis": [{
    "type": "value",
  }],
  "series": [
    {
      "name": "boxplot",
      "type": "boxplot",
    },
  ]
};
ec.boxplotChart = (data, option) => {
  let config = getOption(option, opt.boxplotOption)
  let easySet = config.easySet
  let chartOption = config.chartOption
  let legendData = [], xAxisData = [], series = [], optSeries = chartOption.series[0]
  let lengendGroup = jc.groupBy(data, easySet.legend)
  let xGroup = jc.groupBy(data, easySet.x)

  jc.forIn(xGroup, (key) => {
    xAxisData.push(key)
  })

  jc.forIn(lengendGroup, (key, val) => {
    let newSeries = jc.extend(true, {}, optSeries)
    let index = jc.index(val, easySet.x)

    legendData.push(key)
    newSeries.data = []
    jc.map(xAxisData, row => {
      let arr = []
      easySet.y.map(d => {
        arr.push(index[row][d])
      })
      newSeries.data.push(arr.sort((a, b) => {
        return a - b
      }))
    })
    newSeries.name = key
    series.push(newSeries)
  });
  chartOption.series = series
  chartOption.legend.data = legendData
  chartOption.xAxis[0].data = xAxisData
  return chartOption
}


// ks图
opt.ksOption = {
  tooltip: {
    formatter(params) {
      let str = ""
      params.map(row => {
        let value = row.value;
        str += row.marker + row.seriesName + "-" + row.data.type + ":" + value + "<br>";
      });
      return str;
    }
  },
  xAxis: [{
    type: 'category',
    boundaryGap: false
  }],
  yAxis: [{
    type: 'value'
  }],
  series: [{
    type: 'line',
    markLine: {
      animation: false,
      // label: {
      // 	normal: {
      // 		formatter: 'y = 0.5 * x + 3',
      // 		textStyle: {
      // 			align: 'right'
      // 		}
      // 	}
      // },
      lineStyle: {
        normal: {
          type: 'solid'
        }
      },
      // tooltip: {
      // 	formatter: 'y = 0.5 * x + 3'
      // },
      data: [[{
        coord: [],
        symbol: 'none'
      }, {
        coord: [],
        symbol: 'none'
      }]]
    }
  }, {
    type: 'line'
  },]
}
ec.ksChart = (data, option) => {
  let config = getOption(option, opt.ksOption)
  let easySet = config.easySet
  let chartOption = config.chartOption
  let legendData = [], xAxisData = [], series = []
  if (easySet.aligningPoint) {
    data = aligningGroupPoints(data, 0)
  }
  let legendGroup = jc.groupBy(data, easySet.legend)
  // 排序的数据
  let orderData = jc.sql({
    select: {
      col: {
        key: easySet.x
      },
      sum: {
        val: easySet.y
      }
    },
    from: data,
    groupBy: easySet.x,
    orderBy: easySet.orderBy ? { val: easySet.orderBy } : false
  })
  orderData.map(row => {
    let x = row["key"]
    xAxisData.push(x)
  })
  jc.forIn(legendGroup, (key, val, i) => {

    legendData.push(key) // 设置图例

    let optSeries = jc.extend(true, {}, chartOption.series[0]);
    let optSeries1 = jc.extend(true, {}, chartOption.series[1]);

    let typeGroup = jc.groupBy(val, easySet.type) // 根据类型分组
    let xGroup = jc.groupBy(val, easySet.x) // x分组，为了获取最大的差
    let Xmax = [], max = 0
    jc.forIn(xGroup, (k, v) => {
      let gap = v[0][easySet.y] - v[1][easySet.y]
      let abs = Math.abs(gap)
      if (abs > max) {
        Xmax = v
        max = abs
      }
    })
    let markDate = optSeries.markLine.data[0]
    markDate[0].coord = [Xmax[0][easySet.x], Xmax[0][easySet.y]]
    markDate[1].coord = [Xmax[1][easySet.x], Xmax[1][easySet.y]]
    jc.forIn(typeGroup, (k, v, i) => {
      let newSeries = jc.extend(true, {}, i == 0 ? optSeries : optSeries1)
      let index = jc.index(v, easySet.x)
      newSeries.data = []
      jc.map(xAxisData, row => {
        newSeries.data.push({
          type: index[row][easySet.type],
          value: index[row][easySet.y],
          y: index[row][easySet.y],
          x: index[row][easySet.x],
          legend: index[row][easySet.legend]
        })
      })
      newSeries.name = key // 设置图例
      series.push(newSeries)
    })
  })

  chartOption.series = series
  chartOption.legend.data = legendData
  chartOption.xAxis[0].data = xAxisData

  if (easySet.direction === 'horizontal') {
    let t
    t = chartOption.xAxis[0]
    chartOption.xAxis[0] = chartOption.yAxis[0]
    chartOption.yAxis[0] = t
  }

  return chartOption
}


// 修改图表默认样式
jc.forIn(opt, (key, val) => {
  ec[key] = (option, deep) => {
    if (!deep) {
      val = jc.extend(val, option)
    } else {
      val = jc.extend(true, val, option)
    }
  }
})

export default ec;