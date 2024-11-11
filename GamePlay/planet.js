
export class Planet {
    constructor(name, scene, ruta, x, y, z) {
        this.scene = scene;
        this.cargadorFBX = new THREE.FBXLoader();
        this.planeta = null;
        this.name = name;
        this.hovered = false; // Variable para saber si está siendo señalado
        this.scaleFactor = 1.0; // Factor de escala para el tamaño al pasar el mouse
        this.cargarModelo(ruta, x, y, z);
        this.raycaster = new THREE.Raycaster(); // Raycaster
        this.mouse = new THREE.Vector2(); // Vector del mouse
        this.completado = false;
    }

    cargarModelo(ruta, x, y, z) {
        this.cargadorFBX.load(ruta, (objeto) => {
            objeto.scale.set(0.04, 0.04, 0.04);
            objeto.position.set(x, y, z);
            objeto.rotation.y = 0.1;
            objeto.rotation.x = 0.1;
            this.planeta = objeto;
            this.scene.add(this.planeta);
        });
    }

    rotarPlaneta() {
        if (this.planeta) {
            this.planeta.rotation.y += 0.01;
        }
    }

    // Detectar si se hace clic en el planeta
    detectarClick(event, camera) {
        // Convertir las coordenadas del mouse a coordenadas normalizadas
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Configurar el rayo desde la cámara
        this.raycaster.setFromCamera(this.mouse, camera); // Lanza el rayo desde la cámara hacia el mouse

        // Obtener los objetos que intersectan con el rayo
        const intersects = this.raycaster.intersectObject(this.planeta, true); // true para incluir hijos

        if (intersects.length > 0) {
            console.log("¡El planeta fue clickeado!"+this.name);
            return true;  // Retorna true si el clic fue en el planeta
        }
        return false;  // Si no se hizo clic en el planeta, retorna false
    }
}

