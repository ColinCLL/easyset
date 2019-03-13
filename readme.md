## easycharts

对echarts option的上层封装，让用户所见即所思所的图表工具。

```js

ec.lineChart(data, {
  x: "name",
  y: "value",
  legend: "type",
  formatter: {
    tooltip: "xxx",
    xName: "(单位：$)",
    yName: "(单位：day)",
    title: "图表名称"
  }
})

```