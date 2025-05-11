
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { alpha: false });
let priesai = [];
let savi = [];
let streles = [];
let selectCharacter = document.getElementById("selectCharacter");
let lock = true;
// ctx.translate(0, 0);

//  rarity pasirinkimai "legendary", "rare",,"common"

let rumuHp;
let maxRumuHp;
let pralaimeta = false;
let speedUp
if(savasData ==undefined){
 savasData = {
    coins: 0,
    rumuHp: 100,
    ownedSoligers: [
      { nr: 0, homeSquere: 5, extraData: { speedUp: 0,damigeUp:0,target: 'random' } },
      { nr: 1, homeSquere: 4, extraData: { speedUp: 0 ,damigeUp:0,target: 'random'} },
    ],
  };

}

 

// console.log(savi);
if(wave == undefined){

  wave = 1;
}
if(speedUp == undefined){

  speedUp = 1;
}
if(setings == undefined){

  setings = {
    autoFullScrean: true,
  };
}
sudeliokSavus();

setTimeout(() => {
  document.getElementById("fullscreenToggle").checked = setings.autoFullScrean;
}, 1);
setInterval(saveGameState, 5000);
updateCanvas();
let backGrount = new Image();
backGrount.src = "img/bg.png";
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

ctx.font = "22px Arial";
function animate(timestamp) {
  if (pause) {
    lastTime = 0
    timestamp = 0
    requestAnimationFrame(animate);
    return;

  }
  if (!lastTime) lastTime = timestamp;
  deltaTime = (timestamp - lastTime)*speedUp;
  lastTime = timestamp;



  // FPS skaičiavimas
  fpsCounter++;
  ctx.drawImage(backGrount, 0, 0, ePlotis, eAukstis);
  waweLaikas++;
  let ran = createSeededRandom(seed + waweImamas);
  for (let i = 0; i < streles.length; i++) {
    streles[i].animuok();
   
  }
  streles = streles.filter(str => !(str.y > 100 || str.mirus));
  if (bangosPradeta && waweLaikas > ran() * 25 + 25 ) {
    for (let i = 0; i < ran() * 10; i++) {
      if(waweImamas < waweEnemesCombination.length){

        ran = createSeededRandom(seed + waweImamas + i);
        let randomY = Math.floor(ran() * 15) + 70;
        let randomEnemy = enemes.find(
          (e) => e.hard === waweEnemesCombination[waweImamas]
        );
        if (randomEnemy) {
          priesai.push(new veikejas(randomEnemy, 100 + ran() * 10, randomY));
        }
        waweLaikas = 0;
        waweImamas++;
        priesai.sort((a, b) => a.y - b.y);
      }
    }

    if (priesai.length == 0 && waweImamas == waweEnemesCombination.length) {
      bangosPradeta = false;
      waweImamas = 0;
      waweLaikas = 0;
      if (!pralaimeta) {
        wave++;
        
        console.log('won')
      }
      nextRoundButton.style.display = "";
      saveDataInFireStore();

    }
    if (rumuHp <= 0) {
      priesai.forEach((priesas) => {
        priesas.givybes = -1;
      });
      pralaimeta = true;
      
      waweEnemesCombination = [];
      waweImamas = 0;
      rumuHp = 0;

      console.log('lost')
    
    }
  }
  if (!bangosPradeta) {
    for (let i = 0; i < homeSqueres.length; i++) {
      ctx.save();
      blure = 0.4;
      buttons = ``;

      if (arPeleViduje(pelesX, pelesY, homeSqueres[i])) {
        blure = 0.7;
        if (mouseDown && !lock) {
          if (
            homeSqueres[i] &&
            homeSqueres[i].ocupied !== null &&
            homeSqueres[i].ocupied !== undefined
          ) {
            buttons = `<button onclick="removeCharacter(${i}); selectCharacter.style.display = 'none';">Remove</button>`;
            buttons +=`<button>Target:</button>`
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
                    
                    `;
        }
      }

     
      ctx.fillStyle = "rgba(65, 65, 85, " + blure + ")";
      ctx.fillRect(
        homeSqueres[i].x,
        homeSqueres[i].y,
        homeSqueres[i].plotis,
        homeSqueres[i].aukstis
      );

      ctx.restore();
    }
  }
  // saveGameState();

  
  for (let i = 0; i < priesai.length; i++) {
    priesai[i].animuok();
    priesai[i].judeti();
    // priesai[i].suzeiti(4);
   
  }
priesai = priesai.filter(priesas => !(priesas.mires));

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

  
   showBar(15,5,ePlotis / 2,eAukstis / 100,rumuHp,maxRumuHp,'blue','brown')

   showBar(15,7,ePlotis / 2,eAukstis / 100,leftVaveHp,vaveHp,'orange','brown')

  if (debugScrean || rodytiFps){
   
      if (timestamp - fpsLastUpdate > 1000) {
    currentFps = fpsCounter;
    fpsCounter = 0;
    fpsLastUpdate = timestamp;
}
    ctx.fillText(`FPS: ${currentFps}`, 20, eAukstis-50);
  }

  if (debugScrean) {
    ctx.fillText(`Wave priesu: ${waweEnemesCombination.length}`, 20, 70);
    ctx.fillText(`Sukurta priesu: ${priesai.length}`, 20, 90);
  }
  requestAnimationFrame(animate);
}
animate()
// requestAnimationFrame(animate);
