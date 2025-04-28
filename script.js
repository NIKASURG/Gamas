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
const priesasImgs = new Image();
priesasImgs.src = "img/Veikeju_sprite/Enemy/Character6.png";
let taikytisAI = ['first', 'weakest', 'random'];
let eAukstis = window.innerHeight;
let ePlotis = (eAukstis * 16) / 9;
let statrtMonsterHp = 0;
let roundHp = 0;
let grild = [];


function updateGrid(){

  grild = [{
    x: ePlotis / 300,
    y: eAukstis / 1.42,
    p: eAukstis / 32,
  },
  
  {
    x: ePlotis / 6,
    y: ePlotis/ 4 * 3
  }
]
}
updateGrid()

popierius.width = ePlotis;
popierius.height = eAukstis;

const ctx = popierius.getContext("2d");

///////////////////////////////
// Žaidimo kintamieji
///////////////////////////////
let raund = 1;
let ratas = 0;
inRound = false;

let kiekSukurtu = 0;
const priesai = [];
const karei = [];
const sovinys = [];

let firstLoud = 0;
let framesByHz =0;
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
  }
  // ctx.fillRect(grild[0].x, grild[0].y, 50, 50);
  // console.log(deltaTime)
  ratas += deltaTime;
  
  if (inRound) {
    if (priesai.length === 0) {
      statrtMonsterHp = 0;
      
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
        

    spriteAnimation(priesasImgs,12,6,10,ctx, priesas.x * scaleX,priesas.y * scaleY,priesas.plotis,priesas.aukstis);

        // ctx.drawImage(
        //   priesas.img,
        //   priesas.x * scaleX,
        //   priesas.y * scaleY,
        //   priesas.plotis,
        //   priesas.aukstis
        // );
        
        ctx.fillStyle = "red";
        ctx.fillRect(
          priesas.x * scaleX - priesas.plotis/1.3,
          priesas.y * scaleY +30,
          (priesas.hp / priesas.fullHp) * priesas.plotis / 1.5,
          5
        );
        
        if (priesas.x > ePlotis / 3.5 ) {
        priesas.x -= priesas.speed * deltaTime * 60;
      }
      }
    }
  }
  roundHp = 0;
  for (let i = 0; i < priesai.length; i++) {
    roundHp += priesai[i].hp;
    
  }
  
  // console.log(ePlotis,eAukstis)
  karioLogika(ctx, deltaTime);
  // console.log(priesai.length);
  ctx.font = '22px Arial';
  // Pirma nupiešiam pilką foną
  ctx.fillStyle = "#333";
  ctx.fillRect(ePlotis / 4, eAukstis / 10, ePlotis / 2, eAukstis / 100);
  
  // Tada nupiešiam raudoną gyvybių kiekį
  ctx.fillStyle = "red";
  // console.log(roundHp , statrtMonsterHp)
  ctx.fillRect(ePlotis / 4, eAukstis / 10, (roundHp / statrtMonsterHp) * (ePlotis / 2), eAukstis/100);

    
  
  
  ctx.fillText(fps+ ' Fps',ePlotis / 8,eAukstis / 10);
  atnaujintiSovinius(ctx,deltaTime);
  
  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);