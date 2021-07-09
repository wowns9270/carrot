'use strict'
import *as sound from './sound.js';
import Field from './field.js';


export default class Game {

    constructor(gameDuration , carrotCount , bugCount ) {
        
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        
        
        this.gameBtn = document.querySelector('.game__button');
        this.timerIndicator = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        
        this.started = false;
        this.score = 0;
        this.timer= undefined;

        this.gameField = new Field(carrotCount , bugCount);
        this.gameField.setClickListener( (item) => {
            this.onItemClick(item);
        });

        this.gameBtn.addEventListener('click', () => {
            if (this.started) {
                this.stop();
            } else {
                this.start();
            }
        })
    }


    onItemClick = (item) => {
        if (!this.started) {
            return;
        }
    
        if (item === 'carrot') {
            this.score++;
    
            this.updateScoreBoard();
    
    
            if (this.score ===this.carrotCount) {
                this.finish(true);
            }
    
        } 
        else if (item === 'bug') {
                this.finish(false);
        }
    }

    start() {
        this.started = true;
        this.initGame();
        this._showStopButton();
        this._showTimerAndScore();
        this._startGameTimer();
        sound.playbg();
    }

    stop() {
        this.started = false;
        this._stopGameTimer();
        this._hideGameButton();
        
        sound.playalert();
        sound.stopbg();

        this.onGameStop && this.onGameStop('cancle');
    }

    finish(win) {
        this.started = false;
        this._hideGameButton();
        if (win) {
            sound.playwin();
        } else {
    
        sound.playbug();
        }
        this._stopGameTimer();
        sound.stopbg();
    
        this.onGameStop && this.onGameStop(win ? 'win': 'lose');
    
    }
    
    setGameStopListener(onGameStop){
        this.onGameStop = onGameStop;
    }
    

    initGame() {
        this.init();
        this.gameField.init();
    }

    updateScoreBoard() {
        this.gameScore.innerText = this.carrotCount - this.score;
    }


    _showStopButton() {
        const icon = this.gameBtn.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
    }
    
    _hideGameButton() {
        this.gameBtn.style.visibility = 'hidden';
    }
    
    _showTimerAndScore() {
        this.timerIndicator.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }

    _startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this._updateTimerText(remainingTimeSec);
        this.timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(this.timer);
            this.finish(this.score === this.carrotCount);
            return;
        }
        this._updateTimerText(--remainingTimeSec);
        }, 1000);
    }
    
    setting() {
        _showStopButton();
        _showTimerAndScore();
        _startGameTimer();
    }


    _stopGameTimer() {
        clearInterval(this.timer);
    }
    
    _updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.timerIndicator.innerHTML = `${minutes}:${seconds}`;
    }


    init(){
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
    }
}