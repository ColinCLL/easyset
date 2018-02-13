// var jc = require("../JCalculator/JCalculator.js");
(function () {
    // 多种环境支持，以及一些零碎开头引用了underscore的代码，致敬经典。
    let root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global || this;
    // 保存ec
    let previousec = root.ec;
    // 原型赋值，便于压缩
    let ArrayProto = Array.prototype, ObjProto = Object.prototype;
    let push = ArrayProto.push,
        slice = ArrayProto.slice,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;
    // 定义了一些ECMAScript 5方法
    let nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeValues = Object.values ? Object.values : function (obj) {
            return nativeKeys(obj).map(function (key) {
                return obj[key];
            })
        },
        nativeCreate = Object.create;

    // 创建一个ec对象, 保留将来有拓展成支持链式的可能
    let ec = function (obj) {
        if (obj instanceof ec) return obj;
        if (!(this instanceof ec)) return new ec(obj);
        this._wrapped = obj;
    };
    //  针对不同的环境
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = ec;
        }
        exports.ec = ec;
    } else {
        root.ec = ec;
    }
    // 版本
    ec.VERSION = '1.0.0';

    class Chart {
        constructor() {
            this.color = ["#1890FF", "#2FC25B", "#FACC14", "#223273", "#8543E0", "#13C2C2", "#3436C7", "#F04864"];
            this.grid = {
                top: 48,
                left: 16,
                right: 16,
                bottom: 12,
                containLabel: true
            };
            this.title = {
                text: "",
                top: 4,
                left: 10,
                textStyle: {
                    color: "#333"
                }
            };
            this.legend = {
                show: false,
                top: 8,
                right: 10
            };
        }
        setColor(color, deep) {
            if (!deep) {
                this.color = color;
            } else {
                this.color = jc.extend(true, this.color, color);
            }
        }
        setGrid(grid, deep) {
            if (!deep) {
                this.grid = grid;
            } else {
                this.grid = jc.extend(true, this.grid, grid);
            }
        }
        setTitle(title, deep) {
            if (!deep) {
                this.title = title;
            } else {
                this.title = jc.extend(true, this.title, title);
            }
        }
        setLegend(legend, deep) {
            if (!deep) {
                this.legend = legend;
            } else {
                this.legend = jc.extend(true, this.legend, legend);
            }
        }
        easyOption(option) {
            option.easySet ? option.easySet : option;
        }
    }

    //用于全局修改样式
    Chart.globalColor = function (color) {
        this.color = color
    }

    //easySet 兼容处理


    /******       图表        *********/

    // 柱状图
    ec.barChart = (option) => {
        let chart = new Chart();
        if (option.color) chart.setColor(option.color);
        let easySet = chart.easyOption(option);
        return chart
    }
    Chart.globalColor(["#777"]);
    // console.log()
    console.log(ec.barChart({color:"#aaa"}));
    console.log(Chart.setColor);


    // 对AMD支持的一些处理
    if (typeof define == 'function' && define.amd) {
        define('ec', [], function () {
            return ec;
        });
    }
}());