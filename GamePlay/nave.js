export class NaveEspacial {
    constructor(rutaModelo, escena, x, y, z,vida, escala = 1) {
        this.escena = escena;
        this.nave = null;
        this.cargarModelo(rutaModelo, x, y, z, escala);
        this.proyectiles = [];
        this.boundingBox = new THREE.Box3();
        this.vida = vida;
        this.Num_Barra = 0;
    }

    cargarModelo(ruta, x, y, z, escala) {
        const loader = new THREE.GLTFLoader();
        loader.load(ruta, (gltf) => {
            this.nave = gltf.scene;
            this.nave.position.set(x, y, z);
            this.nave.scale.set(escala, escala, escala); // Escalar en los tres ejes
            this.escena.add(this.nave);
            this.actualizarBoundingBox(); // Inicializar boundingBox al cargar el modelo
        }, undefined, (error) => {
            console.error(error);
        });
    }

    actualizarBoundingBox() {
        if (this.nave) {
            this.boundingBox.setFromObject(this.nave);
        }
    }
    mover(dx, dy, dz) {
        if (this.nave) {
            this.nave.position.x += dx;
            this.nave.position.y += dy;
            this.nave.position.z += dz;
            this.actualizarBoundingBox(); // Actualizar boundingBox cuando la nave se mueva
        }
    }
    
    mostrarVida() {
        const lifeContainer = document.createElement("div");
        lifeContainer.style.position = "absolute";
        lifeContainer.style.top = "10vh";
        lifeContainer.style.left = "10vh";
        lifeContainer.style.display = "flex";

        for (let i = 0; i < this.vida; i++) {
            const lifeIcon = document.createElement("img");
            lifeIcon.src = '../mi-proyecto/Archivos/life.png';
            lifeIcon.width = 40;
            lifeIcon.height = 30;
            lifeContainer.appendChild(lifeIcon);
        }
        document.body.appendChild(lifeContainer);
        this.lifeContainer = lifeContainer;
    }
    crearBarra() {
        // Crea la barra solo una vez
        this.barraLaser = document.createElement("div");
        this.barraLaser.style.position = "absolute";
        this.barraLaser.style.bottom = "10px";
        this.barraLaser.style.left = "10px";
        this.barraLaser.style.height = "10px";
        this.barraLaser.style.backgroundColor = "blue";
        this.barraLaser.style.width = "0px"; // Comienza en 0

        // Añade la barra al DOM
        document.body.appendChild(this.barraLaser);
    }
    actualizarBarra(disparos) {
        const anchoMaximo = 200;  // Ancho máximo de la barra (puedes ajustarlo)
        const nuevoAncho = (disparos / 6) * anchoMaximo;
        this.barraLaser.style.width = `${nuevoAncho}px`;
    }
}