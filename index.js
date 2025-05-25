const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { alpha: false });
let priesai = [];
let savi = [];
let streles = [];
let selectCharacter = document.getElementById("selectCharacter");
let lock = true;
let pilisImg = new Image();
pilisImg.src = "img/castle_no_background.png";
let zolesImg = new Image();
zolesImg.src = "img/grass.png";
// ctx.translate(0, 0);
let targetOptions = ["first", "strongest", "weakest", "random", "last"];
//  rarity pasirinkimai "legendary", "rare",,"common"

let rumuHp;
let maxRumuHp;
let pralaimeta = false;
let speedUp;
if (savasData == undefined) {
  savasData = {
    coins: 0,
    rumuHp: 100,
    ownedSoligers: [
      {
        nr: 0,
        homeSquere: 8,
        extraData: { speedUp: 0, damigeUp: 0, target: "first" },
      },
      {
        nr: 1,
        homeSquere: 9,
        extraData: { speedUp: 0, damigeUp: 0, target: "first" },
      },
    ],
  };
}

// console.log(savi);
if (wave == undefined) {
  wave = 1;
}
if (speedUp == undefined) {
  speedUp = 1;
}
if (setings == undefined) {
  setings = {
    autoFullScrean: true,
  };
}
if (rumuHp == undefined) {
  rumuHp = 100;
}
updateShopText(Math.round(savasData.rumuHp / 50));
sudeliokSavus();

setTimeout(() => {
  document.getElementById("fullscreenToggle").checked = setings.autoFullScrean;
}, 1);
setInterval(saveGameState, 5000);
updateCanvas();
let backGrount = new Image();
backGrount.src = "img/thePlot.png";
let tekelisImg = new Image();
tekelisImg.src = "img/takelis.png";
let lastTime = 0;
const fps = 60;
let pause = false;
let seed = 1234567890;
let enemyCosts = [];
let bangosPradeta = false;
let pelesX = 0;
let pelesY = 0;
let mouseDown = false;
let vaveHp = 0;
let leftVaveHp = 0;

enemes.forEach((e) => {
  enemyCosts.push(e.hard);
});
// let waweEnemesCombination = generateEnemyWave(wave, enemyCosts, seed)
let waweEnemesCombination = [];
let waweLaikas = 0;
let waweImamas = 0;
let fpsCounter = 0;
let fpsLastUpdate = 0;
let currentFps = 0;

//debugKintamieji

