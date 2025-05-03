window.addEventListener('resize', function() {updateCanvas();});
window.addEventListener('load', function() {
    nextRoundButton.style.display = 'none';});
window.addEventListener('keydown', function(event) {
    if (event.key === 'F2') {
        debugScrean = !debugScrean;
        if (debugScrean) {
            document.getElementById('debugScrean').style.display = 'block';
        } else {
            document.getElementById('debugScrean').style.display = 'none';
        }
    }
});
document.getElementById('rodytiFps').addEventListener('click', function() {
    rodytiFps = !rodytiFps;
    if (rodytiFps) {
        document.getElementById('rodytiFps').innerText = 'Slepti Fps';
    } else {
        document.getElementById('rodytiFps').innerText = 'Rodyti FPS';
    }
}
);
document.getElementById('showHp').addEventListener('click', function() {
    rodytiGivybes = !rodytiGivybes;
    if (rodytiGivybes) {
        document.getElementById('showHp').innerText = 'Slepti HP';
    } else {
        document.getElementById('showHp').innerText = 'Rodyti Hp';
    }
}
);
document.getElementById('playButton').addEventListener('click', function() {
    nextRoundButton.style.display = '';
});
document.getElementById('nextRoundButton').addEventListener('click', function() {
    pause = false;
    bangosPradeta = true;
    waweEnemesCombination = generateEnemyWave(wave, enemyCosts, seed);
    nextRoundButton.style.display = 'none';
});
