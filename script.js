const fullScreenButton = document.getElementById("fullScreen");
const rotateImage = document.getElementById("turnDeviceNotification");
const popierius = document.getElementById("popierius");
const main = document.getElementById("main");
const container = document.getElementById("container");

let eAukstis = window.innerHeight;
let ePlotis = window.innerWidth;     
const nextRound = document.createElement("button");
nextRound.id = "nextRound";
nextRound.innerText = "Next Round";
document.body.appendChild(nextRound);
nextRound.addEventListener("click", startRound);
let kraunama = true;

function startRound(){
    // tavo raundo logika čia
}

function updateCanvas(){
    if(window.innerHeight > window.innerWidth){
        eAukstis = window.innerHeight;
        ePlotis = (eAukstis * 16) / 9;
    } else {
        ePlotis = window.innerWidth;
        eAukstis = (ePlotis * 9) / 16;
    }
    popierius.width = ePlotis;
    popierius.height = eAukstis;
}
window.addEventListener("resize", updateCanvas);
updateCanvas();

const ctx = popierius.getContext("2d");

// FPS kintamieji
let lastTime = 0;
let fps = 0;
let fpsUpdateTimer = 0;
let fpsFrameCount = 0;

// test bullet
let bullet = { x: 0, y: 100 };

function gameLoop(currentTime) {
    requestAnimationFrame(gameLoop);
    
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    // FPS skaičiavimas
    fpsFrameCount++;
    fpsUpdateTimer += deltaTime;
    if (fpsUpdateTimer >= 0.5) {
        fps = Math.round(fpsFrameCount / fpsUpdateTimer);
        fpsFrameCount = 0;
        fpsUpdateTimer = 0;
    }

    judintiVeikejus(deltaTime);
    renderGame();
}

function judintiVeikejus(dt) {
    // bullet.x += 200 * dt;
    // if (bullet.x > popierius.width) bullet.x = 0;
}

function renderGame() {
    ctx.clearRect(0, 0, popierius.width, popierius.height);

    // Kulka
    ctx.fillStyle = "red";
    ctx.beginPath();
    // ctx.arc(bullet.x, bullet.y, 10, 0, Math.PI * 2);
    ctx.fill();

    // FPS tekstas
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`FPS: ${fps}`, ePlotis - 50, 30);
}

requestAnimationFrame(gameLoop);
