import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    postcss(),
    url(),
    svgr(),
    babel({
      babelrc: false,
      presets: [['@babel/env', { 'modules': false }], '@babel/react'],
      exclude: 'node_modules/**',
      plugins: [
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-function-bind'
      ]
    }),
    resolve(),
    commonjs()
  ]
}
