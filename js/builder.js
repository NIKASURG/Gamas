class kareivis {
    constructor(x, y, plotis, aukstis, dmg, atackSpeed, img) {
      this.x = x;
      this.y = y;
      this.plotis = plotis;
      this.aukstis = aukstis;
      this.dmg = dmg;
      this.atackSpeed = atackSpeed;
      this.reloding = 0;
  
      this.img = new Image();
      this.img.src = img;
    }
  }
  
  class enemy {
    constructor(x, y, plotis, aukstis, speed, hp, img) {
      this.x = x;
      this.y = y;
      this.plotis = plotis;
      this.aukstis = aukstis;
      this.speed = speed;
      this.hp = hp;
      this.target = "first";
      this.img = new Image();
      this.img.src = img;
    }
  }