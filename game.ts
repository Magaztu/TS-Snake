interface Isnake{
    width: number,
    posx: number,
    posy: number,
    score: number
}

let snake: Isnake = {
    width: 3,
    posx: 10,
    posy: 10,
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
});

let lenght: number = 57;
let ceiling: string = " ";
for(let i = 0; i < lenght; i++){
    ceiling+="*";
}

const render = function(){
    console.log(ceiling);
    for (let m = 0; m<10; m++){
        let row = "|";
        for(let n = 0; n<lenght; n++){
            if(m == snake.posy && n == snake.posx){
                row= row + "@"
            }else{
                row= row + "_"
            }
        }
        row= row + "|"
    console.log(row);
    }
    console.log(ceiling);
}
 
process.stdin.setRawMode(true);
process.stdin.resume();



// console.log("test test");

