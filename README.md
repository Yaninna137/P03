
# JUEGO: Nave espaciales
---

AVISO:

Proyecto retomado desde hace 2 años atrás. En el original se llegó hasta cierto punto pero al final quedó como un rompecabezas incompleto.
Ahora con más tiempo y mejor ordenamiento, se desarrollará el video juego, con mejor fluidez y calidez.

================= Herramientas ===========================
- Diagramas de arquitectura y flujo |-Draw.io
- Dibujo de papel a digital(vector/raster)|- Krita - InKscape
- Modelo 3D y colisiones GLB/FBX|- Blender
- Empaquetador HMR a vite

================= Diagrama necesarios ====================
- `Class/Module Diagram` |- Bucle de Juego y Arquitectura Modular Separa el ciclo requestAnimationFrame del renderizador, el gestor de escenas, el motor de físicas y el gestor de eventos de entrada (teclado/mouse).

- `FSM` |- Máquina de Estados Finita : Define los estados del jugador (reposo, movimiento, salto, interacción) y de la partida (menú, cargando, juego activo, pausa, derrota).

- `Flujo de Render vs. UI`: Un diagrama de capas que mapee qué corre en el canvas WebGL (objetos 3D y sprites 2D en el espacio de juego) y qué vive en el DOM HTML (menús, HUD, botones de pausa).

================ THREE.js ¿cómo funciona? =================
```python
import * as THREE from 'three';

// 1. Escena: el mundo contenedor
const scene = new THREE.Scene();

// 2. Cámara: el punto de vista (Perspectiva para 3D, Ortográfica para vistas 2.5D/planas)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

// 3. Renderizador: pinta la escena en un elemento <canvas>
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Bucle de actualización (Game Loop)
function animate() {
  requestAnimationFrame(animate);
  // Aquí se actualizan posiciones, físicas e inputs antes de pintar
  renderer.render(scene, camera);
}
animate();

```
---
============ Interfaz Teorico =============================

- `HUD`: Head-Up Display o visualizacion frontal: Capa de información visual que se muestra en la `pantalla`o se `proyecta` frente al usuario para entregar datos clave en tiempo real sin distraerlo. 
|- Existen 4 tipos, pero el que se buscará añadir es Hud inmersivo [Diegético].

============ Motor de física en 3D =======================

Rapier.js es uno de los motores de física en 3D para JavaScript más populares en el desarrollo de videojuegos web y experiencias interactivas (como simulaciones con Three.js). Su función principal es calcular la gravedad, las colisiones, la fricción y las fuerzas sobre objetos tridimensionales en el navegador.

- `Origen/Base`|-Escrito en Rust y compilado a WebAssembly (WASM).
- `Rendimento`|-Extremadamente alto. Al usar WebAssembly, procesa miles de objetos simultáneamente con un impacto mínimo en el rendimiento.
- `Determinismo`|-Si ejecutas la misma simulación con los mismos datos en cualquier dispositivo, el resultado será idéntico.
- `Tamaño de paquete`|-Mayor (debido al archivo WASM que debe descargar el navegador).
- `Facilidad de uso`|-Curva de aprendizaje un poco más inclinada debido a la traducción de conceptos de Rust a JS.

=========== Estructura Base - MOdular ================
```
proyecto-juego/
├── src/
│   ├── assets/              # Modelos .glb, texturas .png
│   ├── core/
│   │   ├── Game.js          # Inicializa el bucle y orquesta la partida
│   │   ├── Camera.js        # Configuración de cámara y seguimiento
│   │   └── Renderer.js      # Configuración de Three.WebGLRenderer
│   ├── entities/
│   │   ├── Player.js        # Lógica, modelo y física del personaje
│   │   └── World.js         # Terreno, luces, props estáticos
│   ├── systems/
│   │   ├── Physics.js       # Motor de colisiones
│   │   ├── Input.js         # Lectura de teclado/mouse/touch
│   │   └── AssetLoader.js   # Manejo de GLTFLoader con promesas
│   └── ui/
│       └── UIManager.js     # Event listeners del DOM para botones y HUD
        └── DebugStats.js   <-- Módulo que inicializa y actualiza stats.js
├── index.html
└── main.js
```
