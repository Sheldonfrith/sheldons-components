// tsdx.config.js

const postcss = require('rollup-plugin-postcss');
const transformer =require('ts-type-checked/transformer');
const typescript = require('rollup-plugin-typescript2');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      // typescript({
      //   transformers: [
      //     service => ({
      //       before: [transformer(service.getProgram())],
      //       after: [],
      //     }),
      //   ],
      // }),
      postcss({
        config: {
          path: './postcss.config.js',
        },
        extensions: ['.css'],
        minimize: true,
        inject: {
          insertAt: 'top',
        },
      }),
      
    );
    return config;
  },
};