export class AnimacionEstrellas {
    constructor(escena) {
        this.escena = escena;
        this.estrellas = [];
        this.direccion = 'izquierda'; // Dirección inicial
        this.velocidad = 0.01; // Velocidad inicial
        this.crearEstrellas();
    }

    crearEstrellas() {
        const geometriaEstrella = new THREE.SphereGeometry(0.02, 8, 8);
        const materialEstrella = new THREE.MeshBasicMaterial({ color: 0xffffff });

        for (let i = 0; i < 300; i++) {
            const estrella = new THREE.Mesh(geometriaEstrella, materialEstrella);
            estrella.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * -100
            );
            this.escena.add(estrella);
            this.estrellas.push(estrella);
        }
    }

    moverEstrellas() {
        this.estrellas.forEach((estrella) => {
            if (this.direccion === 'izquierda') {
                estrella.position.x -= this.velocidad;
                if (estrella.position.x < -10) {
                    estrella.position.x = 10;
                }
            }
            if (this.direccion === 'abajo') {
                estrella.position.y -= this.velocidad;
                if (estrella.position.y < -10) {
                    estrella.position.y = 10;
                }
            }
            if (this.direccion === 'adelante') {
                estrella.position.z += this.velocidad; // Mover hacia adelante (hacia la cámara)
                if (estrella.position.z > 30) { // Reajustamos la posición para dar el efecto
                    estrella.position.z = -100; // Cuando pasa la cámara, regresa a la posición inicial
                }
            }
        });
    }

    cambiarDireccion(nuevaDireccion) {
        this.direccion = nuevaDireccion;
    }

    cambiarVelocidad(nuevaVelocidad) {
        for (let i = 0; i < (nuevaVelocidad * 4); i++) {
            this.velocidad += i/4;
        }
        return false;
    }
}
