# 盒须图

`ec.boxplotOption(option, deep)` 设置所有盒须图的默认option。 `ec.boxplotChart(data, option)`生成echart的option。

option 配置项：
```js
{
  legend: string, // 必选，图例
  x: string, // 必选，x值
  y: array, // 必须, y值,例如["Q1", "mediam", "Q3", "max", "min"],5个值,无顺序要求
  formatter: { // 格式化
    title: string, // 标题名称
    tooltip: string | function, // 提示信息
    legend: string | function, // 图例
  }
}

```


```js
// <div class="chart" id="boxplot"></div>
let boxplotData = [
    { min: 710, Q1: 850, mediam: 940, Q3: 980, max: 1070, name: "test", type: "1" },
    { min: 601, Q1: 800, mediam: 940, Q3: 980, max: 1000, name: "test1", type: "1" },
    { min: 710, Q1: 850, mediam: 940, Q3: 980, max: 1070, name: "test", type: "2" },
    { min: 601, Q1: 800, mediam: 940, Q3: 980, max: 1000, name: "test1", type: "2" },
];
let boxplotOption = ec.boxplotChart(boxplotData, {
    legend: "type",
    y: ["Q1", "mediam", "Q3", "max", "min"],
    x: "name",
    formatter: {
        title: "盒须图"
    }
});
let boxplot = echarts.init(document.getElementById("boxplot"));
boxplot.setOption(boxplotOption);

```

<div class="chart" id="boxplot"></div>

<script>
import echarts from 'echarts';
export default {
  mounted () {
    let ec = this.$ec

    let boxplotData = [
      { min: 710, Q1: 850, mediam: 940, Q3: 980, max: 1070, name: "test", type: "1" },
      { min: 601, Q1: 800, mediam: 940, Q3: 980, max: 1000, name: "test1", type: "1" },
      { min: 710, Q1: 850, mediam: 940, Q3: 980, max: 1070, name: "test", type: "2" },
      { min: 601, Q1: 800, mediam: 940, Q3: 980, max: 1000, name: "test1", type: "2" },
    ];
    let boxplotOption = ec.boxplotChart(boxplotData, {
      legend: "type",
      y: ["Q1", "mediam", "Q3", "max", "min"],
      x: "name",
      formatter: {
        title: "盒须图"
      }
    });
    let boxplot = echarts.init(document.getElementById("boxplot"));
    boxplot.setOption(boxplotOption);
  }
}
</script>

<style>
.chart {
  width: 90%;
  height: 400px;
}
</style>