let debugScrean = false;
let rodytiFps = false;
let rodytiGivybes = false;
let showAtack = false;
const piniguDezute = document.getElementById("pinigai");
let optiTikrint = savasData.coins;
ctx.font = "22px Arial";
function animate(timestamp) {
  if (pause) {
    lastTime = 0;
    timestamp = 0;
    requestAnimationFrame(animate);
    return;
  }
  if (!lastTime) lastTime = timestamp;
  deltaTime = (timestamp - lastTime) * speedUp;
  lastTime = timestamp;

  // FPS skaičiavimas
  fpsCounter++;
  ctx.drawImage(backGrount, 0, 0, ePlotis, eAukstis);
  if (isNaN(deltaTime)) {
    deltaTime = 0;
  }
  waweLaikas += deltaTime;
  let ran = createSeededRandom(seed + waweImamas);
  ctx.drawImage(tekelisImg, 0, 0, ePlotis, eAukstis);

  streles = streles.filter((str) => !(str.y > 100 || str.mirus));
  ctx.drawImage(
    pilisImg,
    (2 / 100) * ePlotis,
    (10.3 / 100) * ePlotis,
    ePlotis / 3,
    ePlotis / 2
  );
  for (let i = 0; i < streles.length; i++) {
    streles[i].animuok();
  }
  if (
    bangosPradeta &&
    waweLaikas > spawnDelayByProgress(waweImamas, waweEnemesCombination.length)
  ) {
    waweLaikas = 0;

    for (let i = 0; i < ran() * 4; i++) {
      if (waweImamas < waweEnemesCombination.length) {
        ran = createSeededRandom(seed + waweImamas + i);
        let randomY = Math.floor(ran() * 15) + 70;
        let randomEnemy = enemes.find(
          (e) => e.hard === waweEnemesCombination[waweImamas]
        );
        if (randomEnemy) {
          priesai.push(new veikejas(randomEnemy, 100 + ran() * 10, randomY));
        }
        waweImamas++;
        priesai.sort((a, b) => a.y - b.y);
      }
    }

if (priesai.length == 0 && waweImamas == waweEnemesCombination.length) {
  console.log("Wave baigta");
  waweImamas = 0;
  waweLaikas = 0;
  if (!pralaimeta) {
    wave++;
    document.getElementById("won").style.display = "block";

    setTimeout(() => {
      document.getElementById("won").style.display = "none";
    }, 1300);
    console.log("won");
    wavePabaiga();
  }
}

if (rumuHp <= 0) {                                  
  priesai.forEach((priesas) => {
    priesas.givybes = -1;
    priesas.lost = true;
  });
  pralaimeta = true;
  document.getElementById("lost").style.display = "block";

  setTimeout(() => {
    document.getElementById("lost").style.display = "none";
  }, 1300);
  waweEnemesCombination = [];
  waweImamas = 0;
  rumuHp = 0;
  wavePabaiga();                                                                                    
  console.log("lost");
}
  }

  if (!bangosPradeta) {
    canvas.style.cursor = "default";
    for (let i = 0; i < homeSqueres.length; i++) {
      ctx.save();
      blure = 0.4;
      buttons = ``;

      if (arPeleViduje(pelesX, pelesY, homeSqueres[i])) {
        blure = 0.7;
        if (!arTelefonas()) {
          canvas.style.cursor = "pointer";
        }
        if (mouseDown && !lock) {
          updateLangeliuVidu(i);
        }
      }

      ctx.strokeStyle = "gray";
      ctx.fillStyle = "rgba(65, 65, 85, " + blure + ")";
      ctx.beginPath();
      ctx.roundRect(
        homeSqueres[i].x,
        homeSqueres[i].y,
        homeSqueres[i].plotis,
        homeSqueres[i].aukstis,
        [5, 5, 5, 5]
      );
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    }
  }
  // saveGameState();

  for (let i = 0; i < priesai.length; i++) {
    priesai[i].animuok();
    priesai[i].judeti();
    // priesai[i].suzeiti(4);
  }
  priesai = priesai.filter((priesas) => !priesas.mires);

  for (let j = 0; j < savi.length; j++) {
    savi[j].animuok();
    if (priesai.length > 0) {
      savi[j].atack();
    }
  }

  ctx.fillText(`Wave: ${wave}`, (80 / 100) * ePlotis, (5 / 100) * eAukstis);
  ctx.fillText(
    `Coins: ${savasData.coins}`,
    (90 / 100) * ePlotis,
    (5 / 100) * eAukstis
  );
  piniguDezute.innerHTML = "Your coins: " + savasData.coins;
  ctx.fillStyle = "black";
  showBar(
    15,
    5,
    ePlotis / 2,
    eAukstis / 100,
    rumuHp,
    maxRumuHp,
    "blue",
    "brown"
  );

  showBar(
    15,
    7,
    ePlotis / 2,
    eAukstis / 100,
    leftVaveHp,
    vaveHp,
    "orange",
    "brown"
  );

  ctx.drawImage(zolesImg, 0, 0, ePlotis, eAukstis);
  if (debugScrean || rodytiFps) {
    if (timestamp - fpsLastUpdate > 1000) {
      currentFps = fpsCounter;
      fpsCounter = 0;
      fpsLastUpdate = timestamp;
    }
    ctx.fillText(`FPS: ${currentFps}`, 20, eAukstis - 50);
  }

  if (optiTikrint != savasData.coins) {
    optiTikrint = savasData.coins;
    addHp = Math.round(savasData.rumuHp / 50);
    document.getElementById("upgradeCastleButton").disabled =
      savasData.coins < Math.round((savasData.rumuHp - addHp) / 2);
  }
  if (debugScrean) {
    ctx.fillText(`Wave priesu: ${waweEnemesCombination.length}`, 20, 70);
    ctx.fillText(`Sukurta priesu: ${priesai.length}`, 20, 90);
  }
  requestAnimationFrame(animate);
}
animate();
