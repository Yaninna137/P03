import { AnimacionEstrellas } from '../Animacion/a1.js';
import { Carga_ArchMusic } from '../GamePlay/musica.js';
import { NaveEspacial } from '../GamePlay/nave.js';
import { Planet} from '../GamePlay/planet.js'
import { Enemyl } from '../GamePlay/enemy.js';
class SimulacionEspacio {

    constructor() {
        this.escena = new THREE.Scene();
        this.camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderizador = new THREE.WebGLRenderer({ antialias: true });
        this.renderizador.setSize(window.innerWidth, window.innerHeight);
        this.htmlAA = document.getElementById("box").innerHTML = '';
        document.getElementById("box").appendChild(this.renderizador.domElement);

        // this.camara.position.set(0, 0, 30);
        this.camara.position.set(10, 0, 30);

        const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.9);
        this.escena.add(luzAmbiente);
        this.raycaster = new THREE.Raycaster(); // Inicializa el raycaster
        this.cursor = new THREE.Vector2();     // Coordenadas del cursor

        this.Music = new Carga_ArchMusic(this.camara);
        this.SEfecto = new Carga_ArchMusic(this.camara);
        this.efectoReproducido = false;

        this.Tipo_Ecena = 1;
        this.ruta_Modelos = [
            ['../mi-proyecto/Archivos/Modelos 3D/GLB/nave1.glb',-2, 3, -10, 1.1],
            ['../mi-proyecto/Archivos/Modelos 3D/GLB/nave3.glb', 2, 3, -10, 7],
            ['../mi-proyecto/Archivos/Modelos 3D/GLB/nave4.glb',-2, 3, -10, 1],
            ['../mi-proyecto/Archivos/Modelos 3D/GLB/nave2.glb',-4, 3, -10, 1]
        ];
        this.ruta_Enemiga = [
            ['../mi-proyecto/Archivos/Modelos 3D/GLB/enemy2.glb'], //9,-5,0,1,2,-21.4,-0.3
            ['../mi-proyecto/Archivos/Modelos 3D/GLB/boot1.glb'],  //9,-5,0,1,3,-19.9,-0.3
            ['../mi-proyecto/Archivos/Modelos 3D/GLB/jefe.glb'], //9,-5,0,1,5,-21.4,-0.3
            ['../mi-proyecto/Archivos/Modelos 3D/GLB/boot2.glb'] //9,-5,0,1,3,-21.1,-0.3

        ];
        this.indice = 0;

        this.life = 3;
        this.disparo = 3;
        this.tiempo = 2;
        this.Nivel1 = false; // Planeta jugado y completado
        this.Nivel2 = false; // Planeta jugado y completado
        this.Nivel3 = false; // Planeta jugado y completado
        this.Planet_Select = null; //Planeta selecionado
        this.Animacion_Planet = false;
        this.Estado_Game = false;
        this.puntos = 0;
        this.velocidadNave = 0.1;
        this.StartTime = null
        this.Tiempo_Enemy = 3;
        this.Tiempo_Nivel = 10;
        this.Num_Enemigo = 0;
        this.EnemigoSS = [];
        this.Totaldisparo = 0
        this.proyectiles = [];

        this.raycaster = new THREE.Raycaster();
        this.cursor = new THREE.Vector2();
   
        this.Modo_Ecena(this.Tipo_Ecena);
        this.animacionEstrellas = new AnimacionEstrellas(this.escena); // Instancia de animación de estrellas

