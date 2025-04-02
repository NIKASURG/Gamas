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

function sukurkPriesa(kiek, koki) {
  for (let i = 0; i < kiek; i++) {
    priesai.push(
      new enemy(
        ePlotis + Math.random() * 1000,
        eAukstis - Math.random() * ySpawnZona - 100,
        50,
        50,
        0.8,
        Math.random() * 100 + 50,
        "img/vaiduoklis.png"
      )
    );
  }
}
function sukurkKari(x, y) {
  karei.push(new kareivis(x, y, 50, 50, 3, 8, "img/archer.jpeg"));
}
sukurkKari(50, eAukstis - 100);

let inGame = false;
function suzeikPriesa(dmg, taikinys) {
  if (taikinys === "first") {
    priesai.sort((a, b) => a.x - b.x);

    priesai[0].hp -= dmg;
  }
  if (taikinys === "last") {
    priesai.sort((a, b) => b.x - a.x);

    priesai[0].hp -= dmg;
  }
  if (taikinys === "random") {
    priesai[Math.floor(Math.random() * priesai.length)].hp -= dmg;
  }
  if (taikinys === "strongest") {
    priesai.sort((a, b) => a.hp - b.hp);
    priesai[0].hp -= dmg;
  }
}
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

sukurkPriesa(kiekPriesu());

function mainLoop(currentTime) {
  ctx.clearRect(0, 0, ePlotis, eAukstis);
  // ctx.drawImage(backGround, 0, 0, ePlotis, eAukstis);
  for (let i = 0; i < karei.length; i++) {
    const kare = karei[i];
    console.log(kare.x, kare.y);
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
    // priesai.sort((a, b) => a.hp - b.hp);
    // priesai.sort((a, b) => a.y - b.y);
    // priesai.sort((a, b) => a.x - b.x);
    // priesai.sort((a, b) => a.hp - b.hp);
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
    if (karys.reloding > 0) {
      karys.reloding -= deltaTime;
    } else {
      karys.reloding = karys.atackSpeed;
      suzeikPriesa(karys.dmg, karys.target);
    }
    ctx.drawImage(
      karys.img,
      karys.x,
      karys.y,
      karys.plotis,
      karys.aukstis
    );
  }

  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
