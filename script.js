const popierius = document.getElementById('popierius');
const main = document.getElementById('main');

const ePlotis = window.innerWidth;
const eAukstis = window.innerHeight;
popierius.width = ePlotis;
popierius.height = eAukstis;   
const ctx = popierius.getContext('2d');

let inGame = false;

function pakeisti(){
    inGame = !inGame;

    if(inGame){
        popierius.style.display = "block";

        main.style.display = "none";
    }else{
     

        main.style.display = "block";

        popierius.style.display = "none";
    }

}
// uskomentuok sia funkcija dirbant ne ant canvas jog neatsirastum is karto zaidime ir priesingai
// pakeisti();
