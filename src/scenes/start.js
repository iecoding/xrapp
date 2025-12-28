import {Scene, HemisphericLight, FreeCamera, Vector3, MeshBuilder} from 'babylonjs';
const log = console.log;


export async function startScene(engine) {
    const scene = new Scene(engine);
    const light = new HemisphericLight('light', new Vector3(0, 2, 0), scene);
    const cam = new FreeCamera('cam', new Vector3(0, 0, -2), scene);
    cam.attachControl();

    const box = MeshBuilder.CreateBox('box', {size: .5}, scene);

    await scene.createDefaultXRExperienceAsync({
        uiOptions: {
            sessionMode: 'immersive-ar',
        },
    });

    setInterval(() => {console.log('something')}, 1000);

    await scene.whenReadyAsync();
    return scene;
}