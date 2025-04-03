let inGame = false;


function kiekPriesu() {
    return 10 * raund * 0.5 ;
  }


  function sukurkPriesa(kiek, koki) {
    for (let i = 0; i < kiek; i++) {

      priesai.push(
        new Enemy(
          ePlotis + Math.random() * 50,
          eAukstis - Math.random() * ySpawnZona - 100,
          50,
          50,
          0.8,
          Math.random() * 100 + 50,
          "img/vaiduoklis.png"
        )
      );
    }
  }


  function sukurkKari(x= 50 , y= 50, plotis = 50, aukstis = 50, dmg = 20, reloudTime = 1, img = "img/archer.jpeg") {
    karei.push(new Defender(x, y, plotis, aukstis, dmg, reloudTime, img));
  }

  function suzeikPriesa(dmg, taikinys, img, karioIndex = 0) {
    if (!priesai.length) return;

    let priesas;
    switch (taikinys) {
        case "first":
            priesas = priesai.reduce((a, b) => (a.x < b.x ? a : b));
            break;
        case "last":
            priesas = priesai.reduce((a, b) => (a.x > b.x ? a : b));
            break;
        case "random":
            priesas = priesai[Math.floor(Math.random() * priesai.length)];
            break;
        case "strongest":
            priesas = priesai.reduce((max, p) => (p.hp > max.hp ? p : max));
            break;
        case "weakest":
            priesas = priesai.reduce((min, p) => (p.hp < min.hp ? p : min));
            break;
        default:
            return;
    }
    
    priesas.hp -= dmg;
    
    let startX = karei[karioIndex].x + karei[karioIndex].plotis;
    let startY = karei[karioIndex].y + karei[karioIndex].aukstis / 2;
    let distX = priesas.x - startX;
    let distY = (priesas.y + priesas.aukstis / 2) - startY;
    let distance = Math.sqrt(distX * distX + distY * distY);
    let speed = 5  ; // Šovinio greitis
    let speedX = (distX / distance) * speed;
    let speedY = (distY / distance) * speed;
    
    sovinys.push(new Sovinys(startX, startY, priesas.x, priesas.y + priesas.aukstis / 2, 20, 20, img, false, 30, -5, speedX, speedY));
}




  function pakeisti() {
    inGame = !inGame;
  
    if (inGame) {
      popierius.style.display = "block";
  
      main.style.display = "none";
    } else {
      main.style.display = "block";
      popierius.style.display = "none";
    }
  }
function startRound(){
   sukurkPriesa(kiekPriesu());

  nextRound.style.display = "none";
  inRound = true;
}
  // uskomentuok sia funkcija dirbant ne ant canvas jog neatsirastum is karto zaidime ir priesingai
  // ji yra aktyvi debugavimo metu
  pakeisti();
  pakeisti();

  //


  function atnaujintiSovinius(ctx,) {
    for (let i = sovinys.length - 1; i >= 0; i--) {
        let sv = sovinys[i];
        
        ctx.drawImage(sv.img, sv.x, sv.y, sv.plotis, sv.aukstis);
        
        if (sv.guliLaiko > 0) {
            sv.guliLaiko--;
            continue;
        }

        // Jei šovinys dar nepasiekė pusės ekrano aukščio, jis kyla į viršų
        if (sv.judaAukstyn) {
            sv.y += sv.pradinisYgreitis;
            sv.pradinisYgreitis += 0.1; // Lėtai mažėja, kad šovinys pasiektų viršų ir pradėtų leistis
            if (sv.y <= sv.maxAukstis) { // Pasiekus pusę ekrano aukščio, pradeda leistis
                sv.judaAukstyn = false;
            }
        }
        
        // Judėjimas link taikinio, kai pasiektas maksimalus aukštis
        if (!sv.judaAukstyn) {
            sv.x += (sv.targetX - sv.x) * 0.005; // Sklandus judėjimas X kryptimi
            sv.y += (sv.targetY - sv.y) * 0.005; // Sklandus judėjimas Y kryptimi
        }
        
        // Jei šovinys arti taikinio, jį pašalina
        if (Math.abs(sv.x - sv.targetX) < 2 && Math.abs(sv.y - sv.targetY) < 2) {
            sovinys.splice(i, 1);
        }
    }
}
function karioLogika(ctx,deltaTime){

  for (let i = karei.length - 1; i >= 0; i--) {
    let karys = karei[i];
    if (karys.reloding < karys.reloudTime) {
      karys.reloding += deltaTime*60;
      // console.log(karys.reloding)
    } else {
      karys.reloding = 0;
      suzeikPriesa(karys.dmg, karys.target,'img/arow.png', i);
      
    }
    ctx.drawImage(karys.img, karys.x, karys.y, karys.plotis, karys.aukstis);
  }
}