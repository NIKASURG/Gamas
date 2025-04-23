/////////////////
// konstruktorius ginejui
// target defaultas yra pirmam priešui 'first', kitos opcijos yra 'last', 'strongest', 'weakest', 'random'
// atackSpeed defaultas yra 1, tai reiškia, kad jis atakuoja kas 1 milisekundę
// dmg defaultas yra 1, tai reiskia kad jis per viena ataka atima 1 hp
// plotis ir aukstis defaultas yra 50, tai reiskia kad kareivis bus 50px x 50px

class Defender {
  constructor(
    x,
    y,
    plotis = 50,
    aukstis = 50,
    dmg = 20,
    reloudTime = 1,
    img = "default_soldier.png",
    pozicija = 0
  ) {
    this.x = x;
    this.y = y;
    this.plotis = plotis;
    this.aukstis = aukstis;
    this.dmg = dmg;
    this.reloudTime = reloudTime;
    this.pozicija = pozicija;
    this.reloding = 0;
    this.target = taikytisAI[Math.floor(Math.random() * taikytisAI.length)];
    this.frame = 0;
    this.img = new Image();
    this.img.src = img;
  }
}
// konstruktorius priešui
class Enemy {
  constructor(
    x,
    y,
    plotis = 100,
    aukstis = 100,
    speed = 1,
    hp = 10,
    img = "default_enemy.png"
  ) {
    this.x = x;
    this.y = y;
    this.plotis = plotis;
    this.aukstis = aukstis;
    this.speed = speed;
    this.hp = hp;
    this.fullHp = hp;
    this.img = new Image();
    this.img.src = img;
    this.frame = 0;

  }
}

class Sovinys {
  constructor(
    x,
    y,
    targetX,
    targetY,
    plotis = 10,
    aukstis = 10,
    img = "img/arow.jpeg",
    judaAukstyn = true,
    guliLaiko = 300,
    dmg,
    priesas = null
  ) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.plotis = plotis;
    this.aukstis = aukstis;
    this.img = new Image();
    this.img.src = img;
    this.judaAukstyn = judaAukstyn;
    this.guliLaiko = guliLaiko;
    this.asReikalingas = true;
    this.dmg = dmg;
    this.priesas = priesas;
    this.greitis = 3;
    this.frame = 0;

    // Pradinis Y greitis, kad šovinys kiltų į viršų
    this.pradinisYgreitis = -5; // Neigiamas, kad kiltų aukštyn
    this.maxAukstis = window.innerHeight / 2; // pusė ekrano aukščio
  }
}
