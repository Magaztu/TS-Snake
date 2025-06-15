import chalk from "chalk";

interface Isnake{
    width: number,
    posx: number,
    posy: number,
    score: number
}

let snake: Isnake = {
    width: 3,
    posx: 3,
    posy: 5,
    score: 0
}

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
  switch(key.name){
    case 'w':
    case 'up':
       // console.log('arriba');
    //    snake.posx =0;
       snake.posy -=1;
       render();
        break;     
    case 'a':
    case 'left':
        //console.log('izquierda');
        snake.posx -=1;
        //snake.posy =0;
        render();
        break;
    case 's':
    case 'down':
        //console.log('abajo');
        //snake.posx =0;
        snake.posy +=1;
        render();
        break;
    case 'd':
    case 'right':
        //console.log('derecha');
        snake.posx +=1;
        //snake.posy =0;
        render();
        break;
  }
  if(snake.posy == fruit[0] && snake.posx == fruit[1]){
      snake.width++;
        frutifar();
    }
  if(snake.posx == lenght || snake.posx-snake.width == -1 || snake.posy == 10 || snake.posy == -1){
    render();
    console.log(chalk.inverse("GAME OVERRR"));
    process.stdin.pause();
  }
});

let lenght: number = 57;
let fruit: any[] = [0,0];
const frutifar = () => {
    fruit[0] = Math.floor(Math.random()*10);
    fruit[1] = Math.floor(Math.random()*((lenght-2)-(snake.posx-snake.width))+(snake.posx-snake.width+2));
}
let ceiling: string = " ";
for(let i = 0; i < lenght; i++){
    ceiling+="*";
}

const render = function(){
    console.log(chalk.red(ceiling));
    let head: number = snake.width;
    for (let m = 0; m<10; m++){
        let row = chalk.red("|");
        for(let n = 0; n<lenght; n++){
              if(m == snake.posy && n == snake.posx - head){
                  row = row + chalk.yellow("-");
                  if(head>1){head--;}
              }
             else if(m == snake.posy && n == snake.posx){
                 row= row + chalk.yellow(">");
             }
             else if(m == fruit[0] && n == fruit[1]){
                row= row + chalk.cyan("#");
             }
             else{
                row= row + "_";
            }
        }
        row= row + chalk.red("|");
    console.log(row);
    }
    console.log(chalk.red(ceiling));
}
 
render();
frutifar();
process.stdin.setRawMode(true);
process.stdin.resume();



// console.log("test test");

