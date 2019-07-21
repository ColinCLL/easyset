# 介绍

easyset主要为了快速、简易、更人性化的生成业务图表而创造的。它本身并不是一个渲染图表的引擎，而是依赖于echarts，在内部通过数据运算和样式管理，帮助用户简单快速生成渲染echarts图表所需的option。

## 特性

- 框架本身非常小，但依赖于 echarts。
- 快速、简易、更人性化的配置方式，例如：

```javascript
var data = [{ name: "banana", value: 100 }, { name: "apple", value: 200 }];
// 这是生成一个柱状图option所需的最少代码
var barOption = ec.barChart(data, {
  x: "name",
  y: "value"
});
```

- 有多种可选的数据处理，同时将常用 formatter 集中到一起。
- 保留原有 echarts 配置项作为拓展。
- 内置一套默认主题/皮肤配置。
- 主题/皮肤管理存在优先级，内置配置>单个图表皮肤>全局皮肤。
- 支持在 node,web,web-worker 环境使用。

## 为什么使用它

### 人性化的配置

图表的配置项是贴近人类思考方式的，比如一件柱状图，这个字段的数据是 x,另外一个字段的数据是 y,配置上去就够了。当你想要一个柱状堆积图，你会思考我需要根据某个字段分类堆积（同时也是图例），需要是横条型的柱而不是竖直型的柱？需要根据大小排序？

```javascript
var barOption = ec.barChart(data, {
  legend: "type", // 可选，图例，分类
  x: "name",
  y: "value",
  direction: "horizontal", // 可选，横向
  stack: true, // 可选，堆积模式
  orderBy: "ASC" // 排序，从小到大
  // 可选 formartter
  // formartter: {
  //   tooltip,
  //   title,
  //   ...
  // }
});
```

假如你对 echarts 熟悉，还允许你拓展使用 echarts 选项

```javascript
var barOption = jc.barChart(data, {
  // easyset的配置被抽象成easySet当做echarts配置
  easySet: {
    legend: "type", // 可选，图例，分类
    x: "name",
    y: "value",
    stack: true // 可选，堆积模式
  },

  // echarts原来的各种配置都可以在同级中使用。
  legend: {
    show: false
  }
});
```

### 快速的业务产出，可读的数据与规范
得益于easyset人性化，直观的配置项，你可以快速的完成前端的业务开发。但它对业务的的帮助不仅仅是这样，它还无形中帮你规范了数据。他对数据的要求是:
```javascript
// 例如
var data = [
  { name: "banana", value: 100, time: "1月1日" }, // 1月1日香蕉销量100
  { name: "apple", value: 200, time: "1月1日" } // 1月1日苹果销量200
];
```

数组中一个数据项基本就可以代表图表一个数据点，他是人类可读的，同时也贴近关系数据库简单查询可以生成数据，输出接口的。同时这种类型的数据非常方便二次使用，也方便服务端去做服务化应用。

### 不一样的描述方式，灵活的转换

使用 ecahrts，像是在选择和描述一个图表集，你要选择一个图表类型的集合，并告诉它图表哪个元素应该在什么位置，表现出什么样子。

使用 G2,像是在使用一堆的小积木，通过图形语法，选择各种元件，千变万化的去组成各式各样的图表。

单独拿出ecahrts，G2来说，是因为我想做的easyset是拥有echarts和G2本身的一些优点，同时放弃一定非大众需求的自由度，来达到快速简易灵活的目的。
使用easyset，是你拥有一份数据，选择一个图表或者表达方式，然后通过最直观的图形数据的成分描述这个数据，而不去过多的关心图表外观和组成结构。这样使开发者在工作更像是在为数据表达。

```javascript
// 例如
var data = [
  { name: "banana", value: 100, time: "1月1日" }, // 1月1日香蕉销量100
  { name: "apple", value: 200, time: "1月2日" } // 1月2日苹果销量200
];

// 柱状图，水果的销量对比
var barOption = ec.barChart(data, {
  x: "name",
  y: "value"
});
// 这样的需求更改，展示方式变化，毫无压力
var barOption1 = ec.barChart(data, {
  legend: "name",
  x: "time",
  y: "value"
});

// 线图，销量随时间变化
var lineOption = ec.lineChart(data, {
  x: "time",
  y: "value"
});

// 饼图，不同水果销量比例
var pieOption = ec.pieChart(data, {
  key: "name",
  value: "value"
});

// 等等...
```

当然，假如你需要一些高度自定义的复杂图表，easyset并不是一个很好的选择。假如你使用echarts就可以满足你项目的所有需要，easyset也不失为一个很好的补充，这才是easyset最合适的使用场景。

### 有优先级的样式管理，重复的事只做一次
easyset，本身有一套相对好看的内置样式。同时允许用户自定义全局主题，特定图表类型主题，或者单个图的样式配置。
