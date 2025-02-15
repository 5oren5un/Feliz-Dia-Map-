document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('song');
    const loader = document.querySelector('.loader');
    const lyrics = document.querySelectorAll('.lyric-line');
  
    // Array con los tiempos en segundos para cada línea de la letra
    const lyricTimes = [
      0,      // "Poniendo la mano, en el corazón"
3,    // "Aaaa que dijo"
6,    // "Que iba a ser la letra nomas?"
11,   // "Solo queria decirte en este dia que"
15,   // "He disfrutado musho el tiempo"
17,   // "Que hemos pasado aun siendo"
22,   // "Poquillo poquillo"
25,   // "Lo valoro musho y le tengo"
26,     // "Mucho cariño"
31,     // "Como a ti Map "
35,   // "Gracias por tu compañia"
39,     // "Tu atencion"
43,   // "Y tu cariño"
47,     // "Te quiero mil ocho mil mas"
51,     // "Feliz dia Map "
53,     // "Que dijiste? este cabron ni un detallito me hizo"
55,     // "Como nooo, porque no lo haria?"
58,     // "Tengo que hacerle un detallito a mi supp estrella"
63,     // "Que me pega unas carreadas tremendas"
67,     // "Como otras cosas tremendas"
69,     // "Que te cargas jiji"
71,     // "Es todo"
73,     // "Un simple detallito"
75,     // "Para esa mujer que en poco tiempo"
77,     // "Le tome musho aprecio y cariño"
79,     // "En fin solo queria decirte esto"
82,     // "Gracias por ser tu "
83,     // "Tu misma"
87,     // "Te mando un fuerte abrazo y un beso"
90,     // "Y te dejo con el resto"
94,     // "De la cancion que me gusto musho cuando la descubri de ti"
95,     // "Feliz San Valentiiin Maaappp :3"
      99
    ];

    // Verifica que el audio y el loader existan
    if (!audio || !loader) return;

    const hideLoader = () => {
        loader.style.display = 'none';
        document.body.classList.remove("not-loaded");
    };

    audio.addEventListener('loadeddata', hideLoader); // Cuando los datos iniciales están cargados
    audio.addEventListener('canplay', hideLoader); // Cuando puede reproducirse
    audio.addEventListener('canplaythrough', hideLoader); // Cuando puede reproducirse sin interrupciones
    
    // 2. Timeout de respaldo por si falla la carga
    const backupTimeout = setTimeout(hideLoader, 5000); // 5 segundos máximo
    
    // 3. Manejar errores
    audio.addEventListener('error', () => {
        clearTimeout(backupTimeout);
        hideLoader();
    });

    let isPlaying = false;
    const handlePlayPause = () => {
        if (!isPlaying) {
            audio.play().catch(err => console.log("Esperando interacción..."));
            isPlaying = true;
        } else {
            audio.pause();
            isPlaying = false;
        }
    };
    
    // Agregar ambos tipos de eventos para móvil/desktop
    document.body.addEventListener('click', handlePlayPause);
    document.body.addEventListener('touchstart', handlePlayPause);

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        lyrics.forEach((lyric, index) => {
            if (currentTime >= lyricTimes[index] && currentTime < lyricTimes[index + 1]) {
                lyric.classList.add('active');
    
                if (index > 0) {
                    lyrics[index - 1].classList.remove('active');
                    lyrics[index - 1].classList.add('exit');
                }
            } else {
                lyric.classList.remove('active');
                lyric.classList.remove('exit');
            }
        });
    });
});

  
  
  
