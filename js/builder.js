/////////////////
// konstruktorius ginejui
// target defaultas yra pirmam priešui 'first', kitos opcijos yra 'last', 'strongest', 'weakest', 'random'
// atackSpeed defaultas yra 1, tai reiškia, kad jis atakuoja kas 1 milisekundę
// dmg defaultas yra 1, tai reiskia kad jis per viena ataka atima 1 hp
// plotis ir aukstis defaultas yra 50, tai reiskia kad kareivis bus 50px x 50px

class Defender {
  constructor(x, y, plotis = 50, aukstis = 50, dmg = 20, reloudTime = 1, img = "default_soldier.png") {
      this.x = x;
      this.y = y;
      this.plotis = plotis;
      this.aukstis = aukstis;
      this.dmg = dmg;
      this.reloudTime = reloudTime;
      this.reloding = 0;
      this.target = "first";

      this.img = new Image();
      this.img.src = img;
  }
}
// konstruktorius priešui
class Enemy {
  constructor(x, y, plotis = 50, aukstis = 50, speed = 1, hp = 10, img = "default_enemy.png") {
      this.x = x;
      this.y = y;
      this.plotis = plotis;
      this.aukstis = aukstis;
      this.speed = speed;
      this.hp = hp;
      this.fullHp = hp;
      this.img = new Image();
      this.img.src = img;
  }
}
