const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let homeSqueres = []
let priesai = []
let savi = []
let selectCharacter = document.getElementById('selectCharacter');
try {
    console.log(savasData)
} catch (e) {
    savasData = {
        coins: 0,
        ownedSoligers:[
            {nr:0,homeSquere: 5,extraData: {upgrade: 0}},
            {nr:1,homeSquere:4,extraData: {upgrade: 0}},
            {nr:2,homeSquere:null,extraData: {upgrade: 0}},


        ]
    }
}

sudeliokSavus();
// console.log(savi);
try {
    console.log(wave)
} catch (e) {
    wave = 1
}
setInterval(saveGameState, 10000);

updateCanvas();
let backGrount = new Image();
backGrount.src = 'img/bg.png';
let lastTime = 0;
const fps = 60;
let pause = false;
let seed = 1234567890;
let enemyCosts = []
let bangosPradeta = false;
let pelesX = 0;
let pelesY = 0;
let mouseDown = false;
let vaveHp = 0;
let leftVaveHp = 0;
let laikinasGlobalusI = 0;
enemes.forEach(e => {

    enemyCosts.push(e.hard);
});
// let waweEnemesCombination = generateEnemyWave(wave, enemyCosts, seed)
let waweEnemesCombination = []
let waweLaikas = 0;
let waweImamas = 0;
let fpsCounter = 0;
let fpsLastUpdate = 0;
let currentFps = 0;

//debugKintamieji

let debugScrean = false;
let rodytiFps = false;
let rodytiGivybes = false;

ctx.font = '22px Arial';


function animate(timestamp) {
    if (pause) {
        ctx.drawImage(backGrount, 0, 0, canvas.width, canvas.height);

        requestAnimationFrame(animate);
        return;
    }
    if (!lastTime) lastTime = timestamp;
    const deltaTime = timestamp - lastTime;

    if (deltaTime < 1000 / fps) {
        requestAnimationFrame(animate);
        return;
    }

    lastTime = timestamp;

    // FPS skaičiavimas
    fpsCounter++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backGrount, 0, 0, canvas.width, canvas.height);
    waweLaikas++;
    let ran = createSeededRandom(seed + waweImamas);

    if (bangosPradeta && waweLaikas > ran() * 25 + 25) {
        for (let i = 0; i < ran() * 10; i++) {
            if (waweImamas < waweEnemesCombination.length) {
                ran = createSeededRandom(seed + waweImamas + i);
                let randomY = Math.floor(ran() * 15) + 70;
                let randomEnemy = enemes.find(e => e.hard === waweEnemesCombination[waweImamas]);
                if (randomEnemy) {
                    priesai.push(new veikejas(randomEnemy, 100 + ran() * 10, randomY));
                }
                waweLaikas = 0;
                waweImamas++;
            }
        }

        if (priesai.length == 0 && waweImamas == waweEnemesCombination.length) {
            bangosPradeta = false;
            waweImamas = 0;
            waweLaikas = 0;
            wave++;
            nextRoundButton.style.display = '';
            saveGameState();

        }
    } 
    if (!bangosPradeta) {
        for (let i = 0; i < homeSqueres.length; i++) {
            ctx.save();
            blure = 0.5
            laikinasGlobalusI = i;
            buttons = ``
            
            if (arPeleViduje(pelesX, pelesY, homeSqueres[i])) {
                blure = 0.9
                if(mouseDown){
                    if (homeSqueres[i] && homeSqueres[i].ocupied !== null && homeSqueres[i].ocupied !== undefined) {
                        buttons = `<button onclick="removeCharacter(${i}); selectCharacter.style.display = 'none';">Remove</button>`;
                    }
                    for (let j = 0; j < savasData.ownedSoligers.length; j++) {
                    if(homeSqueres[i].ocupied === null && savasData.ownedSoligers[j].homeSquere ===null){
                        buttons += `<button onclick="savasData.ownedSoligers[${j}].homeSquere = ${i}; homeSqueres[${i}].ocupied = ${j}; sudeliokSavus(); selectCharacter.style.display = 'none';">
                        ${savasData.ownedSoligers[j].nr}
                        </button>`;
                    }}
                    
                    mouseDown = false;
                    selectCharacter.style.display = 'block';
                    selectCharacter.innerHTML=`
                    
                    <button onclick="document.getElementById('selectCharacter').style.display = 'none'">X</button>
                    <p>selected characher</p>
                   `+ `${buttons}`+`

                    <p>Ur characters</p>
                    
                    `
      
                }

            }
            
            ctx.fillStyle = 'rgba(65, 65, 85, ' + blure + ')';

            ctx.fillRect(homeSqueres[i].x, homeSqueres[i].y, homeSqueres[i].plotis, homeSqueres[i].aukstis);
             
            ctx.restore();
        }
    }

    if (timestamp - fpsLastUpdate > 1000) {
        currentFps = fpsCounter;
        fpsCounter = 0;
        fpsLastUpdate = timestamp;
        // ctx.fillStyle = "red";
        //  ctx.fillStyle = "#333";

    }


    for (let i = 0; i < priesai.length; i++) {
        priesai[i].animuok();
        priesai[i].judeti();
        // priesai[i].suzeiti(4);
        if (priesai[i].mires) {
            priesai.splice(i, 1);
            i--;
        }
        

    }
    for (let j = 0; j < savi.length; j++) {
        savi[j].animuok();
        savi[j].atack();
    }
    ctx.fillText(`Wave: ${wave}`, (80 / 100) * ePlotis, (5 / 100) * eAukstis);
    ctx.fillText(`Coins: ${savasData.coins}`, (90 / 100) * ePlotis, (5 / 100) * eAukstis);
    
    if (debugScrean || rodytiFps) ctx.fillText(`FPS: ${currentFps}`, 20, 50);
    if (debugScrean) { ctx.fillText(`Wave priesu: ${waweEnemesCombination.length}`, 20, 70); ctx.fillText(`Sukurta priesu: ${priesai.length}`, 20, 90); }
    requestAnimationFrame(animate);
}


requestAnimationFrame(animate);
