let inGame = false;

function kiekPriesu() {
  return 100 * raund * 0.5;
}

function sukurkPriesa(kiek, koki) {

  for (let i = 0; i < kiek; i++) {
    monsterHp =   Math.random() * 100 + 50

    priesai.push(
      new Enemy(
        ePlotis + Math.random() * ePlotis / 2,
        eAukstis / 1.4 + Math.random() * (eAukstis / 4.5),
        eAukstis / 20,
        eAukstis / 20,
        0.8,
      monsterHp,
        "img/vaiduoklis.png"
      )
    );
    statrtMonsterHp+= monsterHp;
  }
  startMonsterHp = 0;

}

function sukurkKari(
  x = 50,
  y = 50,
  plotis = 50,
  aukstis = 50,
  dmg = 20,
  reloudTime = 1,
  img = "img/archer.jpeg"
) {
  karei.push(new Defender(x, y, plotis, aukstis, dmg, reloudTime, img));
}

function suzeikPriesa(dmg, taikinys, img, karioIndex = 0, pozicija = 0, karys) {
  
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
  // console.log(priesas)

  if (priesas.x > ePlotis) {return;}
  let startX = karei[karioIndex].x + karei[karioIndex].plotis;
  let startY = karei[karioIndex].y + karei[karioIndex].aukstis / 2;
  let distX = priesas.x - startX;
  let distY = priesas.y + priesas.aukstis / 2 - startY;
  let distance = Math.sqrt(distX * distX + distY * distY);
  let speed = 1;
  let speedX = (distX / distance) * speed;
  let speedY = (distY / distance) * speed;

  sovinys.push(
    new Sovinys(
      grild[karys.pozicija].x + karys.x * grild[karys.pozicija].p,
      grild[karys.pozicija].y + karys.y * grild[karys.pozicija].p,
      
      priesas.x - 20,
      priesas.y,
      20,
      20,

      img,
      false,
      30,
      dmg,
      priesas
     
    )
  );
}

function updateCanvasSize() {
  if (ePlotis > window.innerWidth) {
    ePlotis = window.innerWidth;
    eAukstis = (ePlotis * 9) / 16;
  } else {
    eAukstis = window.innerHeight;
    ePlotis = (eAukstis * 16) / 9;
  }
  updateGrid();
  // Priklausomai nuo lango dydžio, nustatomas naujas canvas dydis

  // Atnaujinami seni canvas dydžiai
  oldPlotis = ePlotis;
  oldAukstis = eAukstis;

  // Atnaujinami canvas parametrai
  popierius.width = ePlotis;
  popierius.height = eAukstis;

  // Apskaičiuojami skalavimo santykiai
  scaleX = ePlotis / oldPlotis;
  scaleY = eAukstis / oldAukstis;

  // Pirmą kartą sukuriami karių būriai
  firstLoud++;
  if (firstLoud === 1) {
    for (let xi = 1; xi < 8; xi++) {
      for (let yi = 1; yi < 8; yi++) {
        sukurkKari(
          xi,
          yi,
          eAukstis / 20,
          eAukstis / 20,
          10,
          30,
          "img/archer.jpeg",
          0
        );
      }
    }
  }
}

function pasukRageli() {
  switch (window.orientation) {
    case 0:
    case 180:
      rotateImage.style.display = "block";
      break;
    case 90:
    case -90:
      rotateImage.style.display = "none";
      break;
  }
}

function pakeisti() {
  inGame = !inGame;
  if (inGame) {
    popierius.style.display = "block";
    main.style.display = "none";
    console.log(nextRound);
    nextRound.style.display = "block";
  } else {
    main.style.display = "block";
    popierius.style.display = "none";
    nextRound.style.display = "none";
  }
  if (!(document.fullscreenElement != null)) {
    document.documentElement.requestFullscreen();
  }
}

function startRound() {
  sukurkPriesa(kiekPriesu());
  nextRound.style.display = "none";
    inRound = true;
    sovinys.length= 0;
}
function atnaujintiSovinius(ctx) {
  for (let i = sovinys.length - 1; i >= 0; i--) {
    let sv = sovinys[i];

    ctx.drawImage(sv.img, sv.x, sv.y, sv.plotis, sv.aukstis);


    // Jei dar nėra trajektorijos – apskaičiuojam
    if (!sv.trajektorija) {
      const start = { x: sv.x, y: sv.y };
      const current = { x: sv.x + 1, y: sv.y - 1 }; // Dirbtinis taškas šalia, kad būtų kampas
      const end = { x: sv.targetX, y: sv.targetY };
      sv.trajektorija = gautiParabolesFunkcija(start, current, end);
      sv.kryptis = sv.targetX > sv.x ? 1 : -1;
    }

    // Judėjimas parabolės trajektorija
    sv.x += sv.kryptis * sv.greitis;
    sv.y = sv.trajektorija(sv.x);

    // Jei šovinys arti taikinio, jį pašalina
    if (Math.abs(sv.x - sv.targetX) < 2 && Math.abs(sv.y - sv.targetY) < 2) {
          sv.priesas.hp -= 5;
          if(sv.priesas.hp < 0) {
            sv.greitis = 0;
            sv.priesas = false;
            sv.img.src = "img/ismigusiStrele.png";
          }
          if(sv.priesas){

            sovinys.splice(i, 1);
          }

    }
  }
}
function gautiParabolesFunkcija(start, current, end) {
  const { x: x0, y: y0 } = start;
  const { x: x1, y: y1 } = end;
  const { x: xc, y: yc } = current;

  const slope = (yc - y0) / (xc - x0);

  const A = [
    [x0 ** 2, x0, 1],
    [x1 ** 2, x1, 1],
    [2 * x0, 1, 0],
  ];
  const B = [y0, y1, slope];

  function determinant(m) {
    return (
      m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
      m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
      m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
    );
  }

  function replaceColumn(matrix, colIndex, newCol) {
    return matrix.map((row, i) => {
      const newRow = row.slice();
      newRow[colIndex] = newCol[i];
      return newRow;
    });
  }

  const D = determinant(A);
  const Da = determinant(replaceColumn(A, 0, B));
  const Db = determinant(replaceColumn(A, 1, B));
  const Dc = determinant(replaceColumn(A, 2, B));

  const a = Da / D;
  const b = Db / D;
  const c = Dc / D;

  return function getY(x) {
    return a * x * x + b * x + c;
  };
}

function karioLogika(ctx, deltaTime) {
  
  for (let i = karei.length - 1; i >= 0; i--) {
    let karys = karei[i];
    if (karys.reloding < karys.reloudTime) {
      karys.reloding += deltaTime * 60;
    } else {
      karys.reloding = 0;
      suzeikPriesa(
        karys.dmg,
        karys.target,
        "img/arow.png",
        i,
        karys.pozicija,
        karys
      );
    }
    ctx.drawImage(
      karys.img,
      grild[karys.pozicija].x + karys.x * grild[karys.pozicija].p,
      grild[karys.pozicija].y + karys.y * grild[karys.pozicija].p,
      grild[karys.pozicija].p,
      grild[karys.pozicija].p
    );
  }
}
