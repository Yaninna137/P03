export class Carga_ArchMusic {
    constructor(camara) {
        this.listener = new THREE.AudioListener();
        camara.add(this.listener);

        this.sound = new THREE.Audio(this.listener);
        this.audioLoader = new THREE.AudioLoader();
        this.music = null;
    }

    Cargar_audio(rutaArchivo) {
        this.music = true;
        // Manejo de errores y consola para diagnóstico
        this.audioLoader.load(
            rutaArchivo,
            (buffer) => {
                this.sound.setBuffer(buffer);
                this.sound.setLoop(true);
                this.sound.setVolume(0.5);
                this.sound.play();
                console.log("Música cargada y reproduciendo.");
            },
            undefined,
            (error) => {
                console.error("Error al cargar el archivo de audio:", error);
            }
        );
    }

    detenerAudio() {
        if (this.sound.isPlaying) {
            this.sound.stop();
            console.log("Música detenida.");
        }
    }

    pausarAudio() {
        if (this.sound.isPlaying) {
            this.sound.pause();
            console.log("Música pausada.");
        }
    }

    reanudarAudio() {
        if (!this.sound.isPlaying) {
            this.sound.play();
            console.log("Música reanudada.");
        }
    }
}

// export class Carga_ArchMusic {
//     constructor(camara){
//         this.camara = camara;
//         this.listener = new THREE.AudioListener();
//         this.camara.add(this.listener);
//         this.sonido = new THREE.Audio(this.listener);
//         this.cargadorAudio = new THREE.AudioLoader();
//     }
//     Cargar_audio(ruta_MP3){
//         this.cargadorAudio.load(ruta_MP3, (buffer) => {
//             this.sonido.setBuffer(buffer);
//             this.sonido.setLoop(true);
//             this.sonido.setVolume(0.5);
//             this.sonido.play();
//         });
//     }
// }