const nextRoundButton = document.getElementById("nextRoundButton");

const input = document.getElementById("komandos");

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const komanda = input.value.trim();
    switch (komanda.split(" ")[0]) {
      case "s":
        pause = !pause;

        break;
      case "next":
        wave++;
        if (nextRoundButton) {
          nextRoundButton.style.display = "";
        }
        break;
      case "fps":
        rodytiFps = !rodytiFps;

        break;
      case "hp":
        rodytiGivybes = !rodytiGivybes;
        break;
      case "SetWave":
        wave = parseInt(komanda.split(" ")[1]);
        break;
      case "kill":
        if (komanda.split(" ")[1] === "all") {
          priesai.forEach((priesas) => {
            priesas.givybes = -1;
          });
        }
        if (komanda.split(" ")[1] === "alll") {
          priesai.forEach((priesas) => {
            priesas.givybes = -1;
          });
          waweEnemesCombination = [];
          waweImamas = 0;
        }
        break;
      case "clear":
        localStorage.removeItem("gameState");
        location.reload();
        break;
      case "sa":
        showAtack = !showAtack;
        break;
      case "SetCoins":
        savasData.coins = parseInt(komanda.split(" ")[1]);
        break;
      default:
        console.log("Nežinoma komanda:", komanda);
    }
  }
});
