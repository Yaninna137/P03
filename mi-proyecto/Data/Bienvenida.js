import { AnimacionEstrellas } from '../Animacion/a1.js';
import { Carga_ArchMusic } from '../GamePlay/musica.js';

class Nave {
    constructor(escena) {
        this.escena = escena;
        this.nave = null;
        this.Tipo_nave = '';
        this.startTime = null; // Almacena el tiempo de inicio de la animación
        this.animationDuration = 4; // Duración de la animación en segundos
    }

    cargarModelo(ruta) {
        this.Tipo_nave = ruta;
        const loader = new THREE.GLTFLoader();
        loader.load(this.Tipo_nave, (gltf) => {
            this.nave = gltf.scene;
            this.nave.position.set(0, -1, 10); // Posición inicial de la nave
            this.escena.add(this.nave);
        }, undefined, (error) => {
            console.error(error);
        });
    }

    Animacion1(estado) {
        // Iniciar la animación solo si la nave está cargada
        if (estado === true){
            if (this.nave) {
                if (this.startTime === null) {
                    this.startTime = Date.now(); // Iniciar el conteo del tiempo si aún no se ha hecho
                }

                const elapsedTime = (Date.now() - this.startTime) / 200; // Tiempo transcurrido en segundos
                const progress = Math.min(elapsedTime / this.animationDuration, 1); // Progreso entre 0 y 1

                // Calcular la nueva posición de la nave en el eje Z, entre -10 y -50
                const targetPositionZ = -10 + (progress * (-50 - (-10)));
                this.nave.position.z = targetPositionZ;

                // Si la animación ha terminado, cargar la nueva página
                if (progress === 1) {
                    window.location.href = '../mi-proyecto/historia.html'; // Redirige a Lore.html
                }
                
            }
        }
    }
}

class SimulacionEspacio {

    constructor() {
        this.escena = new THREE.Scene();
        this.camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderizador = new THREE.WebGLRenderer({ antialias: true });
        this.renderizador.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("box").appendChild(this.renderizador.domElement);

        this.nave = new Nave(this.escena);
        this.nave.cargarModelo('../mi-proyecto/Archivos/Modelos 3D/GLB/nave1.glb');
        this.Music = new Carga_ArchMusic(this.camara); 
        this.Music.Cargar_audio('./Archivos/Musica/music-intro.mp3');

        this.camara.position.set(0, 0, 30);

        const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.9);
        this.escena.add(luzAmbiente);

        this.animacionEstrellas = new AnimacionEstrellas(this.escena); // Instancia de animación de estrellas

        window.addEventListener('resize', this.onWindowResize.bind(this));
        this.reloj = new THREE.Clock();
        this.estado = false;
        this.animar();
    }

    cambiarDireccionEstrellas(direccion) {
        this.animacionEstrellas.cambiarDireccion(direccion);
    }
    efecto(){
        const efecto = new Carga_ArchMusic(this.camara); 
        efecto.Reproducir_unaVez('./Archivos/Efecto/play.mp3');

    }

    cambiarVelocidadEstrellas(velocidad) {
        this.animacionEstrellas.cambiarVelocidad(velocidad);
    }
    animar() {
        requestAnimationFrame(this.animar.bind(this));
        this.animacionEstrellas.moverEstrellas(); // Llama a la animación de las estrellas
        this.nave.Animacion1(this.estado);
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
// Ejemplo de cambio de dirección y velocidad cuando se presiona el botón
document.getElementById("playButton").addEventListener("click", () => {
    simulacion.cambiarDireccionEstrellas('adelante'); // Mover las estrellas hacia adelante
    simulacion.cambiarVelocidadEstrellas(0.5); // Aumenta la velocidad de las estrellas
    simulacion.efecto();
    simulacion.estado = true;
});