const nextRoundButton = document.getElementById("nextRoundButton"); 

const input = document.getElementById('komandos');



document.addEventListener('keydown', function() {
    input.focus();
});
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const komanda = input.value.trim();

        switch (komanda.split(' ')[0]) {
            
            case 's':
                pause = !pause;
               
                break;
            case 'next':
                wave++;
                if (nextRoundButton) {
                    nextRoundButton.style.display = '';
                }
                break;
            case 'fps' :
                rodytiFps = !rodytiFps;
            
                break;
            case 'hp':
                rodytiGivybes = !rodytiGivybes;
                break;
            case 'SetWave':
                wave = parseInt(komanda.split(' ')[1]);
                break;

            default:
                console.log('Nežinoma komanda:', komanda);
        }

     
    }
});