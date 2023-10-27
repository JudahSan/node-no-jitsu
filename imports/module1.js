const funky = () => {
  console.log('Function funky inside module1.js');
};
const monkey = () => {
  console.log('Function monkey inside module1.js');
};

const PI = 3.14;

// module.exports = funky;
// module.exports.funky = funky;
module.exports = { funky, monkey, PI };