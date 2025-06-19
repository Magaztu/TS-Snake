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
      break;
    case 'd':
    case 'right':
      console.log('RIGHT');
      break;
    case 'down':
    case 's':
      console.log('DOWN');
      break;
    case 'a':
    case 'left':
      console.log('LEFT');
      break;
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();