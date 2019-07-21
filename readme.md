## easyset

easyset 主要为了快速、简易、更人性化的生成业务图表而创造的。它本身并不是一个渲染图表的引擎，而是依赖于 echarts，在内部通过数据运算和样式管理，帮助用户简单快速生成渲染 echarts 图表所需的 option。

文档： http://easyset.utilbar.com/

快速开始

```sh
npm install easyset --save

#or

yarn add easyset
```

例子:

```js
import ec from "easyset";
let option = ec.lineChart(data, {
  x: "name",
  y: "value",
  legend: "type",
  formatter: {
    tooltip: "xxx",
    xName: "(单位：$)",
    yName: "(单位：day)",
    title: "图表名称"
  }
});
```
