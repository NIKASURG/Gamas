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
  ];
}
function generateEnemyWave(
  waveNumber,
  enemyCosts,
  seed,
  baseDifficulty = 10,
  growth = 3
) {
  let random = createSeededRandom(seed + waveNumber); // skirtinga seed kiekvienai bangai

  let totalDifficulty = baseDifficulty + waveNumber * growth;
  let remaining = totalDifficulty;
  let result = [];

  while (remaining > 0) {
    let progress = 1 - remaining / totalDifficulty;

    let dynamicRatio = 0.1 + progress * 0.4;
    let maxAllowed = remaining * dynamicRatio;

    let allowOverpowered = random() < 0.05;

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
function suzeikPriesa( taikinys) {
  if (!priesai.length) return;
  let priesas;
  switch (taikinys) {
    case "first":
      priesas = priesai.reduce((a, b) => (a.x < b.x ? a : b));
      break;
    case "last":
      priesas = priesai.reduce((a, b) => (a.x > b.x ? a : b));
      break;
    case "random":
      priesas = priesai[Math.floor(Math.random() * priesai.length)];
      break;
    case "strongest":
      priesas = priesai.reduce((max, p) => (p.givybes > max.givybes ? p : max));
      break;
    case "weakest":
      priesas = priesai.reduce((min, p) => (p.givybes < min.givybes ? p : min));
      break;
    default:
      return;
  }
  // console.log(priesas);
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
  console.log(savasData)
  for (let i = 0; i < savasData.ownedSoligers.length; i++) {
    vieta = savasData.ownedSoligers[i].homeSquere;
    if (vieta != null) {
      savi.push(
        new veikejas(
          {...soligers[savasData.ownedSoligers[i].nr] ,...savasData.ownedSoligers[i]},
          homeSqueres[vieta].xProc - homeSqueres[vieta].plotis / 100,
          homeSqueres[vieta].yProc - homeSqueres[vieta].aukstis / 100,
        )
      );
      homeSqueres[vieta].ocupied = savasData.ownedSoligers[i].nr;
    } else {
      // savi[savi.length - 1].pasirinktas = false;
    }
  }
}

function openFullscreen() {
  console.log('test')
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
function apskaiciokWaveHp(){
  leftVaveHp = 0
  for (let i = 0; i < waweEnemesCombination.length; i++) {
    let hardReiksme = waweEnemesCombination[i];
    let priesas = enemes.find(e => e.hard === hardReiksme);

    leftVaveHp += priesas.givybes;;
}
}
function setRumuHp(){

  rumuHp = savasData.rumuHp
  maxRumuHp = rumuHp
}
function apsipirkti() {
  
  updateParduotuvesVidu()

  document.getElementById("parduotuve").innerHTML = ''
  parduotuvesVidus.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = `shop-item ${item.rarity}`;
    itemDiv.dataset.category = item.category;
    const dissable = savasData.coins < item.price
    itemDiv.innerHTML = `
                 <div class="shop-item-icon">
                 <img src="${item.img}" alt="${item.alt}" width="40" height="40" />
                 </div>
                 <div class="shop-item-info">
                   <h3>${item.name}</h3>
                   <p>Power:${item.jega}</p>
                   <p>Shoting speed:${item.saudimoGreitis}</p>

                 </div>
                 
                 <div class="shop-item-price">${item.price}</div>
                 <button   ${dissable   ? "disabled" : ""}  onclick="nupirkti(${dissable},${item.price},${item.nr})" class="buy-button" data-item="${item.itemId}">Buy</button>
                 `;
    
    document.getElementById("parduotuve").appendChild(itemDiv);
  });
}

function updateParduotuvesVidu(){

  parduotuvesVidus = []
  // TODO: zinau jog tai durnas sprendimas, as tsg noriu jog tai viektu, mano pasiteisinimas, as be miego tai cia priminimas perasyti sita !!!!!!!
  // !!!!!butinai perasiti 
  let laikinas = []
  for (let i = 0; i < soligers.length; i++) {
    laikinas.push(i)
    
  }
  for (let i = 0; i < savasData.ownedSoligers.length; i++) {
    
    if(
      laikinas.includes(savasData.ownedSoligers[i].nr)
    ){
      
      const indexOf =laikinas.indexOf(savasData.ownedSoligers[i].nr)
      laikinas.splice(indexOf, 1)
    }
  }
  for (let i = 0; i < laikinas.length; i++) {
      parduotuvesVidus.push(soligers[laikinas[i]])
    
  }
}
function nupirkti(lock,kaina,nmr){
  if(lock){
    console.log("ka tu dirbi!!!")
    return;
  }

  savasData.coins -= kaina
  savasData.ownedSoligers.push(
    { nr: nmr, homeSquere: null, extraData: { speedUp: 0 ,damigeUp:0} },
  )
  apsipirkti()
}
function showBar(x = 10,y=10,i=100,a=5,hp=100,maxHp=100,collor = 'red',collorBack ='black'){
  ctx.save()
  ctx.fillStyle = collorBack
  ctx.fillRect((x/100)*ePlotis,(y/100)*eAukstis , i+2,a+2)
  ctx.fillStyle = collor
  ctx.fillRect((x/100)*ePlotis +1,(y/100)*eAukstis+1,(hp/maxHp)* i,a)
  ctx.restore()
}
function changeTarget(index,i){
  const kelintas = targetOptions.indexOf(savasData.ownedSoligers[index].extraData.target)
  if(targetOptions.length - 1> kelintas){
    savasData.ownedSoligers[index].extraData.target= targetOptions[kelintas +1]
  }else{
    savasData.ownedSoligers[index].extraData.target= targetOptions[0]
  }
updateLangeliuVidu(i)
}
function updateLangeliuVidu(i){
      if (
            homeSqueres[i] &&
            homeSqueres[i].ocupied !== null &&
            homeSqueres[i].ocupied !== undefined
          ) {
            buttons = `<button onclick="removeCharacter(${i}); selectCharacter.style.display = 'none';">Remove</button>`;
            buttons +=`<button onclick="changeTarget(${homeSqueres[i].ocupied},${i})">Target: ${savasData.ownedSoligers[homeSqueres[i].ocupied].extraData.target}</button>`
          }
          for (let j = 0; j < savasData.ownedSoligers.length; j++) {
            if (
              homeSqueres[i].ocupied === null &&
              savasData.ownedSoligers[j].homeSquere === null
            ) {
              buttons += `<button onclick="savasData.ownedSoligers[${j}].homeSquere = ${i}; homeSqueres[${i}].ocupied = ${j}; sudeliokSavus(); selectCharacter.style.display = 'none';">
                        ${savasData.ownedSoligers[j].nr}
                        </button>`;
            }
          }

          mouseDown = false;
          selectCharacter.style.display = "block";
          selectCharacter.innerHTML =
            `
                    
                    <button onclick="document.getElementById('selectCharacter').style.display = 'none'">X</button>
                    <p>selected characher</p>
                   ` +
            `${buttons}` +
            `

                    <p>Ur characters</p>
                    <p></p>
                    <p></p>

                    
                    `;
}