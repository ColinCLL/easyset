import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";

export default {
  input: "src/index.js",
  output: {
    file: "build/easyset.min.js",
    format: "umd",
    name: "ec"
  },
  namedExports: {
    jcalculator: ["jc"]
  },
  plugins: [
    resolve({
      module: false
    }),
    commonjs({
      namedExports: {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        "node_modules/jcalculator/JCalculator.min.js": ["jcalculator"]
      }
    }),
    babel({
      exclude: "node_modules/**" // 只编译我们的源代码
    })
  ]
};
