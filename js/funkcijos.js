function updateCanvas() {
  if ((window.innerWidth * 9) / 16 <= window.innerHeight) {
    eAukstis = (window.innerWidth * 9) / 16;
    ePlotis = window.innerWidth;
  } else {
    eAukstis = window.innerHeight;
    ePlotis = (window.innerHeight * 16) / 9;
  }

  const ratio = window.devicePixelRatio || 1;

  canvas.width = ePlotis * ratio;
  canvas.height = eAukstis * ratio;
  canvas.style.width = ePlotis + "px";
  canvas.style.height = eAukstis + "px";

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  document.body.style.overflow = "hidden";

  setHomeSqueres();
  preskaiciokDydi();
}

function sukurkPersonaza(data, x, y) {
  priesai.push(new veikejas(data, x, y));
}

function preskaiciokDydi() {
  const bazinisPlotis = 1920;
  const mastelis = ePlotis / bazinisPlotis;
  Dydis = [
    [mastelis * 150, mastelis * 150],
    [mastelis * 150, mastelis * 150],
    [mastelis * 90, mastelis * 90],
  ];
}
function generateEnemyWave(
  waveNumber,
  enemyCosts,
  seed,
  baseDifficulty = 10,
  growth = 3
) {
  let random = createSeededRandom(seed + waveNumber);

  let difficultyMultiplier = 1.5 + waveNumber * 0.05;
  let totalDifficulty =
    (baseDifficulty + waveNumber * growth) * difficultyMultiplier;

  let remaining = totalDifficulty;
  let result = [];

  while (remaining > 0) {
    let progress = 1 - remaining / totalDifficulty;

    let dynamicRatio = 0.05 + progress * 0.3;
    let maxAllowed = remaining * dynamicRatio;

    let allowOverpowered = random() < 0.02 + waveNumber * 0.005;

    let validChoices = enemyCosts.filter(
      (cost) => cost <= remaining && (allowOverpowered || cost <= maxAllowed)
    );

    if (validChoices.length === 0) {
      validChoices = enemyCosts.filter((cost) => cost <= remaining);
      if (validChoices.length === 0) break;
    }

    let choice = validChoices[Math.floor(random() * validChoices.length)];
    result.push(choice);
    remaining -= choice;
  }

  return result;
}

function createSeededRandom(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function saveGameState() {
  const gameState = {
    wave: wave,
    playerData: savasData,
    setings: setings,
  };

  localStorage.setItem("gameState", JSON.stringify(gameState));
}
function loadGameState() {
  const savedGameState = localStorage.getItem("gameState");
  if (savedGameState) {
    const gameState = JSON.parse(savedGameState);
    wave = gameState.wave;
    savasData = gameState.playerData;
    setings = gameState.setings;
  }
}

loadGameState();
function arPeleViduje(pelesX, pelesY, box) {
  return (
    pelesX >= box.x &&
    pelesX <= box.x + box.plotis &&
    pelesY >= box.y &&
    pelesY <= box.y + box.aukstis
  );
}
function suzeikPriesa(taikinys) {
  const gyviPriesai = priesai.filter((p) => !p.linkMirties);
  if (!gyviPriesai.length) return;

  let priesas;
  switch (taikinys) {
    case "first":
      priesas = gyviPriesai.reduce((a, b) => (a.x < b.x ? a : b));
      break;
    case "last":
      priesas = gyviPriesai.reduce((a, b) => (a.x > b.x ? a : b));
      break;
    case "random":
      priesas = gyviPriesai[Math.floor(Math.random() * gyviPriesai.length)];
      break;
    case "strongest":
      priesas = gyviPriesai.reduce((max, p) =>
        p.givybesStart > max.givybesStart ? p : max
      );
      break;
    case "weakest":
      priesas = gyviPriesai.reduce((min, p) =>
        p.givybes < min.givybes ? p : min
      );
      break;
    default:
      return;
  }

  return priesas;
}

function removeCharacter(i) {
  const nr = homeSqueres[i].ocupied;
  if (nr !== null) {
    savasData.ownedSoligers[nr].homeSquere = null;
    homeSqueres[i].ocupied = null;
    sudeliokSavus();
  }
}
function sudeliokSavus() {
  savi = [];
  console.log(savasData);
  for (let i = 0; i < savasData.ownedSoligers.length; i++) {
    vieta = savasData.ownedSoligers[i].homeSquere;
    if (vieta != null) {
      savi.push(
        new veikejas(
          {
            ...soligers[savasData.ownedSoligers[i].nr],
            ...savasData.ownedSoligers[i],
          },
          homeSqueres[vieta].xProc - homeSqueres[vieta].plotis / 100,
          homeSqueres[vieta].yProc - homeSqueres[vieta].aukstis / 100
        )
      );
      homeSqueres[vieta].ocupied = savasData.ownedSoligers[i].nr;
    }
  }
}

function openFullscreen() {
  console.log("test");
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    /* Safari */
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    /* IE11 */
    document.documentElement.msRequestFullscreen();
  }
}
function apskaiciokWaveHp() {
  leftVaveHp = 0;
  for (let i = 0; i < waweEnemesCombination.length; i++) {
    let hardReiksme = waweEnemesCombination[i];
    let priesas = enemes.find((e) => e.hard === hardReiksme);
    waveWorth += priesas.revard;
    leftVaveHp += priesas.givybes   + wave;
  }
}
function setRumuHp() {
  rumuHp = savasData.rumuHp;
  maxRumuHp = rumuHp;
}
function apsipirkti() {
  updateParduotuvesVidu();

  document.getElementById("parduotuve").innerHTML = "";
  parduotuvesVidus.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = `shop-item ${item.rarity}`;
    itemDiv.dataset.category = item.category;
    const dissable = savasData.coins < item.price;
    itemDiv.innerHTML = `
                 <div class="shop-item-icon">
                 <img
  src="${item.img}"
  alt="${item.alt}"
  width="650"
  height="850"
  style="position: absolute; top: 0px; left: -10px;"
/>
                 </div>
                 <div class="shop-item-info">
                 <h3>${item.name}</h3>
                 <p>Power:${item.jega}</p>
                   <p>Shoting speed:${item.saudimoGreitis}</p>

                 </div>
                 
                 <div class="shop-item-price">${item.price}</div>
                 <button   ${
                   dissable ? "disabled" : ""
                 }  onclick="nupirkti(${dissable},${item.price},${
      item.nr
    })" class="buy-button" data-item="${item.itemId}">Buy</button>
                 `;

    document.getElementById("parduotuve").appendChild(itemDiv);
  });
}

