let eAukstis = window.innerHeight;
let ePlotis = window.innerWidth;
let Dydis = [
  [ePlotis / 10, ePlotis / 10],
  [eAukstis / 10, eAukstis / 10],
];
let enemes = [
  {
    greitis: 0.1,
    img: "./img/Veikeju_sprite/Enemy/Character6.png",
    dydis: 1,
    spriteIlgis: 12,
    spriteAukstis: 22,
    spriteReikemasKadrasY: 3,
    reikemiKadrai: 6,
    veikejoZiurejimoPuse: -1,
    givybes: 100,
    mirtiesSpriteY: 9,
    mirtiesReikalingiX: 11,
    hard: 1,
  },
  {
    greitis: 0.1,
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
    hard: 3,
  },
  {
    greitis: 0.1,
    img: "./img/Veikeju_sprite/Enemy/Character8.png",
    dydis: 1,
    spriteIlgis: 12,
    spriteAukstis: 22,
    spriteReikemasKadrasY: 3,
    reikemiKadrai: 6,
    veikejoZiurejimoPuse: -1,
    givybes: 500,
    mirtiesSpriteY: 9,
    mirtiesReikalingiX: 11,
    hard: 5,
  },
  {
    greitis: 0.1,
    img: "./img/Veikeju_sprite/Enemy/Character9.png",
    dydis: 1,
    spriteIlgis: 12,
    spriteAukstis: 22,
    spriteReikemasKadrasY: 3,
    reikemiKadrai: 6,
    veikejoZiurejimoPuse: -1,
    givybes: 800,
    mirtiesSpriteY: 9,
    mirtiesReikalingiX: 11,
    hard: 10,
  },
];
let soligers = [
  {
    saudimoGreitis: 1,
    img: "./img/Veikeju_sprite/Good_guys/Character1.png",
    dydis: 1,
    spriteIlgis: 12,
    spriteAukstis: 22,
    spriteReikemasKadrasY: 1,
    reikemiKadrai: 4,
    veikejoZiurejimoPuse: 1,
    price: 100,
    jega: 5,
    saudimoGreitis: 100,
  },
  {
    saudimoGreitis: 1,
    img: "./img/Veikeju_sprite/Good_guys/Character2.png",
    dydis: 1,
    spriteIlgis: 12,
    spriteAukstis: 22,
    spriteReikemasKadrasY: 1,
    reikemiKadrai: 4,
    veikejoZiurejimoPuse: 1,
    price: 100,
    jega: 5,
    saudimoGreitis: 100,
  },
  {
    saudimoGreitis: 1,
    img: "./img/Veikeju_sprite/Good_guys/Character3.png",
    dydis: 1,
    spriteIlgis: 12,
    spriteAukstis: 22,
    spriteReikemasKadrasY: 1,
    reikemiKadrai: 4,
    veikejoZiurejimoPuse: 1,
    price: 100,
    jega: 5,
    saudimoGreitis: 100,
  },
  {
    saudimoGreitis: 1,
    img: "./img/Veikeju_sprite/Good_guys/Character4.png",
    dydis: 1,
    spriteIlgis: 12,
    spriteAukstis: 22,
    spriteReikemasKadrasY: 1,
    reikemiKadrai: 4,
    veikejoZiurejimoPuse: 1,
    price: 100,
    jega: 5,
    saudimoGreitis: 100,
  },
  {
    saudimoGreitis: 1,
    img: "./img/Veikeju_sprite/Good_guys/Character5.png",
    dydis: 1,
    spriteIlgis: 12,
    spriteAukstis: 22,
    spriteReikemasKadrasY: 1,
    reikemiKadrai: 4,
    veikejoZiurejimoPuse: 1,
    price: 100,
    jega: 5,
    saudimoGreitis: 100,
  },
];

pi = 3
ji = 3

class langeliaiNamu{
  constructor(i, j){
        this.x = ((i * 5 + 10) / 100) * ePlotis,
        this.y=  ((100 - j * 8 - 20) / 100) * eAukstis,
        this.xProc= i * 5 + 10,
        this.yProc= 100 - j * 8 - 20,
        this.plotis= (4 / 100) * ePlotis,
        this.aukstis= (4 / 100) * ePlotis,
        this.ocupied= null
  }
  update(i,j){
        this.x = ((i * 5 + 10) / 100) * ePlotis
        this.y=  ((100 - j * 8 - 20) / 100) * eAukstis
        this.xProc= i * 5 + 10
        this.yProc= 100 - j * 8 - 20
        this.plotis= (4 / 100) * ePlotis
        this.aukstis= (4 / 100) * ePlotis
  }
}
let homeSqueres = [];

for (let i = 0; i < pi; i++) {
  for (let j = 0; j < ji; j++) {
    
    homeSqueres.push(new langeliaiNamu(i,j))
  }
  
}

function setHomeSqueres() {
  laik = 0
  for (let i = 0; i < pi; i++) {
    for (let j = 0; j < ji; j++) {
      homeSqueres[laik].update(i,j);
      laik++
    }
  }
}
setHomeSqueres();
