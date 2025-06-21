import chalk from 'chalk';
var keypress = require('keypress');
 
// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);
 
// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  //console.log('got "keypress"', key);

  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
  if (key.name == 'o'){
    console.log("Soy una serpiente");  
  }

  switch (key.name){
    case 'w':
    case 'up':
      console.log('UP');
      movUp();
      Draw();
      break;
    case 'd':
    case 'right':
      console.log('RIGHT');
      movRight();
      Draw();
      break;
    case 'down':
    case 's':
      console.log('DOWN');
      movDown();
      Draw();
      break;
    case 'a':
    case 'left':
      console.log('LEFT');
      movLeft();
      Draw();
      break;
  }
});

let mySnake = [
  //positions
  {x: 4, y:5},{x: 5, y:5},{x: 6, y:5}
];

function movRight() {
let growth = {x: mySnake[0].x + 1, y: mySnake[0].y};
mySnake.unshift(growth);
mySnake.pop();

console.log(mySnake);
checkIfGameOver();
}
function movLeft() {
let growth = {x: mySnake[0].x - 1, y: mySnake[0].y};
mySnake.unshift(growth);
mySnake.pop();

console.log(mySnake);
checkIfGameOver();
}
function movUp() {
let growth = {x: mySnake[0].x, y: mySnake[0].y - 1};
mySnake.unshift(growth);
mySnake.pop();

console.log(mySnake);
checkIfGameOver();
}
function movDown() {
let growth = {x: mySnake[0].x, y: mySnake[0].y + 1};
mySnake.unshift(growth);
mySnake.pop();

console.log(mySnake);
checkIfGameOver();
}

let go_flag = false;

function Draw(){
  for (let m = 0; m<10; m++){
    let line = "|";
    for(let n = 0; n <19; n++){
      let nonbody = false;
      if (m == mySnake[0].y && n == mySnake[0].x){
        if (!go_flag){
          line += chalk.blackBright("■");
        }
        nonbody  =true;
      }
      for(let i = 1; i <= mySnake.length-1; i++){
        if(m == mySnake[i].y && n == mySnake[i].x){
          line += chalk.blackBright("□");
          nonbody = true;
        }
      }
      if (!nonbody){
          line += " ";
        }
    }
    line += "|";
    console.log(chalk.bgGreenBright(line));
  }
}

function gameOver(){
  go_flag = true;
  return process.stdin.pause();
}

function checkIfGameOver(){
  for(let i = 1; i <=mySnake.length-1; i++){
    if((mySnake[0].x == mySnake[i].x) && (mySnake[0].y == mySnake[i].y)){
      gameOver();
    }
  } 
}

Draw();
process.stdin.setRawMode(true);
process.stdin.resume();