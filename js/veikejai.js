class veikejas{
   constructor(data, x = 0, y= 0) {
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
        this.esamasKadrasX = Math.floor(Math.random() * this.reikemiKadrai) * this.kadroPlotis;
    }
    this.taikinys = 'first';
    this.mires = false;
    this.linkMirties = false;
    this.esamasKadrasY = 0;
    this.reikemasKadrasY = data.spriteReikemasKadrasY;
    this.reikemiKadrai = data.reikemiKadrai;
    this.spriteGreitis = 1;
    this.mirtiesSpriteY = data.mirtiesSpriteY;
    this.mirtiesReikalingiX = data.mirtiesReikalingiX;
    this.veikejoZiurejimoPuse = data.veikejoZiurejimoPuse;
    this.primasPoMirties = true
    this.pasirinktas = true;

}

    
    kadras(){
        this.spriteGreitis++;
        if(this.spriteGreitis > 10 - this.reikemiKadrai) {
            this.spriteGreitis = 0;
            // console.log(this.kadroPlotis,this.reikemiKadrai)
            this.esamasKadrasX += this.kadroPlotis
            
            if(this.esamasKadrasX  >this.kadroPlotis* this.reikemiKadrai - 1) {
                if(this.linkMirties) {
                    this.mires = true;
                }else{

                this.esamasKadrasX = 0;}
            }
        }
        
       
    }
    animuok() {
        if(!this.pasirinktas){
            return;

        }
        // console.log(this.data)
        this.kadras();
        ctx.save();
        ctx.scale(this.veikejoZiurejimoPuse, 1);
        
        if(this.givybes <= 0) {
            this.greitis = 0;
            if(this.primasPoMirties) {
            this.esamasKadrasX = 0
                this.primasPoMirties = false;
        }
            this.spriteOffsetY = ( this.mirtiesSpriteY- 1) * this.kadroAukstis;
            this.reikemiKadrai = this.mirtiesReikalingiX;
            this.linkMirties = true;
        }
        let atvaizdoX = (this.x / 100) * ePlotis;
        if (this.veikejoZiurejimoPuse == -1) {
            atvaizdoX = -atvaizdoX - Dydis[this.dydis][0]; 
        }
        
        const atvaizdoY = (this.y/100) * eAukstis
        // const atvaizdoX = this.x * this.veikejoZiurejimoPuse;
        // const atvaizdoY = this.y;
    
        ctx.drawImage(
            this.img,
            this.esamasKadrasX,
            this.spriteOffsetY ,
            this.kadroPlotis,
            this.kadroAukstis,
            atvaizdoX,
            atvaizdoY,
            Dydis[this.dydis][0] ,
            Dydis[this.dydis][1]
        );
        
        if(this.givybes){
            console.log()
            ctx.fillStyle = 'red';
            if(this.givybes >= 0) {
            ctx.fillRect(atvaizdoX + Dydis[this.dydis][0] /5, atvaizdoY + 10 , (this.givybes / this.givybesStart) * Dydis[this.dydis][0] /2 , eAukstis / 300);
            }
            if(rodytiGivybes){
                ctx.fillStyle = 'white';
                ctx.font = '20px Arial';
                
                console.log(this.givybes)
                ctx.save();
                ctx.scale(1 / this.veikejoZiurejimoPuse, 1); 
                ctx.fillText(
                    this.givybes,
                    (atvaizdoX + 15 * this.veikejoZiurejimoPuse) * this.veikejoZiurejimoPuse - Dydis[this.dydis][0] ,
                    atvaizdoY - 10
                );
                ctx.restore();
                            }  
        }
        ctx.restore();
  

    }
    
    judeti(){
        // this.givybes -= 1 ;
        if(this.x > 20) {
            this.x += this.greitis * this.veikejoZiurejimoPuse;
        }
    }
    suzeiti(dmg){
        this.givybes -= dmg; ;
        if(dmg== -1){
            this.givybes = 0
        }
       
    }
    atack(){
        let priesas = suzeikPriesa(this.data.jega,this.taikinys);
        let atvaizdoX = (this.x / 100) * ePlotis;
        if (this.veikejoZiurejimoPuse == -1) {
            atvaizdoX = -atvaizdoX - Dydis[this.dydis][0]; 
        }
        
        const atvaizdoY = (this.y/100) * eAukstis
        if(priesas){

            ctx.beginPath(); // Start a new path
            ctx.moveTo(atvaizdoX, atvaizdoY); // Move the pen to (30, 50)
            ctx.lineTo((priesas.x/100) * ePlotis, (priesas.y/100) * eAukstis); // Draw a line to (150, 100)
            ctx.stroke(); // Render the path
        }
    }
  
}