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

<div ref="first">123</div>

<script>
import echarts from 'echarts';
// let ec require('../build/easycharts.min.js');
export default {
  mounted () {
    console.log(this.$ec, 111)
    import('../build/easycharts.min.js').then(model => {
      // use code
      console.log(model)
    })
  }
}
</script>
</ClientOnly>