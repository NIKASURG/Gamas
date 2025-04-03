const popierius = document.getElementById("popierius");
const main = document.getElementById("main");


const backGround = new Image();
backGround.src = "img/bg.png";

// console.log(backGround[0]);
const ePlotis = window.innerWidth;
const eAukstis = window.innerHeight;

popierius.width = ePlotis;
popierius.height = eAukstis;

const ctx = popierius.getContext("2d");
let raund = 1;
let ySpawnZona = eAukstis / 4;
let ratas = 0;

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

for (let i = 0; i < 8; i++) {
  
  sukurkKari(50, eAukstis - 50 *i);
}


sukurkPriesa(kiekPriesu());

function mainLoop(currentTime) {
  ctx.clearRect(0, 0, ePlotis, eAukstis);
  // ctx.drawImage(backGround, 0, 0, ePlotis, eAukstis);
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

  if (priesai.length === 0) {
    raund++;
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

      priesas.x -= priesas.speed * deltaTime * 60;
    }
  }

  for (let i = karei.length - 1; i >= 0; i--) {
    karys = karei[i];
    if (karys.reloding < karys.atackSpeed) {
      karys.reloding += deltaTime*60;
      // console.log(karys.reloding)
    } else {
      karys.reloding = 0;
      suzeikPriesa(karys.dmg, karys.target);

    }
    ctx.drawImage(karys.img, karys.x, karys.y, karys.plotis, karys.aukstis);
  }

  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
