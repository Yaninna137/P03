import { AnimacionEstrellas } from '../Animacion/a1.js';
import { Carga_ArchMusic } from '../GamePlay/musica.js';

class SimulacionEspacio {

    constructor() {
        this.escena = new THREE.Scene();
        this.camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderizador = new THREE.WebGLRenderer({ antialias: true });
        this.renderizador.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("box").appendChild(this.renderizador.domElement);

        this.Music = new Carga_ArchMusic(this.camara); 
        this.Music.Cargar_audio('./Archivos/Musica/music-historia.mp3');

        this.camara.position.set(0, 0, 30);

        const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.9);
        this.escena.add(luzAmbiente);

        this.animacionEstrellas = new AnimacionEstrellas(this.escena); // Instancia de animación de estrellas

        window.addEventListener('resize', this.onWindowResize.bind(this));
        this.reloj = new THREE.Clock();
        this.animar();
    }

    cambiarDireccionEstrellas(direccion) {
        this.animacionEstrellas.cambiarDireccion(direccion);
    }

    cambiarVelocidadEstrellas(velocidad) {
        this.animacionEstrellas.cambiarVelocidad(velocidad);
    }
    animar() {
        requestAnimationFrame(this.animar.bind(this));
        this.animacionEstrellas.moverEstrellas(); // Llama a la animación de las estrellas
        this.renderizador.render(this.escena, this.camara);
    }

    onWindowResize() {
        this.camara.aspect = window.innerWidth / window.innerHeight;
        this.camara.updateProjectionMatrix();
        this.renderizador.setSize(window.innerWidth, window.innerHeight);
    }
}

// Inicializa la simulación
const simulacion = new SimulacionEspacio();