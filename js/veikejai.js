class veikejas {
  constructor(data, x, y) {
    this.x = x;
    this.y = y;
    this.data = data;
    this.jega = this.data.extraData?.damigeUp + this.data.jega ?? this.data.jega ;
    this.givybesStart = data.givybes  +wave?? 100  +wave;
    this.dydis = data.dydis;
    this.greitis = data.greitis ?? 1;
    this.tarp = data.greitis ?? 1;

    this.spriteIlgisKadru = data.spriteIlgis;
    this.spriteAukstisKadru = data.spriteAukstis;
    this.img = new Image();
    this.img.src = data.img;
    this.givybes = data.givybes +wave;
    this.img.onload = () => {
      this.kadroPlotis = this.img.width / this.spriteIlgisKadru;
      this.kadroAukstis = this.img.height / this.spriteAukstisKadru;
      this.spriteOffsetY = (this.reikemasKadrasY - 1) * this.kadroAukstis;
      this.esamasKadrasX =
        Math.floor(Math.random() * this.reikemiKadrai) * this.kadroPlotis;
    };
    this.saudimoGreitis = data.saudimoGreitis;
    this.saudimoLaukimas = Math.random() * data.saudimoGreitis;
    this.taikinys = data.extraData?.target ?? "first";
    this.mires = false;
    this.linkMirties = false;
    this.esamasKadrasY = 0;
    this.reikemasKadrasY = data.spriteReikemasKadrasY;
    this.reikemiKadrai = data.reikemiKadrai;
    this.spriteGreitis =   1;

    this.mirtiesSpriteY = data.mirtiesSpriteY;
    this.mirtiesReikalingiX = data.mirtiesReikalingiX;
    this.veikejoZiurejimoPuse = data.veikejoZiurejimoPuse;
    this.primasPoMirties = true;
    this.pasirinktas = true;
    this.trankyk = false;
    this.pradejauPulti = true;
    this.greitisSpriteSukimui =data.spriteGreitis ?? 9;
    this.lost = false;
    this.colorSpin = Math.random() * 1000; 
    this.animationStop = data.animationStop ?? false
  }
  kadras() {
    if (isNaN(deltaTime)) {
      console.log("das");
      return;
    }
    let daug;
    if (this.greitis == 1 || this.greitis == 0) {
      daug = 1;
    } else {
      daug = 10 * this.greitis;
    }

    this.spriteGreitis += (deltaTime / 22) * daug;
    if(this.animationStop && (this.esamasKadrasX == 0 || this.esamasKadrasX > this.reikemiKadrai * this.kadroPlotis ) ){
      this.greitis = 0
      console.log('true ')
    }else if(
      this.animationStop && (this.esamasKadrasX < this.kadroPlotis*2 || !(this.esamasKadrasX < this.kadroPlotis*4 ) )
    ){
      this.greitis = this.tarp/1.5
    }else{
      this.greitis = this.tarp

    }
    if (this.spriteGreitis > this.greitisSpriteSukimui - this.reikemiKadrai) {
      this.spriteGreitis = 0;
      
      // console.log(this.kadroPlotis,this.reikemiKadrai)
      this.esamasKadrasX += this.kadroPlotis;

      if (this.esamasKadrasX > this.kadroPlotis * this.reikemiKadrai - 1) {
        if (this.linkMirties) {
          this.mires = true;
          if (!this.lost) {
            savasData.coins += this.data.revard;
          }
        } else {
          this.esamasKadrasX = 0;
          if (this.trankyk) {
            rumuHp -= this.data.hard;
            if (this.pradejauPulti) {
              this.spriteOffsetY =
                (this.data.trankymoY - 1) * this.kadroAukstis;
              this.reikemiKadrai = this.data.trankymoXilgis;
              this.pradejauPulti = false;
              this.esamasKadrasX = 0;
            }
          }
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
        this.greitisSpriteSukimui = 13;
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
    //  ctx.shadowColor = "black";
    //     ctx.shadowBlur = 20;

    //         ctx.globalAlpha = 0.3;

    //       ctx.strokeStyle = "gray";
    //       ctx.fillStyle = "rgba(65, 65, 85, " + blure + ")";
    //       ctx.beginPath();
    //       ctx.roundRect(
    //          atvaizdoX + Dydis[this.dydis][0] / 3,
    //       atvaizdoY + Dydis[this.dydis][1] / 1.5,
    //       Dydis[this.dydis][0] / 3,
    //       Dydis[this.dydis][1]/ 5,
    //         [5, 5, 5, 5]
    //       );
    //       ctx.stroke();
    //       ctx.fill();
    ctx.globalAlpha = 1.0;
    ctx.shadowBlur = 0;
    if(this.data?.hard == 5){
      this.colorSpin +=deltaTime / 100;
      ctx.filter = `hue-rotate(${this.colorSpin * 10}deg)`;
    }
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
    ctx.filter = "none";
    if (this.givybes) {
      ctx.fillStyle = "red";
      if (this.givybes >= 0 && this.givybes != this.givybesStart) {
        showBar(
          ((atvaizdoX + (2 / 3) * Dydis[this.dydis][0]) / ePlotis * 100) - 3 ,
          this.y + 3,
          Dydis[this.dydis][0] / 3,
          eAukstis / 300,
          this.givybes,
          this.givybesStart,
          "red",
          "black",
          -1
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
    if (this.x > 31.2) {
      this.x += (this.greitis * this.veikejoZiurejimoPuse * deltaTime) / 20;
    } else {
      this.trankyk = true;
    }
  }

  suzeiti(dmg) {
    this.givybes -= dmg;
    if (dmg == -1) {
      this.givybes = 0;
    }
  }

  atack() {
    this.saudimoLaukimas += (1 * deltaTime) / 15;
    if (!this.pasirinktas) {
      return;
    }
    if (this.saudimoGreitis < this.saudimoLaukimas) {
      this.saudimoLaukimas = 0;
      streles.push(new Sovinys(this.x, this.y, this.jega, this.taikinys));
      // console.log(priesas)
      let atvaizdoX = (this.x / 100) * ePlotis;
      if (this.veikejoZiurejimoPuse == -1) {
        atvaizdoX = -atvaizdoX - Dydis[this.dydis][0];
      }

      // if (priesas && showAtack) {
      //   ctx.beginPath();
      //   ctx.moveTo(atvaizdoX, atvaizdoY);
      //   ctx.lineTo((priesas.x / 100) * ePlotis, (priesas.y / 100) * eAukstis);
      //   ctx.stroke();
      // }
    }
  }
}
const strelesImg = new Image();
strelesImg.src = "img/arow.png";

class Sovinys {
  constructor(x1, y1, jega, taikinis) {
    this.x1 = x1;
    this.y1 = y1;
    this.x = x1;
    this.y = y1 + 3;
    this.pradziosX = x1;
    this.pradziosY = y1;
    this.jega = jega;
    this.givenimoLaikas = 0;
    this.mirus = false;
    this.ismigusi = false;
    this.t = 0;
    this.g = 0.1;
    this.priesas = suzeikPriesa(taikinis);

    const dx = this.priesas?.x - x1 ?? 50;
    const dy = this.priesas?.y - y1 ?? 70;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    this.kryptisX = dx / dist;
    this.kryptisY = dy / dist;
    this.bendrasKelias = dist;
    this.nueita = 0;
    this.greitis = 1.1;
    this.img = new Image();
    this.img.src = "img/arow.png";
  }
  animuok() {
    if (!this.priesas) return;

    this.givenimoLaikas += deltaTime;
    if (this.givenimoLaikas > 5000) {
      this.mirus = true;
      return;
    }

    this.nueita += (this.greitis * deltaTime) / 20;

    const progress = this.nueita / this.bendrasKelias;

    if (progress >= 1 && !this.priesas.mires) {
      this.mirus = true;

      if (this.priesas.givybes >= this.jega) {
        leftVaveHp -= this.jega;
      } else if (this.priesas.givybes > 0) {
        leftVaveHp -= this.priesas.givybes;
      }

      this.priesas.suzeiti(this.jega);

      return;
    } else if (
      this.priesas.mires &&
      this.x > this.priesas.x &&
      this.y > this.priesas.y
    ) {
      this.img.src = "img/ismigusiStrele.png";
      this.greitis = 0;
    }
    
    const x = this.pradziosX + this.kryptisX * this.nueita;
    const yBase = this.pradziosY + this.kryptisY * this.nueita;

    const maxArcHeight = 30;
    const arcHeight = Math.min(maxArcHeight, this.bendrasKelias / 2);
    const parabola = -4 * arcHeight * progress * (1 - progress);
    const y = yBase + parabola;

    this.x = x;
    this.y = y;

    ctx.drawImage(
      this.img,
      (x / 100) * ePlotis,
      (y / 100) * eAukstis,
      eAukstis / 40,
      eAukstis / 40
    );
  }
}
