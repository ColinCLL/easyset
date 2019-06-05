(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.ec = factory());
}(this, function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var JCalculator_min = createCommonjsModule(function (module, exports) {
	!function(){var n="object"==typeof self&&self.self===self&&self||"object"==typeof commonjsGlobal&&commonjsGlobal.global===commonjsGlobal&&commonjsGlobal||this,r=(n.jc,Array.prototype),e=Object.prototype,t=(e.toString),i=(Array.isArray),o=Object.keys,f=Object.values?Object.values:function(r){return o(r).map(function(n){return r[n]})},s=(function(n){return n instanceof s?n:this instanceof s?void(this._wrapped=n):new s(n)});function c(n,r,e){return s.isNoVal(n)||s.isNoVal(r)?s.isNoVal(n)?r:n:(e="max"==e?r<n:n<r)?n:r}function l(r,n){var e={};return s.isArray(n)?s.map(n,function(n){e[r+n]=n;}):s.isObject(n)?s.forIn(n,function(n,r){e[n]=r;}):s.isString(n)&&(e[r+n]=n),e}function p(n,r){var i={},o=n.length,u={};return s.map(n,function(t){s.isObjEmpty(r.colObj)||s.forIn(r.colObj,function(n,r){var e=s.isFunction(r)?r(t):t[r];i[n]=e;}),s.isObjEmpty(r.sumObj)||s.forIn(r.sumObj,function(n,r){var e=s.isFunction(r)?r(t):t[r];i[n]?i[n]+=e||0:i[n]=e||0;}),s.isObjEmpty(r.avgObj)||s.forIn(r.avgObj,function(n,r){u[n]||(u[n]=0);var e=s.isFunction(r)?r(t):t[r];i[n]?i[n]+=e||0:i[n]=e||0,!e&&0!=e||u[n]++;}),s.isObjEmpty(r.maxObj)||s.forIn(r.maxObj,function(n,r){var e=s.isFunction(r)?r(t):t[r];i[n]=c(i[n],e,"max");}),s.isObjEmpty(r.minObj)||s.forIn(r.minObj,function(n,r){var e=s.isFunction(r)?r(t):t[r];i[n]=c(i[n],e,"min");}),s.isObjEmpty(r.countObj)||s.forIn(r.countObj,function(n,r){var e=s.isFunction(r)?r(t):t[r];switch(s.isUndefined(i[n])&&(i[n]=0),n){case"*"==r?n:"count_*":i[n]=o;break;default:s.isUndefined(e)||null==e||i[n]++;}});}),s.forIn(r.avgObj,function(n,r){i[n]=i[n]/u[n];}),i}function u(n,r){if(!r)return n;if(s.isObject(r)&&!s.isFunction(r)){var u=o(r),c=f(r);n.sort(function(n,r){for(var e,t,i=u.length,o=0;o<i&&(e=u[o],t=c[o],n[e]===r[e]);o++);if(n[e]!==r[e]){if(n[e]>r[e]||void 0===r[e])return "desc"===t||"DESC"===t?-1:1;if(n[e]<r[e]||void 0===n[e])return "desc"===t||"DESC"===t?1:-1}return "desc"===t||"DESC"===t?r[e]-n[e]:n[e]-r[e]});}else s.isFunction(r)&&n.sort(r);return n}function a(n,r){if(!r&&0!=r)return n;var e=[],t=n.length,i=0;if(s.isNumber(r))t=t<r?t:r;else if(s.isArray(r)){if(r[0]>t)return [];r[0]<t&&(i=r[0]),t=r[0]+r[1]<t?r[0]+r[1]:t;}for(;i<t;i++)e.push(n[i]);return e}exports.nodeType?n.jc=s:(!module.nodeType&&module.exports&&(exports=module.exports=s),exports.jc=s),s.VERSION="1.1.0",s.map=function(n,r){return s.isArray(n)?n.map(r):[]},s.forIn=function(n,r){if(!s.isObject(n))return {};var e=0;for(var t in n)r(t,n[t],e),e++;},s.filter=function(n,r){return s.isArray(n)?n.filter(r):[]},s.where=function(n,e){var r;if(s.isFunction(e))r=s.filter(n,e);else{if(!s.isObject(e))return [];r=s.filter(n,function(r){return o(e).every(function(n){return e[n]===r[n]})});}return r},s.limit=function(n,r){return a(n,r)},s.order=s.orderBy=function(n,r){return u(n,r)},s.tree=function(n,e){var r;e.children||(e.children="children"),s.isString(e.retain)?r=[e.retain,e.id,e.parent]:s.isArray(e.retain)?((r=e.retain).push(e.id),r.push(e.parent)):s.isObject(e.retain)?((r=e.retain)[e.id]=e.id,r[e.parent]=e.parent):n=s.extend(!0,[],n),r&&(n=s.sql({select:{col:r},from:n}));var t={},i=s.groupBy(n,function(n){return n[e.id]==e.root&&(t=n),n[e.parent]});return s.map(n,function(n){var r=n[e.id];i[r]&&(n[e.children]=i[r]);}),s.isObjEmpty(t)&&(t[e.children]=i[e.root]),t},s.treeDic=function(n,r){var e={id:"id",children:"children",deleteEmptyChildren:!0};s.isObject(r)&&s.extend(e,r),s.isObject(n)&&(n=[n]);var t={};return function r(n){n.map(function(n){(t[n[e.id]]=n)[e.children]&&0!=n[e.children].length||!e.deleteEmptyChildren?r(n[e.children]):delete n[e.children];});}(n),t},s.treeFilter=function(n,r){var e={root:"0",id:"id",parent:"pid",children:"children",deleteEmptyChildren:!0};s.isObject(r)&&s.extend(e,r),s.isObject(n)&&(n=[n]),n=s.extend([],n);var t=[];!function r(n){n.map(function(n){t.push(n),n[e.children]&&0!=n[e.children].length||!e.deleteEmptyChildren?r(n[e.children]):delete n[e.children];});}(n);var i=s.where(t,e.filter);return s.tree(i,e)},s.treeMap=function(n,r){var e={root:"0",id:"id",parent:"pid",children:"children",deleteEmptyChildren:!0,map:function(n){return n}};return s.isObject(r)&&s.extend(e,r),function r(n){n.map(function(n){e.map(n),n[e.children]&&0!=n[e.children].length||!e.deleteEmptyChildren?r(n[e.children]):delete n[e.children];});}(s.isObject(n)?[n]:n),n},s.treeSearch=function(n,r){var t={children:"children",search:{}};s.isObject(r)&&s.extend(t,r);var e=s.isObject(n)?[n]:n,i=[];return function e(n){n.map(function(n){var r=t.search;0<s.where([n],r).length&&i.push(n),n[t.children]&&0!=n[t.children].length&&e(n[t.children]);});}(e),i},s.treePath=function(n,r){var e={root:"0",id:"id",parent:"pid",children:"children",path:""};s.isObject(r)&&s.extend(e,r);var t=s.treeDic(n,e),i=[];return function n(r){t[r]&&(i.unshift(t[r]),t[r][e.parent]&&n(t[r][e.parent]));}(e.path),i},s.extend=function(){var n,r,e,t,i,o,u=arguments[0]||{},c=1,a=arguments.length,f=!1;for("boolean"==typeof u&&(f=u,u=arguments[1]||{},c++),"object"==typeof u||s.isFunction(u)||(u={}),a===c&&(u=this,--c);c<a;c++)if(null!=(n=arguments[c]))for(r in n)e=u[r],u!==(t=n[r])&&(f&&t&&(s.isObject(t)||(i=s.isArray(t)))?(o=i?(i=!1,e&&s.isArray(e)?e:[]):e&&s.isObject(e)?e:{},u[r]=s.extend(f,o,t)):void 0!==t&&(u[r]=t));return u},s.unique=function(n){if(!n||0==n.length)return n;var e={},t=[];s.map(n,function(n){var r=JSON.stringify(n);e[r]=n;});return s.forIn(e,function(n,r){t.push(r);}),t},s.spaceFix=function(n,r){if(!n||0==n.length)return n;var e=[];0<n[0][r.key]-r.start&&((f={})[r.key]=r.start,s.map(r.zeroFill,function(n){f[n]=0;}),n.unshift(f));n[n.length-1][r.key]<r.end&&((f={})[r.key]=r.end,s.map(r.zeroFill,function(n){f[n]=0;}),n.push(f));for(var t=1,i=n.length;t<i&&!(1e4<t);t++){var o=n[t][r.key]-n[t-1][r.key];if(o<=r.space)e.push(n[t]);else{for(var u=r.space,c=0,a=o/r.space;c<a-1&&!(1e4<c);c++){var f;(f={})[r.key]=parseInt(n[t-1][r.key])+parseInt(u),s.map(r.zeroFill,function(n){f[n]=0;}),e.push(f),u+=r.space;}e.push(n[t]);}}return e.unshift(n[0]),e},s.keyArray=function(n,r){if(!n||0==n.length)return n;s.isString(r)&&(r=[r]);var t={};return s.map(n,function(e,n){s.map(r,function(n,r){t[n]||(t[n]=[]),t[n].push(e[n]);});}),t},s.keyBreak=function(n,t){if(!n||0==n.length)return n;var i=[],o=t.key,u=t.value;return s.map(n,function(e){s.map(t.break,function(n){var r={};r[o]=n,r[u]=e[n],s.map(t.retain,function(n){r[n]=e[n];}),i.push(r);});}),i},s.index=function(n,r){if(!n||0==n.length)return n;var e={};return s.map(n,function(n){e[n[r]]=n;}),e},s.max=function(n,t){if(!n||0==n.length)return n;var i;if(s.isString(t)){var r=t;t=function(n){return n[r]};}else s.isUndefined(t)&&(t=function(n){return n});return s.map(n,function(n){var r=i?t(i):i,e=n?t(n):n;i=s.isNoVal(r)||s.isNoVal(e)?s.isNoVal(r)?n:i:e<r?i:n;}),i},s.min=function(n,t){if(!n||0==n.length)return n;var i;if(s.isString(t)){var r=t;t=function(n){return n[r]};}else s.isUndefined(t)&&(t=function(n){return n});return s.map(n,function(n){var r=i?t(i):i,e=n?t(n):n;i=s.isNoVal(r)||s.isNoVal(e)?s.isNoVal(r)?n:i:r<e?i:n;}),i},s.group=s.groupBy=function(n,r){if(!n||0==n.length)return n;var i={};return s.map(n,function(e,n){var t=[];s.isArray(r)?s.map(r,function(n,r){s.isFunction(n)?t.push(n(e)):t.push(e[n]);}):s.isString(r)?t.push(e[r]):s.isFunction(r)&&(t=r(e,n)),i[t]||(i[t]=[]),i[t].push(e);}),i},s.sql=function(n){return function(n){if(!n.from)throw new Error("From is not defined","Error from");if(!n.select)throw new Error("Select is not defined","Error select");!function(n){var r=n.select,e=n.groupBy;if(!(r.sum||r.avg||r.count||r.max||r.min))return;if(r.col&&!n.groupBy)return;var t=l("",r.col);t=f(t);var i=[],o=!1;s.isArray(e)?s.map(e,function(n,r){i.push(n);}):s.isString(e)?i.push(e):s.isFunction(e)&&(i=[e]);for(var u=0,c=t.length;u<c;u++){for(var a=0;a<c;a++){if(t[u]==i[a]){o=!0;break}if(s.isObject(t[u])&&s.isObject(i[a])&&String(t[u])===String(i[a])){o=!0;break}}if(!o)throw new Error("groupBy should contain select.col","Error groupBy");o=!1;}}(n);}(n),0!=n.from.length&&s.isArray(n.from)?a(u(function(n,r){if(!r)throw new Error("Select is not defined","Error select");var o=[],u={};r.col&&(u.colObj=l("",r.col));r.sum&&(u.sumObj=l("sum_",r.sum));r.avg&&(u.avgObj=l("avg_",r.avg));r.max&&(u.maxObj=l("max_",r.max));r.min&&(u.minObj=l("min_",r.min));r.count&&(u.countObj=l("count_",r.count));s.isArray(n)?s.map(n,function(n,r){var e=p([n],u);o.push(e);}):s.forIn(n,function(n,r,e,t){var i=p(r,u);o.push(i);});return o}(function(n,c){if(!c)return n;var a={sumObj:{},avgObj:{},maxObj:{},minObj:{},countObj:{}},f={};return s.forIn(c,function(n,r){var e=n.split("_"),t=e.shift(),i=e.join("_");switch(i=i.replace(/[1-9a-zA-z_\$\@]+/g,function(n){return "row['"+n+"']"}),t){case"sum":a.sumObj[n]=function(n){return new Function("row","return "+i)(n)};break;case"avg":a.avgObj[n]=function(n){return new Function("row","return "+i)(n)};break;case"max":a.maxObj[n]=function(n){return new Function("row","return "+i)(n)};break;case"min":a.minObj[n]=function(n){return new Function("row","return "+i)(n)};break;case"count":a.countObj[n]=function(n){return new Function("row","return "+i)(n)};}}),s.forIn(n,function(n,r,e,t){var i,o=p(r,a);for(var u in c)if(foo=new Function("return "+o[u]+c[u]),!(i=foo()))break;i&&(f[n]=r);}),f}(function(n,r){var e;return s.forIn(r.select,function(n,r){e=!!("col"!=n)||e;}),r.groupBy||e?r.groupBy||r.select.col?s.group(n,r.groupBy):{table:n}:n}(function(n,r){return r?s.where(n,r):n}(n.from,n.where),n),n.having),n.select),n.orderBy),n.limit):[]},s.isObjEmpty=function(n){for(var r in n)return !1;return !0},s.isNoVal=function(n){return s.isUndefined(n)||null==n||n!=n},s.isArray=i||function(n){return "[object Array]"===t.call(n)},s.isObject=function(n){return "object"==typeof n&&!s.isArray(n)&&!!n},s.map(["Arguments","Function","String","Number","Date","RegExp","Error","Symbol","Map","WeakMap","Set","WeakSet"],function(r){s["is"+r]=function(n){return {}.toString.call(n)==="[object "+r+"]"};}),s.isUndefined=function(n){return void 0===n},"function"==typeof undefined&&undefined.amd&&undefined("jc",[],function(){return s});}();
	});
	var JCalculator_min_1 = JCalculator_min.jcalculator;
	var JCalculator_min_2 = JCalculator_min.jc;

	var ec = function ec(obj) {
	  if (obj instanceof ec) return obj;
	  if (!(this instanceof ec)) return new ec(obj);
	  this._wrapped = obj;
	}; // 版本


	ec.VERSION = '1.0.0';
	var opt = {}; //全局默认样式

	opt.globalOption = {
	  color: ["#1890FF", "#2FC25B", "#FACC14", "#223273", "#8543E0", "#13C2C2", "#3436C7", "#F04864"],
	  tooltip: {
	    trigger: 'axis'
	  },
	  grid: {
	    top: 48,
	    left: 16,
	    right: 16,
	    bottom: 12,
	    containLabel: true
	  },
	  title: {
	    text: "",
	    top: 4,
	    left: 10,
	    textStyle: {
	      color: "#333"
	    }
	  },
	  legend: {
	    show: true,
	    top: 8,
	    right: 10
	  }
	  /**
	   * 格式化配置项
	   * @param {object} option  图表配置项
	   * @param {object} easySet easySet
	   */

	};

	var setFormatter = function setFormatter(chartOption, easySet) {
	  var formatter = easySet.formatter;
	  if (!formatter) return {
	    chartOption: chartOption,
	    easySet: easySet
	  };
	  var tooltip = chartOption.tooltip ? chartOption.tooltip : {},
	      legend = chartOption.legend ? chartOption.legend : {},
	      title = chartOption.title ? chartOption.title : {},
	      xAxis = chartOption.xAxis && chartOption.xAxis[0] ? chartOption.xAxis[0] : {},
	      yAxis = chartOption.yAxis && chartOption.yAxis[0] ? chartOption.yAxis[0] : {},
	      xAxisLabel = xAxis.axisLabel = xAxis.axisLabel ? xAxis.axisLabel : {},
	      yAxisLabel = yAxis.axisLabel = yAxis.axisLabel ? yAxis.axisLabel : {};

	  if (formatter.tooltip) {
	    tooltip.formatter = formatter.tooltip;
	  }

	  if (formatter.legend) {
	    legend.formatter = formatter.legend;
	  }

	  if (formatter.xAxis) {
	    xAxisLabel.formatter = formatter.xAxis;
	  }

	  if (formatter.yAxis) {
	    yAxisLabel.formatter = formatter.yAxis;
	  }

	  if (formatter.xName) {
	    xAxis.name = formatter.xName;
	  }

	  if (formatter.yName) {
	    yAxis.name = formatter.yName;
	  }

	  if (formatter.title) {
	    title.text = formatter.title;
	  }

	  return {
	    chartOption: chartOption,
	    easySet: easySet
	  };
	};
	/**
	 * 根据用户传入的配置和图表内置的配置输出相应echart选项
	 * @param {object} option 外部用户传入的选项
	 * @param {object} chartOpt 默认的图表选项
	 */


	var getOption = function getOption(option, chartOpt) {
	  var defaultOption = JCalculator_min.extend(true, {}, opt.globalOption);
	  defaultOption = JCalculator_min.extend(true, defaultOption, chartOpt);
	  var easySet;

	  if (option.easySet) {
	    defaultOption = JCalculator_min.extend(true, defaultOption, option);
	    easySet = option.easySet;
	    delete defaultOption.easySet;
	  } else {
	    easySet = option;
	  }

	  var config = setFormatter(defaultOption, easySet);
	  return config;
	};
	/******       图表        *********/
	// 柱状图


	opt.barOption = {
	  tooltip: {
	    trigger: 'axis',
	    axisPointer: {
	      type: 'shadow'
	    }
	  },
	  xAxis: [{
	    type: 'category',
	    nameGap: 6
	  }],
	  yAxis: [{
	    type: 'value',
	    nameGap: 6
	  }],
	  series: [{
	    type: 'bar'
	  }]
	};

	ec.barChart = function (data, option) {
	  var config = getOption(option, opt.barOption);
	  var easySet = config.easySet;
	  var chartOption = config.chartOption;
	  var legendData = [],
	      xAxisData = [],
	      series = [],
	      optSeries = chartOption.series[0];
	  var legendGroup = JCalculator_min.groupBy(data, easySet.legend); // 排序的数据

	  var orderData = JCalculator_min.sql({
	    select: {
	      col: {
	        key: easySet.x
	      },
	      sum: {
	        val: easySet.y
	      }
	    },
	    from: data,
	    groupBy: easySet.x,
	    orderBy: easySet.orderBy ? {
	      val: easySet.orderBy
	    } : false
	  });
	  orderData.map(function (row) {
	    var x = row["key"];
	    xAxisData.push(x);
	  });
	  JCalculator_min.forIn(legendGroup, function (key, val) {
	    // let arr = jc.keyArray(val, [easySet.y])
	    var newSeries = JCalculator_min.extend(true, {}, optSeries);
	    var index = JCalculator_min.index(val, easySet.x);
	    legendData.push(key);
	    newSeries.data = [];
	    JCalculator_min.map(xAxisData, function (row) {
	      newSeries.data.push(index[row][easySet.y]);
	    });
	    newSeries.name = key;
	    if (easySet.stack) newSeries.stack = '总量';
	    series.push(newSeries);
	  });
	  chartOption.series = series;
	  chartOption.legend.data = legendData;
	  chartOption.xAxis[0].data = xAxisData;

	  if (easySet.direction === 'horizontal') {
	    var t;
	    t = chartOption.xAxis[0];
	    chartOption.xAxis[0] = chartOption.yAxis[0];
	    chartOption.yAxis[0] = t;
	  }

	  return chartOption;
	}; // 线图


	opt.lineOption = {
	  xAxis: [{
	    type: 'category',
	    boundaryGap: false
	  }],
	  yAxis: [{
	    type: 'value'
	  }],
	  series: [{
	    type: 'line'
	  }]
	};

	ec.lineChart = function (data, option) {
	  var config = getOption(option, opt.lineOption);
	  var easySet = config.easySet;
	  var chartOption = config.chartOption;
	  var legendData = [],
	      xAxisData = [],
	      series = [],
	      optSeries = chartOption.series[0];
	  var legendGroup = JCalculator_min.groupBy(data, easySet.legend); // 排序的数据

	  var orderData = JCalculator_min.sql({
	    select: {
	      col: {
	        key: easySet.x
	      },
	      sum: {
	        val: easySet.y
	      }
	    },
	    from: data,
	    groupBy: easySet.x,
	    orderBy: easySet.orderBy ? {
	      val: easySet.orderBy
	    } : false
	  });
	  orderData.map(function (row) {
	    var x = row["key"];
	    xAxisData.push(x);
	  });
	  JCalculator_min.forIn(legendGroup, function (key, val) {
	    var arr = JCalculator_min.keyArray(val, [easySet.y]);
	    var newSeries = JCalculator_min.extend(true, {}, optSeries);
	    var index = JCalculator_min.index(val, easySet.x);
	    legendData.push(key);
	    newSeries.data = [];
	    JCalculator_min.map(xAxisData, function (row) {
	      newSeries.data.push(index[row]);
	    });
	    newSeries.name = key;

	    if (easySet.stack) {
	      newSeries.stack = '总量';
	      if (!newSeries.areaStyle) newSeries.areaStyle = {
	        normal: {}
	      };
	    }

	    series.push(newSeries);
	  });
	  chartOption.series = series;
	  chartOption.legend.data = legendData;
	  chartOption.xAxis[0].data = xAxisData;

	  if (easySet.direction === 'horizontal') {
	    var t;
	    t = chartOption.xAxis[0];
	    chartOption.xAxis[0] = chartOption.yAxis[0];
	    chartOption.yAxis[0] = t;
	  }

	  return chartOption;
	}; // 饼图


	opt.pieOption = {
	  tooltip: {
	    trigger: 'item',
	    formatter: "{b}: {c} ({d}%)"
	  },
	  series: [{
	    name: ' ',
	    type: 'pie',
	    radius: '55%',
	    center: ['50%', '60%']
	  }]
	};

	ec.pieChart = function (data, option) {
	  var config = getOption(option, opt.pieOption);
	  var easySet = config.easySet;
	  var chartOption = config.chartOption;
	  var pieData = [],
	      legendData = [];
	  pieData = JCalculator_min.sql({
	    select: {
	      col: {
	        name: easySet.legend,
	        value: easySet.val
	      }
	    },
	    from: data,
	    orderBy: easySet.orderBy ? {
	      value: easySet.orderBy
	    } : false
	  });
	  legendData = JCalculator_min.keyArray(pieData, ['name'])['name'];
	  chartOption.series[0].data = pieData;
	  chartOption.legend.data = legendData;
	  return chartOption;
	}; // k图


	opt.kOption = {
	  tooltip: {
	    trigger: 'axis',
	    axisPointer: {
	      type: 'shadow'
	    }
	  },
	  xAxis: [{
	    type: 'category'
	  }],
	  yAxis: [{
	    type: 'value'
	  }],
	  series: [{
	    type: 'k',
	    itemStyle: {
	      normal: {
	        color: opt.globalOption.color[0],
	        color0: opt.globalOption.color[0],
	        borderColor: opt.globalOption.color[0],
	        borderColor0: opt.globalOption.color[0]
	      }
	    }
	  }]
	};

	ec.kChart = function (data, option) {
	  var config = getOption(option, opt.kOption);
	  var easySet = config.easySet;
	  var chartOption = config.chartOption;
	  var xAxisData = [],
	      optSeries = chartOption.series[0];
	  var legendGroup = JCalculator_min.groupBy(data, easySet.legend); // 排序的数据

	  var orderData = JCalculator_min.sql({
	    select: {
	      col: {
	        key: easySet.x,
	        val: easySet.y
	      }
	    },
	    from: data,
	    groupBy: easySet.x,
	    orderBy: easySet.orderBy ? {
	      val: easySet.orderBy
	    } : false
	  });
	  orderData.map(function (row) {
	    var x = row["key"];
	    xAxisData.push(x);
	  });
	  var newSeries = JCalculator_min.extend(true, {}, optSeries);
	  newSeries.data = [];
	  JCalculator_min.forIn(legendGroup, function (key, val) {
	    var arr = JCalculator_min.keyArray(val, [easySet.y]);
	    var index = JCalculator_min.index(val, easySet.x);
	    JCalculator_min.map(xAxisData, function (row) {
	      newSeries.data.push(index[row][easySet.y]);
	    });
	  });
	  chartOption.series = newSeries; // chartOption.legend.data = legendData

	  chartOption.xAxis[0].data = xAxisData;

	  if (easySet.direction === 'horizontal') {
	    var t;
	    t = chartOption.xAxis[0];
	    chartOption.xAxis[0] = chartOption.yAxis[0];
	    chartOption.yAxis[0] = t;
	  }

	  return chartOption;
	}; // 地图


	opt.mapOption = {
	  color: ['#9d70e3', '#9d70e3'],
	  tooltip: {
	    trigger: 'item'
	  },
	  visualMap: {
	    min: 0,
	    // max: obj.max,
	    left: 'left',
	    top: 'bottom',
	    text: ['高', '低'],
	    // 文本，默认为数值文本
	    calculable: true,
	    inRange: {
	      color: ['#ddf5ff', '#5fb0ff']
	    }
	  },
	  legend: {
	    orient: 'vertical',
	    top: 'bottom',
	    left: 'right' //,selectedMode: 'single'

	  },
	  series: [{
	    name: '地图',
	    type: 'map',
	    mapType: "",
	    //
	    itemStyle: {
	      normal: {
	        label: {
	          show: true
	        }
	      },
	      emphasis: {
	        label: {
	          show: false
	        }
	      }
	    },
	    data: []
	  }]
	};

	ec.mapChart = function (data, option) {
	  var config = getOption(option, opt.mapOption);
	  var easySet = config.easySet;
	  var chartOption = config.chartOption;
	  var regionDic = {};
	  var regionData = JCalculator_min.sql({
	    select: {
	      col: {
	        name: easySet.region,
	        value: function value(row) {
	          var value = 0;
	          JCalculator_min.map(easySet.value, function (d) {
	            regionDic[easySet.region] = row;
	            value += row[d];
	          });
	          return value;
	        }
	      }
	    },
	    from: data
	  });
	  var max = JCalculator_min.max(regionData, "value");
	  delete chartOption.xAxis;
	  delete chartOption.yAxis;
	  chartOption.visualMap.max = max.value;
	  chartOption.series[0].data = regionData;
	  chartOption.series[0].mapType = easySet.mapType;
	  return chartOption;
	}; // 盒须图


	opt.boxplotOption = {
	  "tooltip": {
	    "trigger": 'item',
	    "formatter": function formatter(p) {
	      var str = "".concat(p.name, "<br/>\n        \u6700\u5927\u503C: ").concat(p.data[5], "<br/>\n        \u4E0A\u56DB\u5206\u4F4D: ").concat(p.data[4], "<br/>\n        \u4E2D\u4F4D\u6570: ").concat(p.data[3], "<br/>\n        \u4E0B\u56DB\u5206\u4F4D: ").concat(p.data[2], "<br/>\n        \u6700\u5C0F\u503C: ").concat(p.data[1], "\n        ");
	      return str;
	    }
	  },
	  "xAxis": [{
	    "type": "category",
	    "boundaryGap": true,
	    "nameGap": 30,
	    "splitArea": {
	      "show": false
	    },
	    "splitLine": {
	      "show": false
	    },
	    "data": []
	  }],
	  "yAxis": [{
	    "type": "value"
	  }],
	  "series": [{
	    "name": "boxplot",
	    "type": "boxplot"
	  }]
	};

	ec.boxplotChart = function (data, option) {
	  var config = getOption(option, opt.boxplotOption);
	  var easySet = config.easySet;
	  var chartOption = config.chartOption;
	  var legendData = [],
	      xAxisData = [],
	      series = [],
	      optSeries = chartOption.series[0];
	  var lengendGroup = JCalculator_min.groupBy(data, easySet.legend);
	  var xGroup = JCalculator_min.groupBy(data, easySet.x);
	  JCalculator_min.forIn(xGroup, function (key) {
	    xAxisData.push(key);
	  });
	  JCalculator_min.forIn(lengendGroup, function (key, val) {
	    var newSeries = JCalculator_min.extend(true, {}, optSeries);
	    var index = JCalculator_min.index(val, easySet.x);
	    legendData.push(key);
	    newSeries.data = [];
	    JCalculator_min.map(xAxisData, function (row) {
	      var arr = [];
	      easySet.y.map(function (d) {
	        arr.push(index[row][d]);
	      });
	      newSeries.data.push(arr.sort(function (a, b) {
	        return a - b;
	      }));
	    });
	    newSeries.name = key;
	    series.push(newSeries);
	  });
	  chartOption.series = series;
	  chartOption.legend.data = legendData;
	  chartOption.xAxis[0].data = xAxisData;
	  return chartOption;
	}; // ks图


	opt.ksOption = {
	  xAxis: [{
	    type: 'category',
	    boundaryGap: false
	  }],
	  yAxis: [{
	    type: 'value'
	  }],
	  series: [{
	    type: 'line',
	    markLine: {
	      animation: false,
	      // label: {
	      // 	normal: {
	      // 		formatter: 'y = 0.5 * x + 3',
	      // 		textStyle: {
	      // 			align: 'right'
	      // 		}
	      // 	}
	      // },
	      lineStyle: {
	        normal: {
	          type: 'solid'
	        }
	      },
	      // tooltip: {
	      // 	formatter: 'y = 0.5 * x + 3'
	      // },
	      data: [[{
	        coord: [],
	        symbol: 'none'
	      }, {
	        coord: [],
	        symbol: 'none'
	      }]]
	    }
	  }, {
	    type: 'line'
	  }]
	};

	ec.ksChart = function (data, option) {
	  var config = getOption(option, opt.ksOption);
	  var easySet = config.easySet;
	  var chartOption = config.chartOption;
	  var legendData = [],
	      xAxisData = [],
	      series = [];
	  var legendGroup = JCalculator_min.groupBy(data, easySet.legend); // 排序的数据

	  var orderData = JCalculator_min.sql({
	    select: {
	      col: {
	        key: easySet.x
	      },
	      sum: {
	        val: easySet.y
	      }
	    },
	    from: data,
	    groupBy: easySet.x,
	    orderBy: easySet.orderBy ? {
	      val: easySet.orderBy
	    } : false
	  });
	  orderData.map(function (row) {
	    var x = row["key"];
	    xAxisData.push(x);
	  });
	  JCalculator_min.forIn(legendGroup, function (key, val, i) {
	    legendData.push(key); // 设置图例

	    var optSeries = JCalculator_min.extend(true, {}, chartOption.series[0]);
	    var optSeries1 = JCalculator_min.extend(true, {}, chartOption.series[1]);
	    var typeGroup = JCalculator_min.groupBy(val, easySet.type); // 根据类型分组

	    var xGroup = JCalculator_min.groupBy(val, easySet.x); // x分组，为了获取最大的差

	    var Xmax = [],
	        max = 0;
	    JCalculator_min.forIn(xGroup, function (k, v) {
	      var gap = v[0][easySet.y] - v[1][easySet.y];
	      var abs = Math.abs(gap);

	      if (abs > max) {
	        Xmax = v;
	        max = abs;
	      }
	    });
	    var markDate = optSeries.markLine.data[0];
	    markDate[0].coord = [Xmax[0][easySet.x], Xmax[0][easySet.y]];
	    markDate[1].coord = [Xmax[1][easySet.x], Xmax[1][easySet.y]];
	    JCalculator_min.forIn(typeGroup, function (k, v, i) {
	      var newSeries = JCalculator_min.extend(true, {}, i == 0 ? optSeries : optSeries1);
	      var index = JCalculator_min.index(v, easySet.x);
	      newSeries.data = [];
	      JCalculator_min.map(xAxisData, function (row) {
	        newSeries.data.push(index[row]);
	      });
	      newSeries.name = key; // 设置图例

	      series.push(newSeries);
	    });
	  });
	  chartOption.series = series;
	  chartOption.legend.data = legendData;
	  chartOption.xAxis[0].data = xAxisData;

	  if (easySet.direction === 'horizontal') {
	    var t;
	    t = chartOption.xAxis[0];
	    chartOption.xAxis[0] = chartOption.yAxis[0];
	    chartOption.yAxis[0] = t;
	  }

	  return chartOption;
	}; // 修改图表默认样式


	JCalculator_min.forIn(opt, function (key, val) {
	  ec[key] = function (option, deep) {
	    if (!deep) {
	      val = JCalculator_min.extend(val, option);
	    } else {
	      val = JCalculator_min.extend(true, val, option);
	    }
	  };
	});

	return ec;

}));
