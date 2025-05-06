

function updateCanvas(){
  
  if ((window.innerWidth * 9) / 16 <= window.innerHeight) {
    eAukstis = (window.innerWidth * 9) / 16;
    ePlotis = window.innerWidth;
  } else {
    eAukstis = window.innerHeight;
    ePlotis = (window.innerHeight * 16) / 9;
    
  }
  setHomeSqueres()
  preskaiciokDydi()  

  canvas.width = ePlotis;
  canvas.height = eAukstis;
  document.body.style.overflow = 'hidden'; 
}
function sukurkPersonaza(data,x,y){
  priesai.push(new veikejas(data,x,y));
}

function preskaiciokDydi() {
  const bazinisPlotis = 1920; 
  const mastelis = ePlotis / bazinisPlotis;
  Dydis = [[mastelis * 100, mastelis * 100], [mastelis * 100, mastelis * 100]];
}
function generateEnemyWave(waveNumber, enemyCosts, seed, baseDifficulty = 20, growth = 10) {
  let random = createSeededRandom(seed + waveNumber); // skirtinga seed kiekvienai bangai

  let totalDifficulty = baseDifficulty + waveNumber * growth;
  let remaining = totalDifficulty;
  let result = [];

  while (remaining > 0) {
      let progress = 1 - remaining / totalDifficulty;

      let dynamicRatio = 0.1 + progress * 0.4;
      let maxAllowed = remaining * dynamicRatio;

      let allowOverpowered = random() < 0.05;

      let validChoices = enemyCosts.filter(cost =>
          cost <= remaining && (allowOverpowered || cost <= maxAllowed)
      );

      if (validChoices.length === 0) {
          validChoices = enemyCosts.filter(cost => cost <= remaining);
          if (validChoices.length === 0) break;
      }

      let choice = validChoices[Math.floor(random() * validChoices.length)];
      result.push(choice);
      remaining -= choice;
  }

  return result;
}

function createSeededRandom(seed) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
}
function saveGameState() {
  const gameState = {
    wave: wave,
    playerData: savasData 
  };
  
  localStorage.setItem("gameState", JSON.stringify(gameState));
}
function loadGameState() {
  const savedGameState = localStorage.getItem("gameState");
  if (savedGameState) {
    const gameState = JSON.parse(savedGameState);
    wave = gameState.wave;
    savasData = gameState.playerData; 
  }
}

loadGameState();
function arPeleViduje(pelesX, pelesY, box) {
  return pelesX >= box.x &&
         pelesX <= box.x + box.plotis &&
         pelesY >= box.y &&
         pelesY <= box.y + box.aukstis;
}
function suzeikPriesa(dmg, taikinys,) {
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
      priesas = priesai.reduce((max, p) => (p.hp > max.hp ? p : max));
      break;
    case "weakest":
      priesas = priesai.reduce((min, p) => (p.hp < min.hp ? p : min));
      break;
    default:
      return;
  }
  // console.log(priesas);
  priesas.givybes -= dmg;
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
function sudeliokSavus(){
  savi = [];
      for (let i = 0; i < savasData.ownedSoligers.length; i++) {
      vieta = savasData.ownedSoligers[i].homeSquere;
      if(vieta != null ) {
          savi.push(new veikejas (soligers[savasData.ownedSoligers[i].nr] ,homeSqueres[vieta].xProc- homeSqueres[vieta].plotis/100, homeSqueres[vieta].yProc- homeSqueres[vieta].aukstis  /100));

          homeSqueres[vieta].ocupied = savasData.ownedSoligers[i].nr;
      }else{
          savi.push(new veikejas (soligers[savasData.ownedSoligers[i].nr]));
          savi[savi.length-1].pasirinktas = false;
      }
      
  }


}

