let eAukstis = window.innerHeight;
let ePlotis = window.innerWidth;
let savasData;
let wave;
let setings;
let deltaTime = 0;

let Dydis = [
  [ePlotis / 10, ePlotis / 10],
  [eAukstis / 10, eAukstis / 10],
];
let enemes = [
  {
    greitis: 0.13,
    img: "./img/Veikeju_sprite/Enemy/Slime.png",
    dydis: 2,
    spriteIlgis: 11,
    spriteAukstis: 1,
    spriteReikemasKadrasY: 1,
    reikemiKadrai: 11,
    veikejoZiurejimoPuse: -1,
    givybes: 60,
    mirtiesSpriteY: 9,
    mirtiesReikalingiX: 11,
    hard: 1,
    trankymoY: 1,
    trankymoXilgis: 11,
    revard:1
    ,spriteGreitis:14,
    animationStop: true
  },
  {
    greitis: 0.1,
    img: "./img/Veikeju_sprite/Enemy/Character6.png",
    dydis: 1,
    spriteIlgis: 12,
    spriteAukstis: 22,
    spriteReikemasKadrasY: 3,
    reikemiKadrai: 6,
    veikejoZiurejimoPuse: -1,
    givybes: 120,
    mirtiesSpriteY: 9,
    mirtiesReikalingiX: 11,
    hard: 4,
    trankymoY: 15,
    trankymoXilgis: 6,
    revard: 2,
  },
  {
    greitis: 0.095,
    img: "./img/Veikeju_sprite/Enemy/Character7.png",
    dydis: 1,
    spriteIlgis: 12,
    spriteAukstis: 22,
    spriteReikemasKadrasY: 3,
    reikemiKadrai: 6,
    veikejoZiurejimoPuse: -1,
    givybes: 200,
    mirtiesSpriteY: 9,
    mirtiesReikalingiX: 11,
    hard: 5,
    trankymoY: 15,
    trankymoXilgis: 6,
    revard: 3,
  },
  {
    greitis: 0.089,
    img: "./img/Veikeju_sprite/Enemy/Character8.png",
    dydis: 1,
    spriteIlgis: 12,
    spriteAukstis: 22,
    spriteReikemasKadrasY: 3,
    reikemiKadrai: 6,
    veikejoZiurejimoPuse: -1,
    givybes: 700,
    mirtiesSpriteY: 9,
    mirtiesReikalingiX: 11,
    hard: 22,
    trankymoY: 15,
    trankymoXilgis: 6,
    revard: 5,
  },
  {
    greitis: 0.079,
    img: "./img/Veikeju_sprite/Enemy/Character9.png",
    dydis: 1,
    spriteIlgis: 12,
    spriteAukstis: 22,
    spriteReikemasKadrasY: 3,
    reikemiKadrai: 6,
    veikejoZiurejimoPuse: -1,
    givybes: 1300,
    mirtiesSpriteY: 9,
    mirtiesReikalingiX: 11,
    hard: 27,
    trankymoY: 15,
    trankymoXilgis: 6,
<<<<<<< HEAD
    revard: 15,
=======
    revard:15
  }, 
  {
    greitis: 0.079,
    img: "./img/Veikeju_sprite/Enemy/ghosty.png",
    dydis: 2,
    spriteIlgis: 8,
    spriteAukstis: 9,
    spriteReikemasKadrasY: 4,
    reikemiKadrai: 8,
    veikejoZiurejimoPuse: -1,
    givybes: 1300,
    mirtiesSpriteY: 8,
    mirtiesReikalingiX: 8,
    hard: 35,
    trankymoY: 9,
    trankymoXilgis: 8,
    revard:15,
    spriteGreitis:12

>>>>>>> 2dc0f39ab24fb315eb84baa423fe45457aae81f5
  },
];
let soligers = [
  {
    saudimoGreitis: 2,
    img: "./img/Veikeju_sprite/Good_guys/Character1.png",
    dydis: 1,
    spriteIlgis: 12,
    spriteAukstis: 22,
    spriteReikemasKadrasY: 1,
    reikemiKadrai: 4,
    veikejoZiurejimoPuse: 1,
    price: 1.797693134862315e308 * 2,
    jega: 80,
    saudimoGreitis: 40,
    name: "Nemo",
  },
  {
    saudimoGreitis: 2,
    img: "./img/Veikeju_sprite/Good_guys/Character2.png",
    dydis: 1,
    spriteIlgis: 12,
    spriteAukstis: 22,
    spriteReikemasKadrasY: 1,
    reikemiKadrai: 4,
    veikejoZiurejimoPuse: 1,
    price: 1.797693134862315e308 * 2,
    jega: 80,
    saudimoGreitis: 40,
    name: "Soske",
  },
  {
    saudimoGreitis: 2,
    img: "./img/Veikeju_sprite/Good_guys/Character3.png",
    dydis: 1,
    spriteIlgis: 12,
    spriteAukstis: 22,
    spriteReikemasKadrasY: 1,
    reikemiKadrai: 4,
    veikejoZiurejimoPuse: 1,
    price: 1,
    jega: 50,
    saudimoGreitis: 40,
    name: "BigBOss",
    aura: "cold",
  },
  {
    saudimoGreitis: 2,
    img: "./img/Veikeju_sprite/Good_guys/Character4.png",
    dydis: 1,
    spriteIlgis: 12,
    spriteAukstis: 22,
    spriteReikemasKadrasY: 1,
    reikemiKadrai: 4,
    veikejoZiurejimoPuse: 1,
    price: 500,
    jega: 100,
    saudimoGreitis: 40,
    name: "Silke",
  },
  {
    saudimoGreitis: 2,
    img: "./img/Veikeju_sprite/Good_guys/Character5.png",
    dydis: 1,
    spriteIlgis: 12,
    spriteAukstis: 22,
    spriteReikemasKadrasY: 1,
    reikemiKadrai: 4,
    veikejoZiurejimoPuse: 1,
    price: 1000,
    jega: 200,
    saudimoGreitis: 40,
    name: "Rudis",
  },
];
soligers.forEach((soldier, index) => {
  soldier.nr = index;
});

pi = 3;
ji = 6;

const langeliuCords = [
  [4, 84],
  [10, 84],
  [16, 84],
  [22, 84],
  [28, 84],
  [7, 72],
  [13, 72],
  [19, 72],
  [25, 72],
  [8, 60],
  [16, 62],
  [24, 60],
  [11, 50],
  [21, 50],
  [16, 40],
];
class langeliaiNamu {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.xProc = 0;
    this.yProc = 0;
    this.plotis = 0;
    this.aukstis = 0;
    this.ocupied = null;
  }
  update(i, j) {
    this.x = (i / 100) * ePlotis;
    this.y = (j / 100) * eAukstis;
    this.xProc = i - 0.7;
    this.yProc = j - 1.5;
    this.plotis = (5 / 100) * ePlotis;
    this.aukstis = (5 / 100) * ePlotis;
  }
}
let homeSqueres = [];

langeliuCords.forEach((e) => {
  homeSqueres.push(new langeliaiNamu());
});

function setHomeSqueres() {
  // let  laik = 0;
  for (let i = 0; i < homeSqueres.length; i++) {
    const element = homeSqueres[i];
    element.update(langeliuCords[i][0], langeliuCords[i][1]);
  }
}
setHomeSqueres();
