// code goes here, this is a variant where the snake moves forward automatically. Based on Classic-Snake
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
    // snake_width++;
    GROW();
    fruitPull();
      score += score + score_magnify;
      score_magnify = (inputsbyplayer/1024)*0.420;
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
      break;
    case 'a':
    case 'left':
      console.log('LEFT');
      movLeft();
      Draw();
      break;
  }
  if (go_flag){
    console.log(chalk.inverse("GAME OVERRR" + `   SCORE: ${score.toFixed(2)}`));
  }
});

let mySnake = [
  //positions
  {x: 4, y:5},{x: 5, y:5},{x: 6, y:5}
];

// let snake_width = 3;
let inputsbyplayer = 0;
let score_magnify = 1;
let score = 1;
// let draw_fruit = false;

function GROW(){
  let growth = {x: mySnake[mySnake.length-1].x, y: mySnake[mySnake.length-1].y};
  mySnake.push(growth);
}

function movRight() {
let growth = {x: mySnake[0].x + 1, y: mySnake[0].y};
mySnake.unshift(growth);
mySnake.pop();

// console.log(mySnake);
checkIfGameOver();
}

function movLeft() {
let growth = {x: mySnake[0].x - 1, y: mySnake[0].y};
mySnake.unshift(growth);
mySnake.pop();

// console.log(mySnake);
checkIfGameOver();
}

function movUp() {
let growth = {x: mySnake[0].x, y: mySnake[0].y - 1};
mySnake.unshift(growth);
mySnake.pop();

// console.log(mySnake);
checkIfGameOver();
}

function movDown() {
let growth = {x: mySnake[0].x, y: mySnake[0].y + 1};
mySnake.unshift(growth);
mySnake.pop();

// console.log(mySnake);
checkIfGameOver();
}

let go_flag = false;
let head_drawn = false;

function Draw(){
    console.log('');
  for (let m = 0; m<10; m++){
    let line = "|";
    for(let n = 0; n <19; n++){
      let nonbody = false;
      if (m == mySnake[0].y && n == mySnake[0].x){
        if (!go_flag){
          line += chalk.cyanBright("■");
          head_drawn = true;
        }
        nonbody  =true;
      }
      if((m == fruit[1] && n == fruit[0]) && head_drawn == false){
        line += chalk.blue("~");
        //draw_fruit = false;
        nonbody = true;
      }
      for(let i = 1; i <= mySnake.length-1; i++){
        if((m == mySnake[i].y && n == mySnake[i].x)&& head_drawn == false){
          line += chalk.cyanBright("□");
          nonbody = true;
        }
      }
      if (!nonbody){
          line += " ";
        }
      head_drawn = false;
    }
    line += "|";
    console.log(chalk.bgYellowBright(line));
  }
  // console.log(fruit);
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
  if(mySnake[0].x == 19 || mySnake[0].x == -1 || mySnake[0].y == 10 || mySnake[0].y == -1){
    // console.log(`
    //   `);
    gameOver();
  }
}

let fruit = [0,0];

function fruitPull(){
  let y: number
  let x: number

  let is_open: boolean = false;
  do{
    y = Math.floor(Math.random()*10);
    x = Math.floor(Math.random()*19);
    is_open = true;
    for(let i = 0; i <=mySnake.length-1; i++){
      if((x == mySnake[i].x) && (y == mySnake[i].y)){
        is_open = false;
      }
    }
  }while (is_open == false);
  fruit = [x,y];
}

fruitPull();
Draw();
process.stdin.setRawMode(true);
process.stdin.resume();

// How do I make this one have a frame-rate / work with frames per second?
//I'll look up a library for this...