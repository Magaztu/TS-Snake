import chalk from 'chalk';
var keypress = require('keypress');
 
// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);
 
// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  //console.log('got "keypress"', key);

  inputsbyplayer++;

  if(mySnake[0].y == fruit[1] && mySnake[0].x == fruit[0]){
    //draw_fruit = true;
    snake_width++;
    GROW();
    fruitPull();
      score += score * score_multiplier;
      score_multiplier = (inputsbyplayer/1024)*0.420;
  }

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
      console.log(fruit);
      break;
    case 'a':
    case 'left':
      console.log('LEFT');
      movLeft();
      Draw();
      break;
  }
  if(mySnake[0].x == 20 || mySnake[0].x-snake_width == -1 || mySnake[0].y == 10 || mySnake[0].y == -1){
    Draw();
    console.log(chalk.inverse("GAME OVERRR" + `   SCORE: ${score.toFixed(2)}`));
    process.stdin.pause();
  }
});

let mySnake = [
  //positions
  {x: 4, y:5},{x: 5, y:5},{x: 6, y:5}
];

let snake_width = 3;
let inputsbyplayer = 0;
let score_multiplier = 0;
let score = 0;
// let draw_fruit = false;

function GROW(){
  let growth = {x: mySnake[0].x + 1, y: mySnake[0].y};
  mySnake.unshift(growth);
}

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
      if(m == fruit[1] && n == fruit[0]){
        line += chalk.redBright("¬");
        //draw_fruit = false;
        nonbody = true;
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

let fruit = [0,0];

function fruitPull(){
  let y = Math.floor(Math.random()*10);
  let x = Math.floor(Math.random()*19);
  fruit = [x,y];
}

fruitPull();
Draw();
process.stdin.setRawMode(true);
process.stdin.resume();