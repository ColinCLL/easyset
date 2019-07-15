# 柱状图

`ec.barOption(option, deep)` 设置所有饼图的默认option。 `ec.barChart(data, option)`生成echart的option。

option配置项：
```
{
  legend: string, // 堆积图模式下必选，图例
  x: string, // 必选，x值
  y: string, // 必选，y值
  stack: boolean, // 堆积模式，true开启 默认false
  formatter: { // 格式化
    title: string, // 标题名称
    tooltip: string | function, // 提示信息
    xAxis: string | function, // x值的标签
    yAxis: string | function, // y值的标签
    xName: string, // x轴名称
    yName: string, // y轴名称
  }
}

```

## 普通柱状图
```js
// <div class="chart" id="bar"></div>
    let barData = [
      {name: "banana", value: 100, time: "1月1日"},  // 1月1日香蕉销量100
      {name: "apple", value: 200, time: "1月1日"}, // 1月1日苹果销量200
      {name: "orange", value: 240, time: "1月1日"}, // 1月1日苹果销量200
    ]
    let barOption = ec.barChart(barData, {
      x: "name",
      y: "value",
      formatter: {
        title: "图表标题"
      }
    });
    let bar = echarts.init(document.getElementById("bar"));
    bar.setOption(barOption);

```

<div class="chart" id="bar"></div>

## 柱状堆积图

<div class="chart" id="barStack"></div>

```js
    let barStackData = [
      {name: "banana", value: 100, time: "1月1日"},  // 1月1日香蕉销量100
      {name: "banana", value: 100, time: "1月2日"},  // 1月1日香蕉销量100
      {name: "apple", value: 200, time: "1月1日"}, // 1月1日苹果销量200
      {name: "orange", value: 240, time: "1月1日"}, // 1月1日苹果销量200
      {name: "apple", value: 200, time: "1月2日"}, // 1月1日苹果销量200
      {name: "orange", value: 240, time: "1月2日"}, // 1月1日苹果销量200
    ]
    let barStackOption = ec.barChart(barStackData, {
      legend: "time",
      x: "name",
      y: "value",
      stack: true, // 堆积模式
      formatter: {
        title: "图表标题"
      }
    });
    let barStack = echarts.init(document.getElementById("barStack"));
    barStack.setOption(barStackOption);
```

<script>
import echarts from 'echarts';
export default {
  mounted () {
    let ec = this.$ec

    let barData = [
      {name: "banana", value: 100, time: "1月1日"},  // 1月1日香蕉销量100
      {name: "apple", value: 200, time: "1月1日"}, // 1月1日苹果销量200
      {name: "orange", value: 240, time: "1月1日"}, // 1月1日苹果销量200
    ]
    let barOption = ec.barChart(barData, {
      x: "name",
      y: "value",
      formatter: {
        title: "图表标题"
      }
    });
    let bar = echarts.init(document.getElementById("bar"));
    bar.setOption(barOption);

    let barStackData = [
      {name: "banana", value: 100, time: "1月1日"},  // 1月1日香蕉销量100
      {name: "banana", value: 100, time: "1月2日"},  // 1月1日香蕉销量100
      {name: "apple", value: 200, time: "1月1日"}, // 1月1日苹果销量200
      {name: "orange", value: 240, time: "1月1日"}, // 1月1日苹果销量200
      {name: "apple", value: 200, time: "1月2日"}, // 1月1日苹果销量200
      {name: "orange", value: 240, time: "1月2日"}, // 1月1日苹果销量200
    ]
    let barStackOption = ec.barChart(barStackData, {
      legend: "time",
      x: "name",
      y: "value",
      stack: true,
      formatter: {
        title: "图表标题"
      }
    });
    let barStack = echarts.init(document.getElementById("barStack"));
    barStack.setOption(barStackOption);
  }
}
</script>

<style>
.chart {
  width: 90%;
  height: 400px;
}
</style>