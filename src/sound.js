const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');



export function playCarrot(){
    playSound(carrotSound);
}

export function playalert(){
    playSound(alertSound);
}

export function playbg(){
    playSound(bgSound);
}

export function playbug(){
    playSound(bugSound);
}

export function playwin(){
    playSound(winSound);
}


export function stopCarrot(){
    stopSound(carrotSound);
}

export function stopalert(){
    stopSound(alertSound);
}

export function stopbg(){
    stopSound(bgSound);
}

export function stopbug(){
    stopSound(bugSound);
}

export function stopwin(){
    stopSound(winSound);
}



function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
sound.pause();
}