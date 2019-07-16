# 地图

`ec.mapOption(option, deep)` 设置所有地图的默认option。 `ec.mapChart(data, option)`生成echart的option。

option 配置项：
```js

{
  val: array, // 必选，值，例如["val", "val1"]
  region: string, // 必选，地区
  mapType: string, // 必选，地图类型
  formatter: { // 格式化
    tooltip: string | function, // 提示信息
    title: string, // 图表标题
    legend: string | function, // 图例
  }
}

```


```js
// <div class="chart" id="map"></div>
// import "echarts/map/js/china.js" // 引入中国地图
    let mapData = [
        { "name": "广东", "flowIn": 1000, "flowOut": 500, type: "流入", "targe": "四川" },
        { "name": "广东", "flowIn": 300, "flowOut": 700, type: "流入", "targe": "西藏" },
        { "name": "广东", "flowIn": 900, "flowOut": 50, type: "流入", "targe": "广西" },
        { "name": "广东", "flowIn": 300, "flowOut": 50, type: "流入", "targe": "青海" },
        { "name": "广东", "flowIn": 500, "flowOut": 1000, type: "流入", "targe": "甘肃" },
        { "name": "广东", "flowIn": 500, "flowOut": 500, type: "流入", "targe": "陕西" },
        { "name": "广东", "flowIn": 850, "flowOut": 750, type: "流入", "targe": "河北" },
        { "name": "广东", "flowIn": 560, "flowOut": 508, type: "流入", "targe": "北京" },
        { "name": "广东", "flowIn": 530, "flowOut": 750, type: "流入", "targe": "河南" },
        { "name": "广东", "flowIn": 950, "flowOut": 950, type: "流出", "targe": "海南" },
        { "name": "广东", "flowIn": 550, "flowOut": 950, type: "流出", "targe": "云南" },
        { "name": "上海", "flowIn": 50, "flowOut": 50, type: "流入", "targe": "北京" },
        { "name": "上海", "flowIn": 50, "flowOut": 50, type: "流入", "targe": "北海" },
        { "name": "上海", "flowIn": 50, "flowOut": 50, type: "流入", "targe": "海口" },
        { "name": "上海", "flowIn": 50, "flowOut": 50, type: "流入", "targe": "昆明" }
    ];
    let mapOption = ec.mapChart(mapData, {
      val: ["flowIn", "flowOut"],
      region: "targe",
      mapType: "china",
      formatter: {
        title: "图表标题",
      }
    });
    let map = echarts.init(document.getElementById("map"));
    map.setOption(mapOption);

```

<div class="chart" id="map"></div>

<script>
import echarts from "echarts";
import "echarts/map/js/china.js"//引入中国地图
export default {
  mounted () {
    let ec = this.$ec
    // import "echarts/map/js/china.js" // 引入中国地图
    let mapData = [
        { "name": "广东", "flowIn": 1000, "flowOut": 500, type: "流入", "targe": "四川" },
        { "name": "广东", "flowIn": 300, "flowOut": 700, type: "流入", "targe": "西藏" },
        { "name": "广东", "flowIn": 900, "flowOut": 50, type: "流入", "targe": "广西" },
        { "name": "广东", "flowIn": 300, "flowOut": 50, type: "流入", "targe": "青海" },
        { "name": "广东", "flowIn": 500, "flowOut": 1000, type: "流入", "targe": "甘肃" },
        { "name": "广东", "flowIn": 500, "flowOut": 500, type: "流入", "targe": "陕西" },
        { "name": "广东", "flowIn": 850, "flowOut": 750, type: "流入", "targe": "河北" },
        { "name": "广东", "flowIn": 560, "flowOut": 508, type: "流入", "targe": "北京" },
        { "name": "广东", "flowIn": 530, "flowOut": 750, type: "流入", "targe": "河南" },
        { "name": "广东", "flowIn": 950, "flowOut": 950, type: "流出", "targe": "海南" },
        { "name": "广东", "flowIn": 550, "flowOut": 950, type: "流出", "targe": "云南" },
        { "name": "上海", "flowIn": 50, "flowOut": 50, type: "流入", "targe": "北京" },
        { "name": "上海", "flowIn": 50, "flowOut": 50, type: "流入", "targe": "北海" },
        { "name": "上海", "flowIn": 50, "flowOut": 50, type: "流入", "targe": "海口" },
        { "name": "上海", "flowIn": 50, "flowOut": 50, type: "流入", "targe": "昆明" }
    ];
    let mapOption = ec.mapChart(mapData, {
      val: ["flowIn", "flowOut"],
      region: "targe",
      mapType: "china",
      formatter: {
        title: "图表标题",
      }
    });
    let map = echarts.init(document.getElementById("map"));
    map.setOption(mapOption);
  }
}
</script>

<style>
.chart {
  width: 90%;
  height: 400px;
}
</style>