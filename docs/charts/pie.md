# 饼图

`ec.pieOption(option, deep)` 设置所有饼图的默认option。 `ec.pieChart(data, option)`生成echart的option。

option 配置项：
```js
{
  legend: string, // 必选，图例
  val: string, // 必选，值
  formatter: { // 格式化
    title: string, // 标题名称
    tooltip: string | function, // 提示信息
  }
}

```


```js
// <div class="chart" id="pie"></div>
let pieData = [
  {name: "banana", value: 100, time: "1月1日"},  // 1月1日香蕉销量100
  {name: "apple", value: 200, time: "1月1日"}, // 1月1日苹果销量200
  {name: "orange", value: 240, time: "1月1日"}, // 1月1日苹果销量200
]
let pieOption = ec.barChart(pieData, {
  legend: "time",
  x: "name",
  y: "value",
  formatter: {
    title: "图表标题", // 设置标题
    tooltip(p) { // 设置tooltip
      return `${p.marker}${p.name}: ${p.value}%`;
    }
  }
});
let pie = echarts.init(document.getElementById("pie"));
pie.setOption(pieOption);

```

<div class="chart" id="pie"></div>

<script>
import echarts from 'echarts';
export default {
  mounted () {
    let ec = this.$ec

    let pieData = [
      {name: "banana", value: 100, time: "1月1日"},  // 1月1日香蕉销量100
      {name: "apple", value: 200, time: "1月1日"}, // 1月1日苹果销量200
      {name: "orange", value: 240, time: "1月1日"}, // 1月1日苹果销量200
    ]
    let pieOption = ec.pieChart(pieData, {
      legend: "name",
      val: "value",
      formatter: {
        title: "图表标题",
        tooltip(p) {
          return `${p.marker}${p.name}: ${p.value}(${p.percent}%)`;
        }
      }
    });
    let pie = echarts.init(document.getElementById("pie"));
    pie.setOption(pieOption);
  }
}
</script>

<style>
.chart {
  width: 90%;
  height: 400px;
}
</style>