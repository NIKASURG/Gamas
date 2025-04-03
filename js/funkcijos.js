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


  function suzeikPriesa(dmg, taikinys) {
    if (!priesai.length) return;

    switch (taikinys) {
        case "first":
            priesai.sort((a, b) => a.x - b.x)[0].hp -= dmg;
         
            break;
        case "last":
            priesai.sort((a, b) => b.x - a.x)[0].hp -= dmg;
            break;
        case "random":
            priesai[Math.floor(Math.random() * priesai.length)].hp -= dmg;
            break;
        case "strongest":
            priesai.reduce((max, p) => (p.hp > max.hp ? p : max)).hp -= dmg;
            break;
        case "weakest":
            priesai.reduce((min, p) => (p.hp < min.hp ? p : min)).hp -= dmg;
            break;
    }
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
  //