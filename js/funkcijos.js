
// let inGame = false;

// function kiekPriesu() {
//   return 10 * raund * 0.5;
// }

// function sukurkPriesa(kiek, koki) {
//   for (let i = 0; i < kiek; i++) {
//     priesai.push(
//       new Enemy(
//         ePlotis + Math.random() * 50,
//         eAukstis - Math.random() * ySpawnZona - 100,
//         50,
//         50,
//         0.8,
//         Math.random() * 100 + 50,
//         "img/vaiduoklis.png"
//       )
//     );
//   }
// }

// function sukurkKari(x = 50, y = 50, plotis = 50, aukstis = 50, dmg = 20, reloudTime = 1, img = "img/archer.png") {
//   karei.push(new Defender(x, y, plotis, aukstis, dmg, reloudTime, img));
// }

// function suzeikPriesa(dmg, taikinys, img, karioIndex = 0) {
//   if (!priesai.length) return;
//   let priesas;
//   switch (taikinys) {
//     case "first":
//       priesas = priesai.reduce((a, b) => (a.x < b.x ? a : b));
//       break;
//     case "last":
//       priesas = priesai.reduce((a, b) => (a.x > b.x ? a : b));
//       break;
//     case "random":
//       priesas = priesai[Math.floor(Math.random() * priesai.length)];
//       break;
//     case "strongest":
//       priesas = priesai.reduce((max, p) => (p.hp > max.hp ? p : max));
//       break;
//     case "weakest":
//       priesas = priesai.reduce((min, p) => (p.hp < min.hp ? p : min));
//       break;
//     default:
//       return;
//   }

//   priesas.hp -= dmg;

//   let startX = karei[karioIndex].x + karei[karioIndex].plotis;
//   let startY = karei[karioIndex].y + karei[karioIndex].aukstis / 2;
//   let distX = priesas.x - startX;
//   let distY = (priesas.y + priesas.aukstis / 2) - startY;
//   let distance = Math.sqrt(distX * distX + distY * distY);
//   let speed = 1;
//   let speedX = (distX / distance) * speed;
//   let speedY = (distY / distance) * speed;

//   sovinys.push(new Sovinys(startX, startY, priesas.x, priesas.y + priesas.aukstis / 2, 20, 20, img, false, 30, -5, speedX, speedY));
// }

// function updateCanvasSize() {
//   oldEPlotis = ePlotis;
//   oldEAukstis = eAukstis;
//   if (ePlotis > window.innerWidth) {
//     ePlotis = window.innerWidth;
//     eAukstis = (ePlotis * 9) / 16;
  
//   } else {
//     eAukstis = window.innerHeight;
//     ePlotis = (eAukstis * 16) / 9;
    
//   }
//   mapX = window.innerWidth/ ePlotis* 100;
//   mapY = window.innerHeight / eAukstis * 100; 

//   popierius.width = ePlotis;
//   popierius.height = eAukstis;
//   firstLoud++;
//   if(firstLoud ===2) {
//     for (let i = 1; i < 7; i++) {
//       for (let j = 1; j < 9; j++) {
//         //x ir y koordinates procentais nuo virsutinio kairio kampo
//         // vietoj absoliučių x/y reikšmių
//         sukurkKari(5 + 5 * i, 100 - 5 * j , 0.5, 0.5, 10, 30); // tai yra procentai nuo pločio ir aukščio

//       }
//     }
//   }

// }

// function pasukRageli() {
//   switch (window.orientation) {
//     case 0:
//     case 180:
//       rotateImage.style.display = "block";
//       break;
//     case 90:
//     case -90:
//       rotateImage.style.display = "none";
//       break;
//   }
  
// }

// function pakeisti() {
//   inGame = !inGame;
//   if (inGame) {
//     popierius.style.display = "block";
//     main.style.display = "none";
//     console.log(nextRound)
//     nextRound.style.display = "block";
    
//   } else {
//     main.style.display = "block";
//     popierius.style.display = "none";
//     nextRound.style.display = "none";

//   }
//   if (!(document.fullscreenElement != null)) {
//     document.documentElement.requestFullscreen();
   
//   }

// }

// function startRound() {
//   sukurkPriesa(kiekPriesu());
//   nextRound.style.display = "none";
//   inRound = true;
// }


// function atnaujintiSovinius(ctx) {
//   for (let i = sovinys.length - 1; i >= 0; i--) {
//     let sv = sovinys[i];
//     ctx.drawImage(sv.img, sv.x +  mapX, sv.y + mapY, sv.plotis, sv.aukstis);
//     if (sv.guliLaiko > 0) {
//       sv.guliLaiko--;
//       continue;
//     }
//     if (sv.judaAukstyn) {
//       sv.y += sv.pradinisYgreitis;
//       sv.pradinisYgreitis += 0.1;
//       if (sv.y <= sv.maxAukstis) {
//         sv.judaAukstyn = false;
//       }
//     }
//     if (!sv.judaAukstyn) {
//       sv.x += (sv.targetX - sv.x) * 0.005;
//       sv.y += (sv.targetY - sv.y) * 0.005;
//     }
//     if (Math.abs(sv.x - sv.targetX) < 2 && Math.abs(sv.y - sv.targetY) < 2) {
//       sovinys.splice(i, 1);
//     }
//   }
// }

// function karioLogika(ctx, deltaTime) {
//   for (let i = karei.length - 1; i >= 0; i--) {
//     let karys = karei[i];
//     if (karys.reloding < karys.reloudTime) {
//       karys.reloding += deltaTime * 60;
//     } else {
//       karys.reloding = 0;
//       suzeikPriesa(karys.dmg, karys.target, 'img/arow.png', i);
//     }
//     console.log(mapX, mapY);
//     ctx.drawImage(karys.img, karys.x, karys.y, karys.plotis * mapX, karys.aukstis * mapY);

//   }
// }