        // Event listeners para clics y movimientos del cursor
        window.addEventListener('resize', this.onWindowResize.bind(this));
        window.addEventListener('click', this.onMouseClick.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('keydown',this.onKeyDown.bind(this));


        this.reloj = new THREE.Clock();
        this.animar();
    }
    onKeyDown(event){
        if (this.Estado_Game){
            switch (event.key){
                //COLAR LIMITES DE RANGO PARA NO SALIR DE LA PANTALLA
                case 'ArrowLeft':
                    this.naveJugador.nave.position.x -= this.velocidadNave;
                    break;
                case 'ArrowRight':
                    this.naveJugador.nave.position.x += this.velocidadNave;
                    break;
                case ' ':
                    this.disparar_Jugador();
                    break;
            }
        }

    }
    Modo_Ecena(N_escena){
        switch (N_escena) {
            case 1:
                this.Estado_Game = false;
                // this.camara.position.set(10, 0, 45);
                this.htmlAA = document.getElementById("box").innerHTML = `
                <h1 class="t">GALAXIA</h1>
                <button id="Mecanico">Mejorar nave</button>
                <p id="punto">Puntos Total Obtenidos: ${this.puntos}</p>
                `
                
                if (this.Nivel1 && this.Nivel2 && this.Nivel3){
                    this.htmlAA = document.getElementById("box").innerHTML += `
                    <button id="fin">Ver_final</button>`
                    document.getElementById("fin").addEventListener('click', () => {
                    window.location.href = '../mi-proyecto/final.html'; 
                    });
                    }
                document.getElementById("box").appendChild(this.renderizador.domElement);
                this.Music.detenerAudio(); // Detener la música anterior si hay
                this.Music.Cargar_audio('./Archivos/Musica/music-planet.mp3'); // Cargar nueva música

                this.Galaxia();  // Carga todo lo de Galaxia
                
                // Agregar manejador de evento para cambiar de escena
                document.getElementById("Mecanico").addEventListener('click', () => {
                    this.SEfecto.Reproducir_unaVez('./Archivos/Efecto/p-retroceder.mp3');
                    this.Tipo_Ecena = 2; // Cambiar a la escena 2
                    this.Modo_Ecena(this.Tipo_Ecena); // Cambiar la escena
                });
                break;
            case 2:
                this.htmlAA = document.getElementById("box").innerHTML = `
                <h1 class="t">MECANICO SPACE</h1>
                <button id="but1">Mas Corazon</button>
                <button id="but2">Mas disparo</button>
                <button id="but3">Mejorar tiempo</button>
                <button id="but4">(<)</button>
                <button id="but5">(>)</button>
                <button id="listo">Listo(play)</button> 
                <p>Equipa una buena nave y mejorala.Tendrás más posibilidad
                    de derrotar a los 'cubyles'
                </p>
                `
                document.getElementById("box").appendChild(this.renderizador.domElement);


                this.Music.detenerAudio(); // Detener la música anterior si hay
                this.Music.Cargar_audio('./Archivos/Musica/music-mecanico.mp3'); // Cargar nueva música
                this.eliminarPlaneta();
                this.Mecanico();

                // Asigna eventos a los botones
                document.getElementById("but1").addEventListener("click", () => {simulacion.masCorazon();this.SEfecto.Reproducir_unaVez('./Archivos/Efecto/mejora.mp3');});
                document.getElementById("but2").addEventListener("click", () => {simulacion.masDisparo();
                    // this.naveJugador.crearBarra();
                    this.naveJugador.actualizarBarra(this.disparo);    
                    this.SEfecto.Reproducir_unaVez('./Archivos/Efecto/mejora.mp3'); 
                });
                document.getElementById("but3").addEventListener("click", () => {simulacion.mejorarTiempo();this.SEfecto.Reproducir_unaVez('./Archivos/Efecto/mejora.mp3');});
                document.getElementById("but4").addEventListener("click", () => {simulacion.cambiarNaveLeft();this.SEfecto.Reproducir_unaVez('./Archivos/Efecto/p-retroceder.mp3');});
                document.getElementById("but5").addEventListener("click", () => {simulacion.cambiarNaveRight();this.SEfecto.Reproducir_unaVez('./Archivos/Efecto/p-siguiente.mp3');});
                document.getElementById("listo").addEventListener('click', () => {
                    this.SEfecto.Reproducir_unaVez('./Archivos/Efecto/p-retroceder.mp3');
                    this.Tipo_Ecena = 1; // Cambiar a la escena 2
                    this.Modo_Ecena(this.Tipo_Ecena); // Cambiar la escena
                    
                });
                break;
            case 3:
                this.SEfecto.Reproducir_unaVez('./Archivos/Efecto/risa-enemy.mp3');
                this.Estado_Game = true;
                this.htmlAA = document.getElementById("box").innerHTML = '';
                document.getElementById("box").appendChild(this.renderizador.domElement);

                this.Music.detenerAudio(); // Detener la música anterior si hay
                this.Music.Cargar_audio('./Archivos/Musica/music-intro.mp3'); // Cargar nueva música

                this.eliminarPlaneta()
                this.Juego();
                break;
        }
    }
    Galaxia(){
        // Remover la nave anterior si existe
        if (this.naveJugador && this.naveJugador.nave) {
            this.eliminar_Nave(this.naveJugador);
        }
        this.naveJugador = new NaveEspacial(this.ruta_Modelos[this.indice][0],this.escena,this.ruta_Modelos[this.indice][1],this.ruta_Modelos[this.indice][2],this.ruta_Modelos[this.indice][3],this.life,this.ruta_Modelos[this.indice][4]);
        this.Planeta();
        this.Animacion_Planet = true;
        this.naveJugador.crearBarra();
        this.naveJugador.actualizarBarra(this.disparo);
    }
    Mecanico(){
        // Remover la nave anterior si existe
        if (this.naveJugador && this.naveJugador.nave) {
            this.escena.remove(this.naveJugador.nave);
        }
        this.naveJugador = new NaveEspacial(this.ruta_Modelos[this.indice][0],this.escena,this.ruta_Modelos[this.indice][1],this.ruta_Modelos[this.indice][2],this.ruta_Modelos[this.indice][3],this.life,this.ruta_Modelos[this.indice][4]);
        this.naveJugador.mostrarVida()
        this.naveJugador.crearBarra();
    }
    Juego(){
        this.escena.remove(this.naveJugador.nave)
        this.naveJugador = new NaveEspacial(this.ruta_Modelos[this.indice][0],this.escena,this.ruta_Modelos[this.indice][1],this.ruta_Modelos[this.indice][2],this.ruta_Modelos[this.indice][3],this.life,this.ruta_Modelos[this.indice][4]);
        this.naveJugador.mostrarVida();
        this.naveJugador.crearBarra();
        this.Tipo_Nivel(this.Planet_Select);
    }
    eliminar_Nave(objeto){
        this.escena.remove(objeto.nave);
    }
    eliminar_Enemmigo(objeto){
        this.escena.remove(objeto.enemy);
    }
    eliminarPlaneta() {
        this.escena.remove(this.pa3.planeta);
        this.escena.remove(this.pa2.planeta);
        this.escena.remove(this.pa1.planeta);
    }
    Planeta(){
        this.pa1 = new Planet('p1',this.escena,'../mi-proyecto/Archivos/Modelos 3D/FXB/aaa.fbx',-150, 40, -190);  // Aquí cargas el planeta
        this.pa2 = new Planet('p2',this.escena,'../mi-proyecto/Archivos/Modelos 3D/FXB/aaa.fbx',0, 40, -190);  // Aquí cargas el planeta
        this.pa3 = new Planet('p3',this.escena,'../mi-proyecto/Archivos/Modelos 3D/FXB/aaa.fbx',150, 40, -190);  // Aquí cargas el planeta
    }
    Tipo_Nivel(planet_n){
        switch(planet_n){
            case 'p1':
                this.Totaldisparo = this.disparo;
                this.Tiempo_Enemy = 5;
                this.Tiempo_Nivel = 30;
                this.Num_Enemigo = 3;
                this.EnemigoSS = [];
                for(let i=0;i< this.Num_Enemigo; i++){
                    this.enemigo = new Enemyl(this.ruta_Enemiga[0],this.escena,9+(2*i),3,0,1,2,-21.4,-0.3);
                    this.EnemigoSS.push(this.enemigo);
                }
                break;
            case 'p2':
                this.Tiempo_Enemy = 4;
                this.Tiempo_Nivel = 25;
                this.Num_Enemigo = 3;
                this.EnemigoSS = [];
                for(let i=0;i< this.Num_Enemigo; i++){
                    this.enemigo = new Enemyl(this.ruta_Enemiga[1],this.escena,9+(2*i),3,0,1,2,-21.4,-0.3);
                    this.EnemigoSS.push(this.enemigo);
                }
                break;
            case 'p3':
                this.Tiempo_Enemy = 3;
                this.Tiempo_Nivel = 20;
                this.Num_Enemigo = 3;
                this.EnemigoSS = [];
                for(let i=0;i< this.Num_Enemigo; i++){
                    this.enemigo = new Enemyl(this.ruta_Enemiga[0],this.escena,9+(2*i),3,0,1,2,-21.4,-0.3);
                    this.EnemigoSS.push(this.enemigo);
                }
                this.jefe = new Enemyl(this.ruta_Enemiga[2],this.escena,9+(2*i),3,0,1,5,-21.4,-0.3);
                break;
        }
    }
    disparar_Jugador() {

        if (this.proyectiles.length < this.Totaldisparo-1) { // Limitar la cantidad de proyectiles
            const proyectilGeometry = new THREE.SphereGeometry(0.1, 8, 8); // Pequeña esfera para el láser
            const proyectilMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
            const proyectil = new THREE.Mesh(proyectilGeometry, proyectilMaterial);

            // Posicionar el proyectil delante de la nave
            proyectil.position.set(
                this.naveJugador.nave.position.x,
                this.naveJugador.nave.position.y,
                this.naveJugador.nave.position.z - 1
            );

            this.escena.add(proyectil);
            this.proyectiles.push(proyectil);
            this.disparo -= 1;
            this.naveJugador.actualizarBarra()
        }else{
            if(this.disparo === 0){
                this.disparo = this.Totaldisparo;
            }
        }

    }
    disparar_Enemigo(Objeto) {
        const proyectilGeometry = new THREE.SphereGeometry(0.1, 8, 8); // Pequeña esfera para el láser
        const proyectilMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        const proyectil = new THREE.Mesh(proyectilGeometry, proyectilMaterial);

            // Posicionar el proyectil delante de la nave
        proyectil.position.set(
            Objeto.enemy.position.x,
            Objeto.enemy.position.y,
            Objeto.enemy.position.z + 1
        );

        this.escena.add(proyectil);
        this.proyectiles.push(proyectil);

    }
    Actualizar_disparo_Enemigo(){ {
        if(this.Estado_Game){
            // Limitar la actualización de los proyectiles
            for (let i = this.proyectiles.length - 1; i >= 0; i--) {
                this.proyectiles[i].position.z -= 0.5; // Movimiento hacia la cámara
                if (this.naveJugador.nave && this.detectarColisionNAVE(this.proyectiles[i], this.naveJugador)) {
                    console.log("¡Impacto en la nave !");
                    this.vida -= 1;
                    if (this.vida === 0){
                        this.escena.remove(this.naveJugador.nave);
                        for(let i=0;i< this.EnemigoSS.length -1; i++){
                            this.escena.remove(this.EnemigoSS[i].enemy);
                        }
                        // if (this.jefe) {
                        //     this.escena.remove(this.jefe.enemy);
                        // }
                        this.Estado_Game(false);  // Termina el juego
                        console.log('Murio Jugador')
                    }
                    this.escena.remove(this.proyectiles[i]);
                    this.proyectiles.splice(i, 1); // Eliminar el proyectil
                } else if (this.proyectiles[i].position.z < -50) { // Proyectil fuera de pantalla
                    this.escena.remove(this.proyectiles[i]);
                    this.proyectiles.splice(i, 1);
                }
            }
        }
    }}
    Actualizar_disparo(){ {
        if(this.Estado_Game){
            // Limitar la actualización de los proyectiles
            for (let i = this.proyectiles.length - 1; i >= 0; i--) {
                this.proyectiles[i].position.z -= 0.5; // Movimiento hacia la cámara
                for(let i=0;i< this.EnemigoSS.length -1; i++){
                    if (this.EnemigoSS[i].enemy && this.detectarColision(this.proyectiles[i], this.EnemigoSS[i])) {
                        console.log("¡Enemigo derrotado!");
                        this.escena.remove(this.EnemigoSS[i].enemy);
                        this.escena.remove(this.proyectiles[i]);
                        this.proyectiles.splice(i, 1); // Eliminar el proyectil
                        this.EnemigoSS[i].splice(i, 1); // Eliminar enemigo
                    } else if (this.proyectiles[i].position.z < -50) { // Proyectil fuera de pantalla
                        this.escena.remove(this.proyectiles[i]);
                        this.proyectiles.splice(i, 1);
                    }
                }
            }
        }
    }}
    detectarColision(proyectil, objetivo) {
        const proyectilBox = new THREE.Box3().setFromObject(proyectil);
        const objetivoBox = new THREE.Box3().setFromObject(objetivo.enemy);
        return proyectilBox.intersectsBox(objetivoBox);
    }
    detectarColisionNAVE(proyectil, objetivo) {
        const proyectilBox = new THREE.Box3().setFromObject(proyectil);
        const objetivoBox = new THREE.Box3().setFromObject(objetivo.nave);
        return proyectilBox.intersectsBox(objetivoBox);
    }
    masCorazon() {
        if (this.life < 5) this.life += 1;
        console.log(this.life);
        this.Mecanico(); // Aplicar cambios
    }
    Medida(){
        if(this.StartTime === null){
            this.StartTime = Date.now();
        }
        const elapsedTIME = (Date.now()-this.StartTime)/1000;
        const progress = Math.min(elapsedTIME / this.Tiempo_Nivel,1);
        // const progessEnemy = [];
        // for(let i=0;i< this.EnemigoSS.length -1; i++){
        //     const pE = Math.min(elapsedTIME / this.Tiempo_Enemy,1);
        //     progessEnemy.push(pE)
        // }
        // for(let i=0;i< progessEnemy.length -1; i++){
        //     if (progessEnemy[i]===1){
        //         this.disparar_Enemigo(this.EnemigoSS[i]);
        //     }
        // }   
        if (progress === 1){
            this.Estado_Game = false;
            this.StartTime = null;
            this.Tipo_Ecena = 1;
            this.Modo_Ecena(this.Tipo_Ecena);
        }
    }
    masDisparo() {
        if (this.disparo < 6) this.disparo += 1;
        console.log(this.disparo);
        // Opcional: Agregar lógica específica si disparo afecta la nave
    }

