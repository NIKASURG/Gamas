// Initialize variables at the top
let eAukstis = window.innerHeight;
let ePlotis = (eAukstis * 16) / 9;
let rotateImage;
let fullScreenButton;
let popierius;
let main;
let container;
let nextRound;
let ctx;
let raund = 1;
let ySpawnZona;
let ratas = 0;
let inRound = false;
let lastTime = performance.now();
let lastFpsUpdate = lastTime;
let frameCount = 0;
let fps = 0;
let kiekSukurtu = 0;
const priesai = [];
const karei = [];
const sovinys = [];
const backGround = new Image();
backGround.src = "img/bg.png";

// Wait for DOM to be fully loaded before accessing elements
document.addEventListener("DOMContentLoaded", function () {
  // Initialize elements
  fullScreenButton = document.getElementById("fullScreen");
  rotateImage = document.getElementById("turnDeviceNotification");
  popierius = document.getElementById("popierius");
  main = document.getElementById("main");
  container = document.getElementById("container");

  // Create next round button but keep it hidden initially
  nextRound = document.createElement("button");
  nextRound.innerText = "Next Round";
  nextRound.style.display = "none"; // Hide button initially
  document.body.appendChild(nextRound);

  // Set up event listeners
  if (fullScreenButton) {
    fullScreenButton.addEventListener("click", enterFullScreen);
  }

  if (nextRound) {
    nextRound.addEventListener("click", startRound);
  }

  // Add event listener to play button to show game
  const playButton = document.getElementById("playButton");
  if (playButton) {
    playButton.addEventListener("click", function () {
      // Start the first round when Play is clicked
      inRound = true;
    });
  }

  if (screen.orientation) {
    screen.orientation.addEventListener("change", () => {
      pasukRageli();
    });
  }

  // Initialize canvas
  if (popierius) {
    ctx = popierius.getContext("2d");
    updateCanvasSize();

    // Initialize game variables
    ySpawnZona = eAukstis / 4;

    // Create initial characters
    for (let i = 1; i < 3; i++) {
      sukurkKari(50, eAukstis - 50 * i, 50, 50, 3, 10);
    }

    // Start the game loop
    requestAnimationFrame(mainLoop);
  }

  // Call initial functions
  pasukRageli();

  // Add window resize listener
  window.addEventListener("resize", updateCanvasSize);
});

// Funkcija, kuri įjungia pilną ekraną
function enterFullScreen() {
  const element = document.documentElement; // Pagrindinis elementas (HTML)

  // Patikriname, ar naršyklė palaiko Fullscreen API
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    // Safari
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    // Firefox
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    // IE/Edge
    element.msRequestFullscreen();
  }

  if (typeof pakeisti === "function") {
    pakeisti();
  }

  // Atinaujinti canvas dydį
  updateCanvasSize();
}

// Funkcija, kuri atnaujina canvas dydį pagal lango dydį
function updateCanvasSize() {
  if (!popierius) return;

  eAukstis = window.innerHeight;
  ePlotis = (eAukstis * 16) / 9;
  if (eAukstis > window.innerWidth) {
    eAukstis = window.innerWidth;
    ePlotis = (eAukstis * 16) / 9;
  }
  popierius.width = ePlotis;
  popierius.height = eAukstis;
  console.log("Canvas size updated: " + ePlotis, eAukstis);
}

// Placeholder for functions that might be defined elsewhere
function pasukRageli() {
  // Implementation will be added later or is defined elsewhere
  console.log("Device orientation changed");
}

function startRound() {
  // Implementation will be added later or is defined elsewhere
  console.log("Starting new round");
  inRound = true;
  if (nextRound) {
    nextRound.style.display = "none";
  }

  // Add some enemies for testing
  if (priesai.length === 0) {
    // Create a test enemy if none exist
    createTestEnemy();
  }
}

// Function to create a test enemy
function createTestEnemy() {
  const testEnemy = {
    x: ePlotis,
    y: eAukstis / 2,
    plotis: 50,
    aukstis: 50,
    hp: 100,
    fullHp: 100,
    speed: 2,
    img: new Image(),
  };
  testEnemy.img.src = "img/bg.png"; // Use background as placeholder
  priesai.push(testEnemy);
}

function sukurkKari(x, y, width, height, speed, damage) {
  // Implementation will be added later or is defined elsewhere
  karei.push({ x, y, width, height, speed, damage });
}

function kiekPriesu() {
  // Implementation will be added later or is defined elsewhere
  console.log("Calculating enemies");
}

function karioLogika(ctx, deltaTime) {
  // Implementation will be added later or is defined elsewhere
  for (let i = 0; i < karei.length; i++) {
    const kare = karei[i];
    // Logic for characters
  }
}

function atnaujintiSovinius(ctx) {
  // Implementation will be added later or is defined elsewhere
  // Logic for bullets
}

function mainLoop(currentTime) {
  if (!ctx || !popierius) return;

  ctx.clearRect(0, 0, ePlotis, eAukstis);
  ctx.drawImage(backGround, 0, 0, ePlotis, eAukstis);

  // <-- PRIIMAME DABARTINĮ LAIKĄ
  let deltaTime = (currentTime - lastTime) / 1000; // Laiko skirtumas sekundėmis
  lastTime = currentTime; // Atnaujiname laiką kitam ciklui

  ////////////////////////////////////////////////////////////
  ///// FPS skaitliukas
  frameCount++;

  if (currentTime - lastFpsUpdate >= 1000) {
    // Kas 1 sekundę atnaujina FPS
    fps = frameCount;
    frameCount = 0;
    lastFpsUpdate = currentTime; // Atnaujiname laiką FPS skaičiavimui
    console.log(`FPS: ${fps}`);
  }
  ////////////////////////////////////////////////////////////

  ratas++;
  if (ratas > 600) {
    ratas = 0;
  }

  if (inRound) {
    if (priesai.length === 0) {
      raund++;
      inRound = false;
      if (nextRound) {
        nextRound.style.display = "block";
        console.log("Next Round button should be visible now");
      }
      kiekPriesu();
      kiekSukurtu = 0;
    } else {
      for (let i = priesai.length - 1; i >= 0; i--) {
        const priesas = priesai[i];

        if (priesas.hp < 0) {
          priesai.splice(i, 1);
          continue;
        }

        ctx.drawImage(
          priesas.img,
          priesas.x,
          priesas.y,
          priesas.plotis,
          priesas.aukstis
        );
        ctx.fillStyle = "red";
        ctx.fillRect(
          priesas.x,
          priesas.y - 10,
          (priesas.hp / priesas.fullHp) * priesas.plotis,
          5
        );

        priesas.x -= priesas.speed * deltaTime * 60;
      }
    }
  }

  karioLogika(ctx, deltaTime);
  console.log(priesai.length);
  atnaujintiSovinius(ctx);

  requestAnimationFrame(mainLoop);
}
