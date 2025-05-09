window.addEventListener("resize", updateCanvas);
window.addEventListener("orientationchange", updateCanvas);
document.addEventListener("fullscreenchange", updateCanvas);
document.addEventListener("webkitfullscreenchange", updateCanvas); // Safari
document.addEventListener("mozfullscreenchange", updateCanvas); // Firefox
document.addEventListener("msfullscreenchange", updateCanvas); // IE/Edge
document.getElementById("fullscreenToggle").addEventListener("click", () => {
  setings.autoFullScrean = document.getElementById("fullscreenToggle").checked;
  saveGameState();
});
document.addEventListener("menuButton", () => {
  pause = true;
});
window.addEventListener("load", function () {
  nextRoundButton.style.display = "none";
});
window.addEventListener("keydown", function (event) {
  if (event.key === "F2") {
    debugScrean = !debugScrean;
    if (debugScrean) {
      document.getElementById("debugScrean").style.display = "block";
    } else {
      document.getElementById("debugScrean").style.display = "none";
    }
  }
});

document.getElementById("playButton").addEventListener("click", function () {
  if (!bangosPradeta) {
    nextRoundButton.style.display = "";
  }

  if (window.screenTop && window.screenY && setings.autoFullScrean) {
    openFullscreen();
  }
  if (lock) {
    lock = false;
  }
});
document
  .getElementById("nextRoundButton")
  .addEventListener("click", function () {
    leftVaveHp = 0;
    pause = false;
    bangosPradeta = true;
    waweEnemesCombination = generateEnemyWave(wave, enemyCosts, seed);
    apskaiciokWaveHp();
    vaveHp = leftVaveHp;
    setRumuHp();
    nextRoundButton.style.display = "none";
    pralaimeta = false;
  });
canvas.addEventListener("mousemove", function (e) {
  pelesX = e.offsetX;
  pelesY = e.offsetY;
});

canvas.addEventListener("mousedown", function (e) {
  mouseDown = true;
  setTimeout(() => {
    mouseDown = false;
    saveGameState();
  }, 100);
  if (window.screenTop && window.screenY && setings.autoFullScrean) {
    openFullscreen();
  }
});

document.getElementById("shopButton").addEventListener("click", ()=>{

  document.getElementById("shopModal").style.display = "flex";
  document.getElementById("parduotuve").innerHTML = ''
    apsipirkti()
});
document
  .getElementById("settingsButton")
  .addEventListener("click", function () {
    document.getElementById("settingsModal").style.display = "flex";
  });

document.getElementById("creditsButton").addEventListener("click", function () {
  document.getElementById("creditsModal").style.display = "flex";
});

document.getElementById("closeSettings").addEventListener("click", function () {
  document.getElementById("settingsModal").style.display = "none";
});

document.getElementById("closeCredits").addEventListener("click", function () {
  document.getElementById("creditsModal").style.display = "none";
});

document.getElementById("playButton").addEventListener("click", function () {
  document.getElementById("main").style.opacity = "0";

  // Show the game container
  const container = document.getElementById("container");
  container.style.opacity = "1";
  container.style.zIndex = "15";

  const canvas = document.getElementById("canvas");
  canvas.style.display = "block";

  if (typeof updateCanvasSize === "function") {
    updateCanvasSize();
  }

  setTimeout(function () {
    document.getElementById("main").style.display = "none";
  }, 500);
});

document.getElementById("menuButton").addEventListener("click", function () {
  // Show the main menu
  document.getElementById("main").style.display = "flex";
  document.getElementById("main").style.opacity = "1";

  // Hide the game container
  document.getElementById("container").style.opacity = "0";

  // Hide the Next Round button specifically

  setTimeout(function () {
    document.getElementById("container").style.zIndex = "5";
  }, 500);
});

document.getElementById("closeShop").addEventListener("click", function () {
  document.getElementById("shopModal").style.display = "none";
});
