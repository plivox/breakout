import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    name: 'app',
    format: 'iife',
    file: 'dist/bundle.js',
  },
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
  ],
}
