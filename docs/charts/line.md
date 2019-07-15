# 线图

`ec.lineOption(option, deep)` 设置所有饼图的默认option。 `ec.lineChart(data, option)`生成echart的option。

option配置项：
```js
{
  legend: string, // 堆积图模式下必选，图例
  x: string, // 必选，x值
  y: string, // 必选，y值
  stack: boolean, // 堆积模式，true开启 默认false，
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

## 普通线图
```js
// <div class="chart" id="line"></div>
    let lineData = [
      {name: "banana", value: 100, time: "1月1日"},  // 1月1日香蕉销量100
      {name: "apple", value: 200, time: "1月1日"}, // 1月1日苹果销量200
      {name: "orange", value: 240, time: "1月1日"}, // 1月1日苹果销量200
    ]
    let lineOption = ec.lineChart(lineData, {
      x: "name",
      y: "value",
      formatter: {
        title: "图表标题"
      }
    });
    let line = echarts.init(document.getElementById("line"));
    line.setOption(lineOption);

```
<div class="chart" id="line"></div>

## 分组线图
```js
    let lineData = [
      {name: "banana", value: 100, time: "1月1日"},
      {name: "banana", value: 50, time: "1月2日"},
      {name: "apple", value: 200, time: "1月1日"},
      {name: "orange", value: 240, time: "1月1日"},
      {name: "apple", value: 100, time: "1月2日"},
      {name: "orange", value: 120, time: "1月2日"},
    ]
    let lineOption = ec.lineChart(lineStackData, {
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

## 横向线图

当`direction: "horizontal"`的时候为横向模式。

```js
  let lineData = [
    {name: "banana", value: 100, time: "1月1日"},  // 1月1日香蕉销量100
    {name: "apple", value: 200, time: "1月1日"}, // 1月1日苹果销量200
    {name: "orange", value: 240, time: "1月1日"}, // 1月1日苹果销量200
  ]
  let lineOption = ec.lineChart(lineData, {
    x: "name",
    y: "value",
    direction: "horizontal", // 横向的图表
    formatter: {
      title: "图表标题"
    }
  });
  let direction = echarts.init(document.getElementById("direction"));
  direction.setOption(lineOption);

```

<div class="chart" id="direction"></div>

## 线堆积图

当`stack: true`的时候为堆积图模式。

```js
  let lineStackData = [
    {name: "banana", value: 100, time: "1月1日"},  // 1月1日香蕉销量100
    {name: "banana", value: 100, time: "1月2日"},  // 1月1日香蕉销量100
    {name: "apple", value: 200, time: "1月1日"}, // 1月1日苹果销量200
    {name: "orange", value: 240, time: "1月1日"}, // 1月1日苹果销量200
    {name: "apple", value: 200, time: "1月2日"}, // 1月1日苹果销量200
    {name: "orange", value: 240, time: "1月2日"}, // 1月1日苹果销量200
  ]
  let lineStackOption = ec.lineChart(lineStackData, {
    legend: "time",
    x: "name",
    y: "value",
    stack: true, // 堆积模式
    formatter: {
      title: "图表标题"
    }
  });
  let lineStack = echarts.init(document.getElementById("lineStack"));
  lineStack.setOption(lineStackOption);
```

<div class="chart" id="lineStack"></div>

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
      let lineData = [
        {name: "banana", value: 100, time: "1月1日"},  // 1月1日香蕉销量100
        {name: "apple", value: 200, time: "1月1日"}, // 1月1日苹果销量200
        {name: "orange", value: 240, time: "1月1日"}, // 1月1日苹果销量200
      ]
      let lineOption = ec.lineChart(lineData, {
        x: "name",
        y: "value",
        formatter: {
          title: "图表标题"
        }
      });
      let line = echarts.init(document.getElementById("line"));
      line.setOption(lineOption);
    },
    randerNormal1() {
      let ec = this.$ec
      let data = [
        {name: "banana", value: 100, time: "1月1日"},
        {name: "banana", value: 50, time: "1月2日"},
        {name: "apple", value: 200, time: "1月1日"},
        {name: "orange", value: 240, time: "1月1日"},
        {name: "apple", value: 100, time: "1月2日"},
        {name: "orange", value: 120, time: "1月2日"},
      ]
      let option = ec.lineChart(data, {
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
      let lineData = [
        {name: "banana", value: 100, time: "1月1日"},  // 1月1日香蕉销量100
        {name: "apple", value: 200, time: "1月1日"}, // 1月1日苹果销量200
        {name: "orange", value: 240, time: "1月1日"}, // 1月1日苹果销量200
      ]
      let lineOption = ec.lineChart(lineData, {
        x: "name",
        y: "value",
        direction: "horizontal", // 横向的图表
        formatter: {
          title: "图表标题"
        }
      });
      let direction = echarts.init(document.getElementById("direction"));
      direction.setOption(lineOption);
    },
    randerStack() {
      let ec = this.$ec
      let lineStackData = [
        {name: "banana", value: 100, time: "1月1日"},  // 1月1日香蕉销量100
        {name: "banana", value: 100, time: "1月2日"},  // 1月1日香蕉销量100
        {name: "apple", value: 200, time: "1月1日"}, // 1月1日苹果销量200
        {name: "orange", value: 240, time: "1月1日"}, // 1月1日苹果销量200
        {name: "apple", value: 200, time: "1月2日"}, // 1月1日苹果销量200
        {name: "orange", value: 240, time: "1月2日"}, // 1月1日苹果销量200
      ]
      let lineStackOption = ec.lineChart(lineStackData, {
        legend: "time",
        x: "name",
        y: "value",
        stack: true,
        formatter: {
          title: "图表标题"
        }
      });
      let lineStack = echarts.init(document.getElementById("lineStack"));
      lineStack.setOption(lineStackOption);
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