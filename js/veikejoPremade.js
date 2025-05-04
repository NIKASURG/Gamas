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
        saudimoGreitis: 1, img: 'soliger.png', plotis: 50, aukstis: 50
    },
];

function setHomeSqueres(){

    homeSqueres = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            homeSqueres.push({
                x:  (i * 5  + 10) /100 * ePlotis,
                y: ( 100 - j * 8 -20 ) /100 * eAukstis,
                plotis: (4 / 100) * ePlotis,
                aukstis: (4 / 100) * ePlotis,
            });        
        }
        
    }
    
}
setHomeSqueres();