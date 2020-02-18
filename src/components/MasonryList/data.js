const fruto1 = require('./img/1.png');
const fruto2 = require('./img/2.png');
const fruto3 = require('./img/3.png');
const fruto4 = require('./img/4.png');
const fruto5 = require('./img/5.png');

const data = [
  {
    source: fruto1,
    dimensions: { width: 1, height: 1 },
    key: '1'
  },
  {
    source: fruto2,
    dimensions: { width: 1080, height: 1920 },
    key: '2'
  },
  {
    source: fruto3,
    dimensions: { width: 1080, height: 1920 },
    key: '3'
  },
  {
    source: fruto4,
    dimensions: { width: 1, height: 1 },
    key: '4'
  },
  {
    source: fruto5,
    dimensions: { width: 1080, height: 1920 },
    key: '5'
  }
];

module.exports = data;
