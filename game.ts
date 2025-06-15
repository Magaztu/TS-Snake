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
        console.log('arriba');
        break;     
    case 'a':
    case 'left':
        console.log('izquierda');
        break;
    case 's':
    case 'down':
        console.log('abajo');
        break;
    case 'd':
    case 'right':
        console.log('derecha');
        break;
  }
});


 
process.stdin.setRawMode(true);
process.stdin.resume();



// console.log("test test");

