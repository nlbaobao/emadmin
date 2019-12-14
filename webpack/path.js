const path = require('path');
// console.log(path,'path');
const dirname = path.resolve(__dirname);
console.log(dirname,'__dirname');
const src1 = path.resolve(__dirname, "../src");
const src2 = path.resolve(__dirname, "src");
console.log(src1,'src1-----');
console.log(src2,'src2----')