///////////////////////////////
// DOM elementų gavimas
///////////////////////////////
const fullScreenButton = document.getElementById("fullScreen");
const rotateImage = document.getElementById("turnDeviceNotification");
const popierius = document.getElementById("popierius");
const main = document.getElementById("main");
const container = document.getElementById("container");




///////////////////////////////
// Mygtukų kūrimas ir event'ai
///////////////////////////////
const nextRound = document.createElement("button");
nextRound.id = "nextRound";
nextRound.innerText = "Next Round";
nextRound.style.display = "none";
document.body.appendChild(nextRound);
nextRound.addEventListener("click", startRound);




screen.orientation.addEventListener("change", () => {
  pasukRageli();
});
pasukRageli();

window.addEventListener("resize", updateCanvasSize);

///////////////////////////////
// Fullscreen funkcija
///////////////////////////////
function enterFullScreen() {
  const element = document.documentElement;

  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }

  pakeisti();
  updateCanvasSize();
}

///////////////////////////////
// Canvas nustatymai
///////////////////////////////
const backGround = new Image();
backGround.src = "img/bg.png";

let eAukstis = window.innerHeight;
let ePlotis = (eAukstis * 16) / 9;
console.log(ePlotis, eAukstis);


function updateGrid(){

  grild = [{
    x: ePlotis / 8,
    y: eAukstis / 4 * 3
  },
  
  {
    x: ePlotis / 6,
    y: ePlotis/ 4 * 3
  }
]
}
updateGrid()
console.log(grild[0]);
popierius.width = ePlotis;
popierius.height = eAukstis;

const ctx = popierius.getContext("2d");

///////////////////////////////
// Žaidimo kintamieji
///////////////////////////////
let raund = 1;
let ySpawnZona = eAukstis / 4;
let ratas = 0;
inRound = false;

let kiekSukurtu = 0;
const priesai = [];
const karei = [];
const sovinys = [];

let firstLoud = 0;

let scaleX = 1;
let scaleY = 1;
///////////////////////////////
// FPS skaitliukas
///////////////////////////////
let lastTime = performance.now();
let lastFpsUpdate = lastTime;
let frameCount = 0;
let fps = 0;

///////////////////////////////
// Pagrindinis žaidimo ciklas
///////////////////////////////
function mainLoop(currentTime) {
  if (!document.mozFullScreen && !document.webkitIsFullScreen) {
    // FullScreen is disabled
  } else {
    // FullScreen is enabled
  }

  ctx.clearRect(0, 0, ePlotis, eAukstis);
  ctx.drawImage(backGround, 0, 0, ePlotis, eAukstis);

  for (let i = 0; i < karei.length; i++) {
    const kare = karei[i];
  }

  let deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  frameCount++;
  if (currentTime - lastFpsUpdate >= 1000) {
    fps = frameCount;
    frameCount = 0;
    lastFpsUpdate = currentTime;
    console.log(`FPS: ${fps}`);
  }
  ctx.fillRect(grild[0].x, grild[0].y, 50, 50);
  ratas++;
  if (ratas > 600) ratas = 0;

  if (inRound) {
    if (priesai.length === 0) {
      raund++;
      inRound = false;
      nextRound.style.display = "block";
      kiekPriesu();
      kiekSukurtu = 0;
    } else {
      for (let i = priesai.length - 1; i >= 0; i--) {
        const priesas = priesai[i];
        if (priesas.hp < 0) {
          priesai.splice(i, 1);
          continue;
        }

        ctx.drawImage(
          priesas.img,
          priesas.x * scaleX,
          priesas.y * scaleY,
          priesas.plotis,
          priesas.aukstis
        );

        ctx.fillStyle = "red";
        ctx.fillRect(
          priesas.x * scaleX,
          priesas.y - 10 * scaleY,
          (priesas.hp / priesas.fullHp) * priesas.plotis,
          5
        );

        priesas.x -= priesas.speed * deltaTime * 60;
      }
    }
  }
  // console.log(ePlotis,eAukstis)
  karioLogika(ctx, deltaTime);
  // console.log(priesai.length);
  atnaujintiSovinius(ctx);

  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
