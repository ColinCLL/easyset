# 教程

## 快速开始

### 安装

easyset 依赖于 echarts,使用前请确认是否正确引入 echarts

```bash

npm install easyset --save

#or

yarn add easyset

```

```javascript
<script src="./easyset(.min).js" />
```

### 第一个例子

<div class="chart" id="first"></div>

```html
<div class="chart" id="first"></div>
```

```js
let firstData = [
  { name: "banana", value: 100, time: "1月1日" }, // 1月1日香蕉销量100
  { name: "apple", value: 200, time: "1月1日" }, // 1月1日苹果销量200
  { name: "orange", value: 240, time: "1月1日" } // 1月1日苹果销量200
];
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

在 easyset 中，，所有的输入数据都是数组对象，并且都有一个特点，数组的每个数组项都对应图表的一个数据项，我们完全可以通过口头描述数组中的某项数据，知道它应该是在图表中应该对应表达什么。而且在数据项中，键值对的键不能作为图表中的值。
比如：

```js
// 我们可以这样描述每一个数据项, 某天某个水果达到某销量
// 符合规范的数据
let data = [
  { name: "banana", value: 100, time: "1月1日" },
  { name: "apple", value: 200, time: "1月2日" },
  { name: "orange", value: 240, time: "1月3日" }
];
// 不符合
data = [
  { banana: 100, time: "1月1日" },
  { apple: 200, time: "1月2日" },
  { orange: 240, time: "1月3日" }
];
```

这样的数据更方便用户阅读和理解，同时的数据格式也贴近关系数据库的数据表的形式，这样的数据也更加通用，方便二次使用。使用这样的数据也方便服务端去做第三方接口的服务化应用。

## 配置方式

### 快速简单的配置

每一种图表都有自己的快捷配置方式，假如你能理解 easyset 的数据规范，那么这个对你将毫无难度。

```js
let easyData = [
  { name: "banana", value: 100, time: "1月1日" },
  { name: "apple", value: 200, time: "1月2日" },
  { name: "orange", value: 240, time: "1月3日" }
];

let easyPieOption = ec.pieChart(easyData, {
  legend: "name",
  val: "value"
});

let easySetPie = echarts.init(document.getElementById("easySetPie"));
easySetPie.setOption(easyPieOption);

let easyBarOption = ec.barChart(easyData, {
  x: "name",
  y: "value",
  direction: "horizontal" // 可选，横向的图表
  // stack: true, // 可选，开启堆积图
});

let easySetBar = echarts.init(document.getElementById("easySetBar"));
easySetBar.setOption(easyBarOption);
```

<div class="chart" id="easySetPie"></div>
<div class="chart" id="easySetBar"></div>

### 便捷的 formatter

easyset 能够便捷的进行常用的格式化操作

```js
let option = ec.barChart(data, {
  x: "name",
  y: "value",
  formatter: {
    yName: "(价格)",
    title: "水果",
    xAxis(value) {
      return value.toUpperCase(); // 转大写英文
    },
    yAxis(value) {
      return "$" + value;
    },
    tooltip(p) {
      return "水果";
    }
  }
});
let chart = echarts.init(document.getElementById("formatBar"));
chart.setOption(option);
```

<div class="chart" id="formatBar"></div>

## 主题设置

主题设置的优先级从高到低的顺序是 easyset 的 option --> 某个图表的 option --> 全局的 option

### 全局主题

通过`ec.globalOption(option, deep)`来配置全局主题，deep 参数是 true 的时候会将新的 option 深度覆盖到旧的 option 上；如果是 false 或者忽略，新 option 将会替换掉旧的 option。

### 图表主题

通过`ec.[chart name]Option(option, deep)`来配置全局主题，deep 参数是 true 的时候会将新的 option 深度覆盖到旧的 option 上；如果是 false 或者忽略，新 option 将会替换掉旧的 option。

例如：
```js

// 设置barChart的option, 该option替换掉旧的option
ec.barOption({
  xAxis: {
    type: "category",
  },
  yAxis: {
    type: "value"
  },
  series: [{
    type: "bar"
  }]
});


// 设置barChart的option.该option覆盖再旧的option上
ec.barOption({
  color: ["#000", "#111", "#222", "#333"]
}, true);

```

### 特殊个例主题设置

在使用图表的时候难免会有需要一些特殊的设置，所以easyset的配置项可以作为类似echarts的拓展配置项来用。


```js
let chartOption = ec.barChart(firstData, {
  // easyset的设置项变成easySet作为easy的拓展配置项
  easySet: {
    legend: "time",
    x: "name",
    y: "value",
    formatter: {
      title: "图表标题"
    }
  },
  // easySet 同级可以使用echats有的配置项，涉及数据应该交给easySet处理，而不是在这里输入
  color: ["#ccc"],
  ...
})

// 因为easyset本身生成的echarts的配置项，也可以在生成option后再修改

// echarts的title配置
chartOption.title = {
  text: "title name"
}

```

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
  height: 400px;
}
</style>
