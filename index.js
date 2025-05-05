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
            {nr:0,homeSquere: 5},
        ]
    }
}
setTimeout(() => {
    for (let i = 0; i < savasData.ownedSoligers.length; i++) {
        vieta = savasData.ownedSoligers[i].homeSquere
        savi.push(new veikejas (soligers[savasData.ownedSoligers[i].nr] ,homeSqueres[vieta].xProc, homeSqueres[vieta].yProc));
        homeSqueres[vieta].ocupied = true;
    }
} , 1000);


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
            if (arPeleViduje(pelesX, pelesY, homeSqueres[i])) {
                blure = 0.9
                if(mouseDown){
                    mouseDown = false;
                    selectCharacter.style.display = 'block';
                    selectCharacter.innerHTML=`
                    
                    <button onclick="document.getElementById('selectCharacter').style.display = 'none'">X</button>
                    <p>selected characher</p>

                    <p>Ur characters</p>

                    `
      
                }
            }
            
            ctx.fillStyle = 'rgba(65, 65, 85, ' + blure + ')';

            ctx.fillRect(homeSqueres[i].x, homeSqueres[i].y, homeSqueres[i].plotis, homeSqueres[i].aukstis);
           
            if(homeSqueres[i].ocupied){}    
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
    }
    ctx.fillText(`Wave: ${wave}`, (80 / 100) * ePlotis, (5 / 100) * eAukstis);
    if (debugScrean || rodytiFps) ctx.fillText(`FPS: ${currentFps}`, 20, 50);
    if (debugScrean) { ctx.fillText(`Wave priesu: ${waweEnemesCombination.length}`, 20, 70); ctx.fillText(`Sukurta priesu: ${priesai.length}`, 20, 90); }
    requestAnimationFrame(animate);
}


requestAnimationFrame(animate);
