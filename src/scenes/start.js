import {Scene, HemisphericLight, FreeCamera, Vector3 } from 'babylonjs';
import { enableXrExperience } from '../features/xrExperience.js';
import { createArGround } from '../tools.js';
const log = console.log;

export async function startScene(engine) {
    const scene = new Scene(engine);
    const cam = new FreeCamera('cam', new Vector3(0, 0, -2), scene);
    cam.attachControl();

    const ground = createArGround(scene);

    await scene.whenReadyAsync();

    await enableXrExperience(scene);

    return scene;
}