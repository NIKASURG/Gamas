const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let priesai = []
updateCanvas();
let backGrount = new Image();   
backGrount.src = 'img/bg.png';
let lastTime = 0;
const fps = 60;  
let pause = false;
let seed = 80085;
let enemyCosts =[]
let bangosPradeta = false;

enemes.forEach(e => {
    
    enemyCosts.push(e.hard);
});
let wave = 1;
// let waweEnemesCombination = generateEnemyWave(wave, enemyCosts, seed)
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
    if (bangosPradeta && waweLaikas > 50 / wave) {
    if (waweImamas < waweEnemesCombination.length) {
        let ran = createSeededRandom(seed + waweImamas);
        let randomY = Math.floor(ran() * 15) + 70;
        let randomEnemy = enemes.find(e => e.hard === waweEnemesCombination[waweImamas]);
        if (randomEnemy) {
            priesai.push(new veikejas(randomEnemy, 100, randomY));
        }
        waweLaikas = 0;
        waweImamas++;
    }

    if (priesai.length == 0 && waweImamas == waweEnemesCombination.length) {
        bangosPradeta = false;
        pause = true;
        waweImamas = 0;
        waweLaikas = 0;
        wave++;
        nextRoundButton.style.display = '';
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
            if(priesai[i].mires){
                priesai.splice(i, 1);
                i--;
            }
            

        }
        
        ctx.fillText(`Wave: ${wave}`, (80/100) * ePlotis, (5/100) *eAukstis);
        if (debugScrean|| rodytiFps) ctx.fillText(`FPS: ${currentFps}`, 20, 50);
    requestAnimationFrame(animate);
}


requestAnimationFrame(animate);
