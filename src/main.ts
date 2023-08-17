let A = true;
let B = true;

let A1 = true;
let B1 = false;

let A2 = false;
let B2 = false;

function AND(a:boolean,b:boolean){
  return(a && b)
}
function OR(a:boolean,b:boolean){
  return(a || b)
}
function NOT(a:boolean){
  return(!a)
}
function XOR(a:boolean,b:boolean){
  return(OR(AND(a,NOT(b)), AND(NOT(a),b)))
}
function FULL_ADDER(a:boolean,b:boolean,c:boolean=false){
  const x1 = XOR(a,b)
  const carry = OR(AND(a,b),AND(x1, c));
  const output = XOR(x1,c);
  return [output, carry]
}
const OUTPUT_1 = FULL_ADDER(A,B)
const OUTPUT_2 = FULL_ADDER(A1,B1,OUTPUT_1[1])
const OUTPUT = FULL_ADDER(A2,B2,OUTPUT_2[1])
console.log(OUTPUT_1[0],OUTPUT_2[0],OUTPUT[0])