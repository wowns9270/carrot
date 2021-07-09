'use strict';

import Game from './game.js';
import PopUp from './popup.js';

let started = false;
let timer = undefined;

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 20;


const popUpFinishBanner = new PopUp();
popUpFinishBanner.setClickListener( () => {
  game.start();
});


const game = new Game(20, 10 ,10);
game.setGameStopListener((reason) => {

  console.log(reason);

  if(reason === 'win'){
    popUpFinishBanner.showWithText('you win');
  }
  else if(reason === 'lose'){
    popUpFinishBanner.showWithText('you lost');
  }
  else{
    popUpFinishBanner.showWithText('replay?');
  }

})







