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

    Reproducir_unaVez(rutaArchivo) {
        this.music = true;
        this.audioLoader.load(
            rutaArchivo,
            (buffer) => {
                this.sound.setBuffer(buffer);
                this.sound.setLoop(false); // Reproducción sin bucle
                this.sound.setVolume(0.3);

                // Detener el audio actual si ya está en reproducción
                if (this.sound.isPlaying) {
                    this.sound.stop();
                }

                this.sound.play();
                console.log("Música cargada y reproduciendo una vez.");
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