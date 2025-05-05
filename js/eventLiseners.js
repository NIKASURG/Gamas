window.addEventListener("resize", updateCanvas);
window.addEventListener("orientationchange", updateCanvas);
document.addEventListener("fullscreenchange", updateCanvas);
document.addEventListener("webkitfullscreenchange", updateCanvas); // Safari
document.addEventListener("mozfullscreenchange", updateCanvas);    // Firefox
document.addEventListener("msfullscreenchange", updateCanvas);     // IE/Edge

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

document.getElementById('playButton').addEventListener('click', function() {
    nextRoundButton.style.display = '';
});
document.getElementById('nextRoundButton').addEventListener('click', function() {
    pause = false;
    bangosPradeta = true;
    waweEnemesCombination = generateEnemyWave(wave, enemyCosts, seed);
    nextRoundButton.style.display = 'none';
});
canvas.addEventListener("mousemove", function(e) {
     pelesX = e.offsetX;
     pelesY = e.offsetY;}
);

canvas.addEventListener("mousedown", function(e) {
    mouseDown = true;
    setTimeout(() => {
        mouseDown = false;
    }
    , 100);
});