    mejorarTiempo() {
        if (this.tiempo > 0.3) this.tiempo -= 0.3;
        console.log(this.tiempo);
    }

    cambiarNaveLeft() {
        this.indice = this.indice === 0 ? this.ruta_Modelos.length - 1 : this.indice - 1;
        console.log(this.indice);
        this.Mecanico(); // Cambiar nave
    }
    cambiarNaveRight() {
        this.indice = this.indice === this.ruta_Modelos.length - 1 ? 0 : this.indice + 1;
        console.log(this.indice);
        this.Mecanico(); // Cambiar nave
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
        // this.pa1.rotarPlaneta(this.Animacion_Planet);
        // this.pa2.rotarPlaneta(this.Animacion_Planet);
        // this.pa3.rotarPlaneta(this.Animacion_Planet);
        if(this.Estado_Game){
            if (this.naveJugador.nave) this.naveJugador.actualizarBoundingBox();
            for(let i=0;i< this.EnemigoSS.length -1; i++){
                if (this.naveEnemiga.nave) this.naveEnemiga.actualizarBoundingBox();
            }
            
    
            this.Medida()
        }
        this.Actualizar_disparo();
        this.renderizador.render(this.escena, this.camara);
    }
    onMouseMove(event) {
        // Actualizar las coordenadas del cursor con valores normalizados (-1 a 1)
        this.cursor.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.cursor.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    }
    
