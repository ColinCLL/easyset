# 柱状图

`ec.barOption(option, deep)` 设置所有饼图的默认option。 `ec.barChart(data, option)`生成echart的option。

option 配置项：
```js
{
  legend: string, // 堆积图模式下必选，图例
  x: string, // 必选，x值
  y: string, // 必选，y值
  stack: boolean, // 堆积模式，true开启 默认false
  direction: "horizontal", // 横向的图表
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

## 分组柱状图
```js
    let barData = [
      {name: "banana", value: 100, time: "1月1日"},  // 1月1日香蕉销量100
      {name: "banana", value: 100, time: "1月2日"},  // 1月1日香蕉销量100
      {name: "apple", value: 200, time: "1月1日"}, // 1月1日苹果销量200
      {name: "orange", value: 240, time: "1月1日"}, // 1月1日苹果销量200
      {name: "apple", value: 200, time: "1月2日"}, // 1月1日苹果销量200
      {name: "orange", value: 240, time: "1月2日"}, // 1月1日苹果销量200
    ]
    let barOption = ec.barChart(barStackData, {
      legend: "time",
      x: "name",
      y: "value",
      stack: true, // 堆积模式
      formatter: {
        title: "图表标题"
      }
    });

```

<div class="chart" id="normal"></div>

## 横向柱状图

当`direction: "horizontal"`的时候为横向模式。

```js
  let barData = [
    {name: "banana", value: 100, time: "1月1日"},  // 1月1日香蕉销量100
    {name: "apple", value: 200, time: "1月1日"}, // 1月1日苹果销量200
    {name: "orange", value: 240, time: "1月1日"}, // 1月1日苹果销量200
  ]
  let barOption = ec.barChart(barData, {
    x: "name",
    y: "value",
    direction: "horizontal", // 横向的图表
    formatter: {
      title: "图表标题"
    }
  });
  let direction = echarts.init(document.getElementById("direction"));
  direction.setOption(barOption);

```

<div class="chart" id="direction"></div>

## 柱状堆积图

当`stack: true`的时候为堆积图模式。

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

<div class="chart" id="barStack"></div>

<script>
import echarts from 'echarts';
export default {
  mounted () {
    this.randerNormal();
    this.randerNormal1();
    this.randerDirection();
    this.randerStack();
  },
  methods: {
    randerNormal() {
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
    },
    randerNormal1() {
      let ec = this.$ec
      let data = [
        {name: "banana", value: 100, time: "1月1日"},  // 1月1日香蕉销量100
        {name: "banana", value: 100, time: "1月2日"},  // 1月1日香蕉销量100
        {name: "apple", value: 200, time: "1月1日"}, // 1月1日苹果销量200
        {name: "orange", value: 240, time: "1月1日"}, // 1月1日苹果销量200
        {name: "apple", value: 200, time: "1月2日"}, // 1月1日苹果销量200
        {name: "orange", value: 240, time: "1月2日"}, // 1月1日苹果销量200
      ]
      let option = ec.barChart(data, {
        legend: "time",
        x: "name",
        y: "value",
        formatter: {
          title: "图表标题"
        }
      });
      let normal = echarts.init(document.getElementById("normal"));
      normal.setOption(option);
    },
    randerDirection() {
      let ec = this.$ec
      let barData = [
        {name: "banana", value: 100, time: "1月1日"},  // 1月1日香蕉销量100
        {name: "apple", value: 200, time: "1月1日"}, // 1月1日苹果销量200
        {name: "orange", value: 240, time: "1月1日"}, // 1月1日苹果销量200
      ]
      let barOption = ec.barChart(barData, {
        x: "name",
        y: "value",
        direction: "horizontal", // 横向的图表
        formatter: {
          title: "图表标题"
        }
      });
      let direction = echarts.init(document.getElementById("direction"));
      direction.setOption(barOption);
    },
    randerStack() {
      let ec = this.$ec
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
}
</script>

<style>
.chart {
  width: 90%;
  height: 400px;
}
</style>