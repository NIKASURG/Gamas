let eAukstis = window.innerHeight;
let ePlotis = window.innerWidth; 
let Dydis = [[ePlotis/10, ePlotis/10], [eAukstis/10, eAukstis/10]];
let enemes = [
    {
        greitis: 0.1, img: './img/Veikeju_sprite/Enemy/Character6.png', dydis:1, spriteIlgis: 12, spriteAukstis: 22, spriteReikemasKadrasY: 3, reikemiKadrai: 6, veikejoZiurejimoPuse: -1,givybes: 100,mirtiesSpriteY:9,mirtiesReikalingiX:11,hard:1
    },
    {
        greitis: 0.1, img: './img/Veikeju_sprite/Enemy/Character7.png', dydis:1, spriteIlgis: 12, spriteAukstis: 22, spriteReikemasKadrasY: 3, reikemiKadrai: 6, veikejoZiurejimoPuse: -1,givybes: 200,mirtiesSpriteY:9,mirtiesReikalingiX:11,hard:3
    },
    {
        greitis: 0.1, img: './img/Veikeju_sprite/Enemy/Character8.png', dydis:1, spriteIlgis: 12, spriteAukstis: 22, spriteReikemasKadrasY: 3, reikemiKadrai: 6, veikejoZiurejimoPuse: -1,givybes: 500,mirtiesSpriteY:9,mirtiesReikalingiX:11,hard:5
    },
    {
        greitis: 0.1, img: './img/Veikeju_sprite/Enemy/Character9.png', dydis:1, spriteIlgis: 12, spriteAukstis: 22, spriteReikemasKadrasY: 3, reikemiKadrai: 6, veikejoZiurejimoPuse: -1,givybes: 800,mirtiesSpriteY:9,mirtiesReikalingiX:11,hard:10
    },
];
let soligers = [
    {
        saudimoGreitis: 1, img: './img/Veikeju_sprite/Good_guys/Character1.png', dydis:1, spriteIlgis: 12, spriteAukstis: 22, spriteReikemasKadrasY: 1, reikemiKadrai: 4, veikejoZiurejimoPuse: 1,price:100,
    }, {
        saudimoGreitis: 1, img: './img/Veikeju_sprite/Good_guys/Character2.png', dydis:1, spriteIlgis: 12, spriteAukstis: 22, spriteReikemasKadrasY: 1, reikemiKadrai: 4, veikejoZiurejimoPuse: 1,price:100,
    },
    {
        saudimoGreitis: 1, img: './img/Veikeju_sprite/Good_guys/Character3.png', dydis:1, spriteIlgis: 12, spriteAukstis: 22, spriteReikemasKadrasY: 1, reikemiKadrai: 4, veikejoZiurejimoPuse: 1,price:100,
    }, {
        saudimoGreitis: 1, img: './img/Veikeju_sprite/Good_guys/Character4.png', dydis:1, spriteIlgis: 12, spriteAukstis: 22, spriteReikemasKadrasY: 1, reikemiKadrai: 4, veikejoZiurejimoPuse: 1,price:100,
    }, {
        saudimoGreitis: 1, img: './img/Veikeju_sprite/Good_guys/Character5.png', dydis:1, spriteIlgis: 12, spriteAukstis: 22, spriteReikemasKadrasY: 1, reikemiKadrai: 4, veikejoZiurejimoPuse: 1,price:100,
    },
];

function setHomeSqueres(){

    homeSqueres = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            homeSqueres.push({
                x:  (i * 5  + 10) /100 * ePlotis,
                y: ( 100 - j * 8 -20 ) /100 * eAukstis,
                xProc: (i * 5  + 10) ,
                yProc: ( 100 - j * 8 -20 ) ,
                plotis: (4 / 100) * ePlotis,
                aukstis: (4 / 100) * ePlotis,
                ocupied: null,
            });        
        }
        
    }
    
}
setHomeSqueres();