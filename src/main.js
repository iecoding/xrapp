import {Engine, Scene} from 'babylonjs';
import {startScene} from './scenes/start';

const engine = new Engine(document.getElementById('renderCanvas'), true);

async function main() {
    const scene = await startScene(engine);

    engine.runRenderLoop(() => scene.render());
}

main();