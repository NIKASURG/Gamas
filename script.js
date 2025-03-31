const popierius = document.getElementById("popierius");
const main = document.getElementById("main");

const ePlotis = window.innerWidth;
const eAukstis = window.innerHeight;
popierius.width = ePlotis;
popierius.height = eAukstis;
const ctx = popierius.getContext("2d");
let raund = 1;
let ySpawnZona = eAukstis / 2;
let ratas = 0;

function kiekPriesu() {
  return raund * 25 + 100;
}

///////////////////////
//GPT fps counter
let lastTime = performance.now();
let lastFpsUpdate = lastTime; 
let frameCount = 0;
let fps = 0;

///////////////

let kiekSukurtu = 0;
const priesai = [];
class kareivis {
  constructor(x, y, plotis, aukstis, dmg, atackSpeed,img) {
    this.x = x;
    this.y = y;
    this.plotis = plotis;
    this.aukstis = aukstis;
    this.dmg = dmg;
    this.atackSpeed = atackSpeed;
    this.img = new Image();
    this.img.src = img;
  }
}

class enemy {
  constructor(x, y, plotis, aukstis, speed, hp, img) {
    this.x = x;
    this.y = y;
    this.plotis = plotis;
    this.aukstis = aukstis;
    this.speed = speed;
    this.hp = hp;

    this.img = new Image();
    this.img.src = img;
  }
}
function sukurkPriesa(kiek) {
  for (let i = 0; i < kiek; i++) {

    priesai.push(
      new enemy(
        ePlotis + Math.random() * 1000,
        eAukstis - Math.random() * ySpawnZona - 100,
        50,
        50,
        0.8,
        100,
        "img/vaiduoklis.png"
      )
    );
  }
}
// spawnPriesa()
// spawnPriesa()
// spawnPriesa()
// spawnPriesa()
// spawnPriesa()
// spawnPriesa()

let inGame = false;

function pakeisti() {
  inGame = !inGame;

  if (inGame) {
    popierius.style.display = "block";

    main.style.display = "none";
  } else {
    main.style.display = "block";
    popierius.style.display = "none";
  }
}

// uskomentuok sia funkcija dirbant ne ant canvas jog neatsirastum is karto zaidime ir priesingai
pakeisti();

sukurkPriesa(1000);



function mainLoop(currentTime) {
  // <-- PRIIMAME DABARTINĮ LAIKĄ
  let deltaTime = (currentTime - lastTime) / 1000; // Laiko skirtumas sekundėmis
  lastTime = currentTime; // Atnaujiname laiką kitam ciklui

    ////////////////////////////////////////////////////////////
    ///// FPS skaitliukas
    frameCount++;

    if (currentTime - lastFpsUpdate >= 1000) { // Kas 1 sekundę atnaujina FPS
        fps = frameCount;
        frameCount = 0;
        lastFpsUpdate = currentTime; // Atnaujiname laiką FPS skaičiavimui
        console.log(`FPS: ${fps}`);
    }
    ////////////////////////////////////////////////////////////

  ratas++;
  if (ratas > 600) {
    ratas = 0;
    priesai.sort((a, b) => a.x - b.x);
  }
  ctx.clearRect(0, 0, ePlotis, eAukstis);

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

  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
