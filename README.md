<div align="center">

# JUEGO 3D - NAVE ESPACIAL

> PLantilla de herramientas y Información

</div>


## 🛠️ Herramientas y Ecosistema

### 1. Herramientas Externas (Diseño y Creación de Recursos)

| Categoría | Herramienta | Propósito / Formato |
| :--- | :--- | :--- |
| **Diagramas y Flujos** | [Draw.io](https://app.diagrams.net/) / [Excalidraw](https://excalidraw.com/) | Arquitectura modular, FSM y flujos de renderizado |
| **Ilustración y Trazado** | [Krita](https://krita.org/) / [Inkscape](https://inkscape.org/) | Digitalización de dibujos en papel, entintado y vectorización |
| **Modelado 3D y Colisiones** | [Blender](https://www.blender.org/) | Creación de modelos 3D, hitboxes simplificadas y exportación `.glb` |
| **Composición Musical** | [LMMS](https://lmms.io/) / [BeepBox](https://www.beepbox.co/) | Producción de bandas sonoras y pistas en loop |
| **Efectos de Sonido (SFX)** | [Chiptone](https://sfbgames.itch.io/chiptone) / [sfxr](https://www.drpetter.se/project_sfxr.html) | Generación procedural de sonidos (disparos, impactos, turbinas) |
| **Edición y Optimización de Audio** | [Audacity](https://www.audacityteam.org/) | Limpieza, corte de loops perfectos y exportación a `.ogg` |

### 2. Dependencias del Proyecto (Código y Ejecución)

| Librería / Entorno | Tipo | Función |
| :--- | :--- | :--- |
| **Vite** | Bundler / DevServer | Empaquetado rápido y entorno de desarrollo local con HMR |
| **React** | Framework UI | Gestión del HUD, menús y capas de interfaz 2D |
| **Three.js** | Motor Gráfico WebGL | Renderizado de escenas, modelos 3D, cámaras e iluminación |
| **@dimforge/rapier3d-compat** | Motor de Físicas (WASM) | Simulación de colisiones, gravedad y dinámicas de movimiento |
| **stats.js** | Herramienta de Depuración | Monitor de rendimiento en tiempo real (FPS, MS, Memoria) |

---
## Interfaz Teorico

- `HUD`: Head-Up Display o visualizacion frontal: Capa de información visual que se muestra en la `pantalla`o se `proyecta` frente al usuario para entregar datos clave en tiempo real sin distraerlo. 
|- Existen 4 tipos, pero el que se buscará añadir es Hud inmersivo [Diegético].

## Motor de física en 3D

Rapier.js es uno de los motores de física en 3D para JavaScript más populares en el desarrollo de videojuegos web y experiencias interactivas (como simulaciones con Three.js). Su función principal es calcular la gravedad, las colisiones, la fricción y las fuerzas sobre objetos tridimensionales en el navegador.

- `Origen/Base`|-Escrito en Rust y compilado a WebAssembly (WASM).
- `Rendimento`|-Extremadamente alto. Al usar WebAssembly, procesa miles de objetos simultáneamente con un impacto mínimo en el rendimiento.
- `Determinismo`|-Si ejecutas la misma simulación con los mismos datos en cualquier dispositivo, el resultado será idéntico.
- `Tamaño de paquete`|-Mayor (debido al archivo WASM que debe descargar el navegador).
- `Facilidad de uso`|-Curva de aprendizaje un poco más inclinada debido a la traducción de conceptos de Rust a JS.
---
## Diagrama necesarios
- `Class/Module Diagram` |- Bucle de Juego y Arquitectura Modular Separa el ciclo requestAnimationFrame del renderizador, el gestor de escenas, el motor de físicas y el gestor de eventos de entrada (teclado/mouse).

- `FSM` |- Máquina de Estados Finita : Define los estados del jugador (reposo, movimiento, salto, interacción) y de la partida (menú, cargando, juego activo, pausa, derrota).

- `Flujo de Render vs. UI`: Un diagrama de capas que mapee qué corre en el canvas WebGL (objetos 3D y sprites 2D en el espacio de juego) y qué vive en el DOM HTML (menús, HUD, botones de pausa).