function updateParduotuvesVidu() {
  parduotuvesVidus = [];
  // TODO: zinau jog tai durnas sprendimas, as tsg noriu jog tai viektu, mano pasiteisinimas, as be miego tai cia priminimas perasyti sita !!!!!!!
  // !!!!!butinai perasiti
  let laikinas = [];
  for (let i = 0; i < soligers.length; i++) {
    laikinas.push(i);
  }
  for (let i = 0; i < savasData.ownedSoligers.length; i++) {
    if (laikinas.includes(savasData.ownedSoligers[i].nr)) {
      const indexOf = laikinas.indexOf(savasData.ownedSoligers[i].nr);
      laikinas.splice(indexOf, 1);
    }
  }
  for (let i = 0; i < laikinas.length; i++) {
    parduotuvesVidus.push(soligers[laikinas[i]]);
  }
}
function nupirkti(lock, kaina, nmr) {
  if (lock) {
    console.log("ka tu dirbi!!!");
    return;
  }

  savasData.coins -= kaina;
  savasData.ownedSoligers.push({
    nr: nmr,
    homeSquere: null,
    extraData: { speedUp: 0, damigeUp: 0, target: "first" },
  });
  apsipirkti();
}
function showBar(
  x = 10,
  y = 10,
  i = 100,
  a = 5,
  hp = 100,
  maxHp = 100,
  collor = "red",
  collorBack = "black",
  puse = 1
) {
  ctx.save();
  ctx.fillStyle = collorBack;
  ctx.fillRect((x / 100) * ePlotis, (y / 100) * eAukstis, i + 2, a + 2);
  ctx.fillStyle = collor;
  let atimtis = 0;
  if (puse == -1) {
    atimtis = i;
  }
  ctx.fillRect(
    (x / 100) * ePlotis + 1 + atimtis,
    (y / 100) * eAukstis + 1,
    (hp / maxHp) * puse * i,
    a
  );
  ctx.restore();
}
function changeTarget(index, i) {
  const kelintas = targetOptions.indexOf(
    savasData.ownedSoligers[index].extraData.target
  );

  if (targetOptions.length - 1 > kelintas) {
    savasData.ownedSoligers[index].extraData.target =
      targetOptions[kelintas + 1];
  } else {
    savasData.ownedSoligers[index].extraData.target = targetOptions[0];
  }
  sudeliokSavus();
  updateLangeliuVidu(i);
}
function updateLangeliuVidu(i) {
  chaarVidus = "";
  if (
    homeSqueres[i] &&
    homeSqueres[i].ocupied !== null &&
    homeSqueres[i].ocupied !== undefined
  ) {
    const elementas =
      savi[savi.findIndex((itm) => itm.data.nr === homeSqueres[i].ocupied)];

    const locked =
      Math.round(elementas.jega + elementas.jega / 3) > savasData.coins;
    const elementasPagalSavus =
      savasData.ownedSoligers[
        savasData.ownedSoligers.findIndex(
          (itm) => itm.nr === homeSqueres[i].ocupied
        )
      ];
    chaarVidus = `<button class="remove_char" onclick="removeCharacter(${i}); selectCharacter.style.display = 'none';">Remove</button>`;
    chaarVidus += `<button class="change_targ" onclick="changeTarget(${homeSqueres[i].ocupied},${i})">Target: ${elementasPagalSavus.extraData.target}</button>`;
    chaarVidus += `<p>Upgrade</p>`;
    chaarVidus += `<button class="upgrade"  ${
      locked ? "disabled" : ""
    } onclick="upgrade(${i})" >Price: ${Math.round(
      elementas.jega + elementas.jega / 3
    )}</button>`;
    chaarVidus += `<p>Power: ${elementas.jega} <p style="color: green;">+5</p></p>`;
  }
  for (let j = 0; j < savasData.ownedSoligers.length; j++) {
    if (
      homeSqueres[i].ocupied === null &&
      savasData.ownedSoligers[j].homeSquere === null
    ) {
      chaarVidus += `<div style="width: 100%; display: flex; justify-content: space-around; background: #d4a76a; border: 2px solid black; margin-top: 5px;">
      
      <p> Name:${soligers[savasData.ownedSoligers[j].nr].name}</p>
          <div class="shop-item-icon">
                 <img
  src="${soligers[savasData.ownedSoligers[j].nr].img}"
  
  width="650"
  height="850"
  style="position: absolute; top: 0px; left: -10px;"
/>
                 </div>
      <p>Power:${soligers[savasData.ownedSoligers[j].nr].jega + savasData.ownedSoligers[j].extraData.damigeUp}</}</p>
      
      <button onclick="savasData.ownedSoligers[${j}].homeSquere = ${i}; homeSqueres[${i}].ocupied = ${j}; sudeliokSavus(); selectCharacter.style.display = 'none';">
                        Select soliger
                        </button></div>`;
    }
  }

  mouseDown = false;
  selectCharacter.style.display = "block";
  selectCharacter.innerHTML =
    `
                    <div style="width: 100%; display: flex; justify-content: flex-end;">
                      <button style="background: #d4a76a; padding: 5px 10px; margin: 0; font-weight: bold;" onclick="document.getElementById('selectCharacter').style.display = 'none'">X</button>
                    </div>
                    <p>Selected Character</p>
                   ` + `${chaarVidus}`;
}
function upgrade(i) {
  if (typeof i !== "number" || i < 0 || i >= homeSqueres.length) return;

  const unitIndex = homeSqueres[i].ocupied;

  if (
    typeof unitIndex !== "number" ||
    unitIndex < 0 ||
    unitIndex >= savasData.ownedSoligers.length
  )
    return;

  if (savasData.ownedSoligers[unitIndex].homeSquere !== i) {
    console.warn("Bandymas prieiti prie ne savo langelio!");
    return;
  }

  const unit = savi[unitIndex];
  const price = Math.round(unit.jega + unit.jega / 3);

  if (price > savasData.coins) {
    console.log("Nepakanka coinų");
    return;
  }

  savasData.ownedSoligers[unitIndex].extraData.damigeUp += 5;
  savasData.coins -= price;

  sudeliokSavus(i);
  updateLangeliuVidu(i);
}
function arTelefonas() {
  return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}

