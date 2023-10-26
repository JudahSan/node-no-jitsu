const fs = require("fs");

// const mod = require('./module1')
// const guba = require('../module101/gubaguba.js')

const {funky, monkey, PI} = require('./module1')
const guba = require('../module2')

// mod.funky();
// mod.monkey()

funky();
console.log(PI);

guba();