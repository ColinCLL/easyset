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
      title: "第一个例子"
    }
  });
  let first = echarts.init(document.getElementById("first"));
  first.setOption(firstOption);

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
        title: "标题"
      }
    });
    let first = echarts.init(document.getElementById("first"));
      console.log(firstOption);
    first.setOption(firstOption);

  }
}
</script>

<style>
.chart {
  width: 90%;
  height: 200px;
}
</style>