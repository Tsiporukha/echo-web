/* eslint-disable import/no-extraneous-dependencies, fp/no-unused-expression */
const purify = require('purify-css');
const path = require('path');

const inBuildDir = name => path.join(__dirname, `../../build/web/${name}`);


const contentPaths = [inBuildDir('bundle.js')];
const cssPaths = [inBuildDir('styles.css')];

const options = {
  output: cssPaths[0],
  info: true,
  minify: true,
};

purify(contentPaths, cssPaths, options);
