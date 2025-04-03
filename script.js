// Paimkite mygtuką pagal ID
const fullScreenButton = document.getElementById("fullScreen");

// Funkcija, kuri įjungia pilną ekraną
function enterFullScreen() {
  const element = document.documentElement; // Pagrindinis elementas (HTML)

  // Patikriname, ar naršyklė palaiko Fullscreen API
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) { // Safari
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) { // Firefox
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) { // IE/Edge
    element.msRequestFullscreen();
  }
  pakeisti();
  eAukstis = window.innerHeight;
   ePlotis = eAukstis * 16 / 9;
  console.log(ePlotis);
  console.log(eAukstis);
  popierius.width = ePlotis;
  popierius.height = eAukstis;
}

// Priskirkite funkciją mygtukui
fullScreenButton.addEventListener("click", enterFullScreen);


const popierius = document.getElementById("popierius");
const main = document.getElementById("main");

const nextRound = document.createElement("button");
nextRound.innerText = "Next Round";
document.body.appendChild(nextRound);


nextRound.addEventListener("click", startRound);

const backGround = new Image();
backGround.src = "img/bg.png";

// console.log(backGround[0]);
// const ePlotis = window.innerWidth;
let eAukstis = window.innerHeight;
let ePlotis = eAukstis * 16 / 9;
console.log(ePlotis);
console.log(eAukstis);
popierius.width = ePlotis;
popierius.height = eAukstis;

const ctx = popierius.getContext("2d");
let raund = 1;
let ySpawnZona = eAukstis / 4;
let ratas = 0;


inRound = false;
///////////////////////
//GPT fps counter
let lastTime = performance.now();
let lastFpsUpdate = lastTime;
let frameCount = 0;
let fps = 0;

///////////////

let kiekSukurtu = 0;
const priesai = [];
const karei = [];
const sovinys = [];
for (let i = 1; i < 20; i++) {
  
  sukurkKari(50, eAukstis - 50 * i ,50,50,3,10);
}



function mainLoop(currentTime) {
  ctx.clearRect(0, 0, ePlotis, eAukstis);
  ctx.drawImage(backGround, 0, 0, ePlotis, eAukstis);
  for (let i = 0; i < karei.length; i++) {
    const kare = karei[i];
  }
  // <-- PRIIMAME DABARTINĮ LAIKĄ
  let deltaTime = (currentTime - lastTime) / 1000; // Laiko skirtumas sekundėmis
  lastTime = currentTime; // Atnaujiname laiką kitam ciklui
  
  ////////////////////////////////////////////////////////////
  ///// FPS skaitliukas
  frameCount++;
  
  if (currentTime - lastFpsUpdate >= 1000) {
    // Kas 1 sekundę atnaujina FPS
    fps = frameCount;
    frameCount = 0;
    lastFpsUpdate = currentTime; // Atnaujiname laiką FPS skaičiavimui
    console.log(`FPS: ${fps}`);
  }
  ////////////////////////////////////////////////////////////
  
  ratas++;
  if (ratas > 600) {
    ratas = 0;
    
  }
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
        priesas.x,
        priesas.y,
        priesas.plotis,
        priesas.aukstis
      );
      ctx.fillStyle = "red";
      ctx.fillRect(
        priesas.x,
        priesas.y - 10,
        (priesas.hp / priesas.fullHp ) * priesas.plotis,
        5
      );

      priesas.x -= priesas.speed * deltaTime * 60;
    }
  }
}else{

}
karioLogika(ctx,deltaTime)
  console.log(priesai.length);
  atnaujintiSovinius(ctx);
  
  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
