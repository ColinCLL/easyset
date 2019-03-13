
(function () {
  // 多种环境支持，以及一些零碎开头引用了underscore的代码，致敬经典。
  let root = typeof self == 'object' && self.self === self && self ||
    typeof global == 'object' && global.global === global && global || this
  // 保存ec
  let previousec = root.ec
  // 原型赋值，便于压缩
  let ArrayProto = Array.prototype, ObjProto = Object.prototype
  let push = ArrayProto.push,
    slice = ArrayProto.slice,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty
  // 定义了一些ECMAScript 5方法
  let nativeIsArray = Array.isArray,
    nativeKeys = Object.keys,
    nativeValues = Object.values ? Object.values : function (obj) {
      return nativeKeys(obj).map(function (key) {
        return obj[key]
      })
    },
    nativeCreate = Object.create

  // 创建一个ec对象, 保留将来有拓展成支持链式的可能
  let ec = function (obj) {
    if (obj instanceof ec) return obj
    if (!(this instanceof ec)) return new ec(obj)
    this._wrapped = obj
  }
  //  针对不同的环境
  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = ec
    }
    exports.ec = ec
  } else {
    root.ec = ec
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
      xAxisLabel = xAxis.axisLabel ? xAxis.axisLabel : {},
      yAxisLabel = yAxis.axisLabel ? yAxis.axisLabel : {};

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
      type: 'category'
    }],
    yAxis: [{
      type: 'value'
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

  // 对AMD支持的一些处理
  if (typeof define == 'function' && define.amd) {
    define('ec', [], function () {
      return ec
    })
  }
}())