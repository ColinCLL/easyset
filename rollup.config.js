import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
export default {
  input: 'src/index.js',
  format: 'umd',
  dest: './build/bundle.js',
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // 仅仅转译我们的源码
    })
  ]
};