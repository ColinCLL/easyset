# 介绍

easycharts主要为了快速、简易、更人性化的生成业务图表而创造的。它本身并不是一个渲染图表的引擎，而是依赖于echarts，在内部通过数据运算和样式管理，帮助用户简单快速生成渲染echarts图表所需的option。

# 特性

- 框架本身非常小，但依赖于echarts。
- 快速、简易、更人性化的配置方式，例如：

~~~javascript
var data = [
  {name: "banana", value: 100},
  {name: "apple", value: 200},
];
// 这是生成一个柱状图option所需的最少代码
var barOption = jc.barChart(data, {
  x: "name",
  y: "value"
});
~~~
- 有多种可选的数据处理，同时将常用formatter集中到一起。
- 保留原有echarts配置项作为拓展。
- 内置一套默认主题/皮肤配置。
- 主题/皮肤管理存在优先级，内置配置>单个图表皮肤>全局皮肤。
- 支持在node,web,web-worker环境使用。

# 为什么使用它

## 人性化的配置
举个例子，在一个简单柱状图中

## 快速的业务产出

## 灵活的装换
## 针对场景
easycharts针对常见通用的图表，也鼓励用户拓展复用性强的图表。它使用的方式是`ec.lineChart`,`ec.barChart`的放