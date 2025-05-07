class veikejas {
  constructor(data, x, y) {
    this.x = x;
    this.y = y;
    this.data = data;

    this.givybesStart = data.givybes;
    this.dydis = data.dydis;
    this.greitis = data.greitis;
    this.spriteIlgisKadru = data.spriteIlgis;
    this.spriteAukstisKadru = data.spriteAukstis;
    this.img = new Image();
    this.img.src = data.img;
    this.givybes = data.givybes;
    this.img.onload = () => {
      this.kadroPlotis = this.img.width / this.spriteIlgisKadru;
      this.kadroAukstis = this.img.height / this.spriteAukstisKadru;
      this.spriteOffsetY = (this.reikemasKadrasY - 1) * this.kadroAukstis;
      this.esamasKadrasX =
        Math.floor(Math.random() * this.reikemiKadrai) * this.kadroPlotis;
    };
    this.taikinys = "first";
    this.mires = false;
    this.linkMirties = false;
    this.esamasKadrasY = 0;
    this.reikemasKadrasY = data.spriteReikemasKadrasY;
    this.reikemiKadrai = data.reikemiKadrai;
    this.spriteGreitis = 1;
    this.mirtiesSpriteY = data.mirtiesSpriteY;
    this.mirtiesReikalingiX = data.mirtiesReikalingiX;
    this.veikejoZiurejimoPuse = data.veikejoZiurejimoPuse;
    this.primasPoMirties = true;
    this.pasirinktas = true;
  }

  kadras() {
    this.spriteGreitis++;
    if (this.spriteGreitis > 10 - this.reikemiKadrai) {
      this.spriteGreitis = 0;
      // console.log(this.kadroPlotis,this.reikemiKadrai)
      this.esamasKadrasX += this.kadroPlotis;

      if (this.esamasKadrasX > this.kadroPlotis * this.reikemiKadrai - 1) {
        if (this.linkMirties) {
          savasData.coins += this.data.hard;
          this.mires = true;
        } else {
          this.esamasKadrasX = 0;
        }
      }
    }
  }
  animuok() {
    if (!this.pasirinktas) {
      return;
    }
    // console.log(this.data)
    this.kadras();
    ctx.save();
    ctx.scale(this.veikejoZiurejimoPuse, 1);

    if (this.givybes <= 0) {
      this.greitis = 0;
      if (this.primasPoMirties) {
        this.esamasKadrasX = 0;
        this.primasPoMirties = false;
      }
      this.spriteOffsetY = (this.mirtiesSpriteY - 1) * this.kadroAukstis;
      this.reikemiKadrai = this.mirtiesReikalingiX;
      this.linkMirties = true;
    }
    let atvaizdoX = (this.x / 100) * ePlotis;
    if (this.veikejoZiurejimoPuse == -1) {
      atvaizdoX = -atvaizdoX - Dydis[this.dydis][0];
    }

    const atvaizdoY = (this.y / 100) * eAukstis;
    // const atvaizdoX = this.x * this.veikejoZiurejimoPuse;
    // const atvaizdoY = this.y;

    ctx.drawImage(
      this.img,
      this.esamasKadrasX,
      this.spriteOffsetY,
      this.kadroPlotis,
      this.kadroAukstis,
      atvaizdoX,
      atvaizdoY,
      Dydis[this.dydis][0],
      Dydis[this.dydis][1]
    );

    if (this.givybes) {
      console.log();
      ctx.fillStyle = "red";
      if (this.givybes >= 0) {
        ctx.fillRect(
          atvaizdoX + Dydis[this.dydis][0] / 5,
          atvaizdoY + 10,
          ((this.givybes / this.givybesStart) * Dydis[this.dydis][0]) / 2,
          eAukstis / 300
        );
      }
      if (rodytiGivybes) {
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";

        console.log(this.givybes);
        ctx.save();
        ctx.scale(1 / this.veikejoZiurejimoPuse, 1);
        ctx.fillText(
          this.givybes,
          (atvaizdoX + 15 * this.veikejoZiurejimoPuse) *
            this.veikejoZiurejimoPuse -
            Dydis[this.dydis][0],
          atvaizdoY - 10
        );
        ctx.restore();
      }
    }
    ctx.restore();
  }

  judeti() {
    if (this.x > 20) {
      this.x += this.greitis * this.veikejoZiurejimoPuse;
    }
  }

  suzeiti(dmg) {
    this.givybes -= dmg;
    if (dmg == -1) {
      this.givybes = 0;
    }
  }

  atack() {
    if (!this.pasirinktas) {
      return;
    }
    let priesas = suzeikPriesa(this.data.jega, this.taikinys);
    if (priesas === undefined) {
      return;
    }
    // streles.push(new Sovinys(this.x,this.y,priesas))
    // console.log(priesas)
    let atvaizdoX = (this.x / 100) * ePlotis;
    if (this.veikejoZiurejimoPuse == -1) {
      atvaizdoX = -atvaizdoX - Dydis[this.dydis][0];
    }

    const atvaizdoY = (this.y / 100) * eAukstis;

    if (priesas && showAtack) {
      ctx.beginPath();
      ctx.moveTo(atvaizdoX, atvaizdoY);
      ctx.lineTo((priesas.x / 100) * ePlotis, (priesas.y / 100) * eAukstis);
      ctx.stroke();
    }
  }
}
class Sovinys {
  constructor(x1, y1, taikinioNuoroda) {
    this.x1 = x1;
    this.y1 = y1;
    this.x = x1;
    this.y = y1;
    this.taikinioNuoroda = taikinioNuoroda;
    this.x2 = taikinioNuoroda.x2;
    this.y2 = taikinioNuoroda.y2;

    const vidurysX = (x1 + this.x2) / 2;
    const vidurysY = (y1 + this.y2) / 2 - 100;
    this.ctrlX = vidurysX;
    this.ctrlY = vidurysY;

    this.t = 0;
  }

  animuok(ctx) {}
}
