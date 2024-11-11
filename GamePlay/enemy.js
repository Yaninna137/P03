export class Enemyl {
    constructor(rutaModelo, escena, x, y, z,vida, escala,rX,rZ) {
        this.escena = escena;
        this.enemy = null;
        this.cargarModelo(rutaModelo, x, y, z, escala,rX,rZ);
        this.rZ = rZ;
        this.rX = rX;
        this.proyectiles = [];
        this.boundingBox = new THREE.Box3();
        this.vida = vida;
        this.Num_Barra = 0;
    }

    cargarModelo(ruta, x, y, z, escala,rX,rZ) {
        const loader = new THREE.GLTFLoader();
        loader.load(ruta, (gltf) => {
            this.enemy = gltf.scene;
            this.enemy.position.set(x, y, z);
            this.enemy.scale.set(escala, escala, escala); // Escalar en los tres ejes
            this.escena.add(this.enemy);
            this.enemy.rotation.y = rX;
            this.enemy.rotation.z = rZ;

            this.actualizarBoundingBox(); // Inicializar boundingBox al cargar el modelo
        }, undefined, (error) => {
            console.error(error);
        });
    }
    cambiarAngulo(anguloX, anguloY, anguloZ) {
        if (this.enemy) {
            // Convierte grados a radianes
            this.enemy.rotation.x = THREE.MathUtils.degToRad(anguloX);
            this.enemy.rotation.y = THREE.MathUtils.degToRad(anguloY);
            this.enemy.rotation.z = THREE.MathUtils.degToRad(anguloZ);
        }
    }
    

    actualizarBoundingBox() {
        if (this.enemy) {
            this.boundingBox.setFromObject(this.enemy);
        }
    }
    mover(dx, dy, dz) {
        if (this.enemy) {
            this.enemy.position.x += dx;
            this.enemy.position.y += dy;
            this.enemy.position.z += dz;
            this.actualizarBoundingBox(); // Actualizar boundingBox cuando la nave se mueva
        }
    }
    
}