# 教程

## 快速开始

### 安装

easycharts依赖于echarts,使用前请确认是否正确引入echarts

```bash

npm install easycharts --save

#or

yarn add easycharts

```

```javascript

<script src="./easycharts(.min).js"></script>

```

### 第一个例子


<div class="chart" id="first"></div>

```html
  <div class="chart" id="first"></div>
```

```js
  let firstData = [
    {name: "banana", value: 100, time: "1月1日"},  // 1月1日香蕉销量100
    {name: "apple", value: 200, time: "1月1日"}, // 1月1日苹果销量200
    {name: "orange", value: 240, time: "1月1日"}, // 1月1日苹果销量200
  ]
  let firstOption = this.$ec.barChart(firstData, {
    legend: "time",
    x: "name",
    y: "value",
    formatter: {
      title: "图表标题"
    }
  });
  let first = echarts.init(document.getElementById("first"));
  first.setOption(firstOption);

```

## 数据规范

在easycharts中，，所有的输入数据都是数组对象，并且都有一个特点，数组的每个数组项都对应图表的一个数据项，我们完全可以通过口头描述数组中的某项数据，知道它应该是在图表中应该对应表达什么。而且在数据项中，键值对的键不能作为图表中的值。
比如：
```js
// 我们可以这样描述每一个数据项, 某天某个水果达到某销量
// 符合规范的数据
let data = [
    {name: "banana", value: 100, time: "1月1日"},
    {name: "apple", value: 200, time: "1月2日"},
    {name: "orange", value: 240, time: "1月3日"},
  ]
  // 不符合
  data = [
    { banana: 100, time: "1月1日"},
    { apple: 200, time: "1月2日"},
    { orange: 240, time: "1月3日"},
  ]

```
这样的数据更方便用户阅读和理解，同时的数据格式也贴近关系数据库的数据表的形式，这样的数据也更加通用，方便二次使用。使用这样的数据也方便服务端去做第三方接口的服务化应用。


## 配置方式

### 快速简单的配置

每一种图表都有自己的快捷配置方式，假如你能理解easycharts的数据规范，那么这个对你将毫无难度。
```js
let easyData = [
  {name: "banana", value: 100, time: "1月1日"},
  {name: "apple", value: 200, time: "1月2日"},
  {name: "orange", value: 240, time: "1月3日"},
]

let easyPieOption = ec.pieChart(easyData, {
  legend: "name",
  val: "value",
})

let easySetPie = echarts.init(document.getElementById("easySetPie"));
easySetPie.setOption(easyPieOption);


let easyBarOption = ec.barChart(easyData, {
  x: "name",
  y: "value",
  direction: "horizontal", // 可选，横向的图表
  // stack: true, // 可选，开启堆积图
})

let easySetBar = echarts.init(document.getElementById("easySetBar"));
easySetBar.setOption(easyBarOption);

```

<div class="chart" id="easySetPie"></div>
<div class="chart" id="easySetBar"></div>

### 便捷的formatter
easycharts能够便捷的进行常用的格式化操作

```js
  let option = ec.barChart(data, {
    x: "name",
    y: "value",
    formatter: {
      yName: "(价格)",
      title: "水果",
      xAxis(value) {
        return value.toUpperCase() // 转大写英文
      },
      yAxis(value) {
        return "$" + value
      },
      tooltip(p) {
        return "水果"
      }
    }
  })
  let chart = echarts.init(document.getElementById("formatBar"));
  chart.setOption(option);

```
<div class="chart" id="formatBar"></div>

## 主题设置

主题设置的优先级从高到低的顺序是 easyset的option --> 某个图表的option --> 全局的option

### 全局主题

### 图表主题

### 特殊个例主题设置

<script>
import echarts from 'echarts';
export default {
  mounted () {
    let ec = this.$ec

    let firstData = [
      {name: "banana", value: 100, time: "1月1日"},  // 1月1日香蕉销量100
      {name: "apple", value: 200, time: "1月1日"}, // 1月1日苹果销量200
      {name: "orange", value: 240, time: "1月1日"}, // 1月1日苹果销量200
    ]
    let firstOption = ec.barChart(firstData, {
      legend: "time",
      x: "name",
      y: "value",
      formatter: {
        title: "图表标题"
      }
    });
    let first = echarts.init(document.getElementById("first"));
    first.setOption(firstOption);

    // 快速简单的配置
    let easyData = [
      {name: "banana", value: 100, time: "1月1日"},
      {name: "apple", value: 200, time: "1月2日"},
      {name: "orange", value: 240, time: "1月3日"},
    ]

    let easyPieOption = ec.pieChart(easyData, {
      legend: "name",
      val: "value",
    })

    let easySetPie = echarts.init(document.getElementById("easySetPie"));
    easySetPie.setOption(easyPieOption);


    let easyBarOption = ec.barChart(easyData, {
      x: "name",
      y: "value",
      direction: "horizontal", // 可选，横向的图表
      // legend: "time", // 可选，配置图例
      // stack: true, // 可选，开启堆积图
    })

    let easySetBar = echarts.init(document.getElementById("easySetBar"));
    easySetBar.setOption(easyBarOption);

    // 格式化讲解
    this.formatBar(easyData);


  },
  methods: {
    formatBar(data) {
      let ec = this.$ec;
      let option = ec.barChart(data, {
        x: "name",
        y: "value",
        formatter: {
          yName: "(价格)",
          title: "水果",
          xAxis(value) {
            return value.toUpperCase()
          },
          yAxis(value) {
            return "$" + value
          },
          tooltip(p) {
            return "水果"
          }
        }
      })
      let chart = echarts.init(document.getElementById("formatBar"));
      chart.setOption(option);
    }
  }
}
</script>

<style>
.chart {
  width: 90%;
  height: 200px;
}
</style>