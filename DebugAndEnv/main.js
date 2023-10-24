// using debug package

const debug = require('debug')('app');

debug('debugging using debug');
// Debug=app node main.js

console.log('debug using console.log');

let array = [].fill(420, 0, 1000);
let array2 = array.map(item => item * 5);

debug('after the loop');