    onMouseClick(event) {
        // Obtener la intersección del rayo con los objetos planetas
        if (this.pa3.detectarClick(event,this.camara)){
            console.log('AAAAAAAAAAAAAA')
            try{
                this.Tipo_Ecena = 3;
                this.Modo_Ecena(this.Tipo_Ecena);
                this.Planet_Select = this.pa3.name;
            }catch(error){
                console.log(error)
            }

        }
        if (this.pa2.detectarClick(event,this.camara)){
            console.log('EEEEEEEEEEEEE');
            try{
                this.Tipo_Ecena = 3;
                this.Modo_Ecena(this.Tipo_Ecena);
                this.Planet_Select = this.pa2.name;
            }catch(error){
                console.log(error);
            }
        }
        if (this.pa1.detectarClick(event,this.camara)){
            console.log('UUUUUUUUUUUUUU');
            try{
                this.Tipo_Ecena = 3;
                this.Modo_Ecena(this.Tipo_Ecena);
                this.Planet_Select = this.pa1.name;
            }catch(error){
                console.log(error)
            }
        }
    }
    
    onWindowResize() {
        this.camara.aspect = window.innerWidth / window.innerHeight;
        this.camara.updateProjectionMatrix();
        this.renderizador.setSize(window.innerWidth, window.innerHeight);
    }
}

// Inicializa la simulación
const simulacion = new SimulacionEspacio();