window.addEventListener("resize", updateCanvas);
window.addEventListener("orientationchange", updateCanvas);
document.addEventListener("fullscreenchange", updateCanvas);
document.addEventListener("webkitfullscreenchange", updateCanvas); // Safari
document.addEventListener("mozfullscreenchange", updateCanvas);    // Firefox
document.addEventListener("msfullscreenchange", updateCanvas);     // IE/Edge
document.getElementById('fullscreenToggle').addEventListener('click', ()=>{
     setings.autoFullScrean = document.getElementById('fullscreenToggle').checked;
    saveGameState()
} 
)
document.addEventListener("menuButton",()=>{
    
    pause = true
});
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
    if(!bangosPradeta){

        nextRoundButton.style.display = '';
    }
    
    if (window.screenTop && window.screenY&& setings.autoFullScrean) {
        openFullscreen()
    }
    if(lock){

        lock = false
        
    }
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
        saveGameState()

    }
    , 100);
    if (window.screenTop && window.screenY && setings.autoFullScrean) {
        
        openFullscreen()
    }
});
