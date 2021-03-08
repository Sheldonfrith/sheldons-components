// tsdx.config.js

const postcss = require('rollup-plugin-postcss');
import transformer from 'ts-type-checked/transformer';
import typescript from 'rollup-plugin-typescript2';

module.exports = {
  rollup(config, options) {
    config.plugins.push(
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
      typescript({
        transformers: [
          service => ({
            before: [transformer(service.getProgram())],
            after: [],
          }),
        ],
      }),
    );
    return config;
  },
};