const cp = require('child_process');
const {promisify} = require('util');

const exec = promisify(cp.exec);

const installTypescript = async (i, id, getPackages, getDeps) => {
  const devDeps = ['@babel/preset-typescript'];
  try {
    await exec('tsc --help')
  } catch(e) {
    devDeps.push('typescript')
  }
  return id(devDeps)
}

const pkg = {
  config: {
    resolve: {
      extensions: ['.ts', '.js', '.json']
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-typescript',
              ],
            }
          }
        },
      ]
    }
  },
  executor: installTypescript
}

module.exports = pkg;