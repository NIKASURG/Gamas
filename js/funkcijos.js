

function updateCanvas(){

  if ((window.innerWidth * 9) / 16 <= window.innerHeight) {
    eAukstis = (window.innerWidth * 9) / 16;
    ePlotis = window.innerWidth;
  } else {
    eAukstis = window.innerHeight;
    ePlotis = (window.innerHeight * 16) / 9;
    
  }
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