function updateShopText(addHp = Math.round(savasData.rumuHp / 50)) {
  document.getElementById("upgradeCastleButton").innerHTML = "+" + addHp;
  document.getElementById("castleHp").innerHTML = savasData.rumuHp + "Hp";
  document.getElementById("castleUpPrice").innerHTML =
    "Price: " + Math.round((savasData.rumuHp - addHp) / 2);
  document.getElementById("upgradeCastleButton").disabled =
    savasData.coins < Math.round((savasData.rumuHp - addHp) / 2);
}

function spawnDelayByProgress(current, total, base = 2000) {
  let progress = current / total; // 0.0..1.0
  let factor = 1 - Math.abs(progress - 0.5) * 2; // 1 → lėčiausias kai per vidurį
  return base * factor;
}
function nextRound(){
   leftVaveHp = 0;
   waveWorth = 0;
    pause = false;
    bangosPradeta = true;
    waweEnemesCombination = generateEnemyWave(wave, enemyCosts, seed);
    apskaiciokWaveHp();
    vaveHp = leftVaveHp;
    setRumuHp();
    nextRoundButton.style.display = "none";
    document.getElementById("upgradeCastle").style.display = "none";
    document.getElementById("shopButton").style.display = "none";
    document.getElementById("speedUp").style.display = "block";
    document.getElementById("autoRun").style.display = "block";
    

    if(!autoRun){
      setTimeout(() => {
        if(!autoRun){
    document.getElementById("autoRun").style.display = "none"}
      },5000
      )
    }
    document.getElementById("autoRun").innerHTML = "Auto run "+ (autoRun?"ON":"OFF")  +";</br> cost for this round: " + Math.round(waveWorth * 0.4)
    console.log(autoRun)
    pralaimeta = false;
}
function wavePabaiga() {
  document.getElementById("nextRoundButton").style.display = "";
  document.getElementById("shopButton").style.display = "block";
  document.getElementById("upgradeCastle").style.display = "block";
  document.getElementById("speedUp").style.display = "none";
  document.getElementById("autoRun").style.display = "none";
  waweImamas = 0;
  bangosPradeta = false;
  saveDataInFireStore();
  if(autoRun && savasData.coins >= Math.round(waveWorth * 0.4)){
      savasData.coins -= Math.round(waveWorth * 0.4)
      autoRun = true
      nextRound()
  }
  else{
      autoRun = false;
      
    
  }
}