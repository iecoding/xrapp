import {Scene, HemisphericLight, FreeCamera, Vector3, MeshBuilder,
    WebXRHitTest, WebXRAnchorSystem
} from 'babylonjs';
const log = console.log;

export async function startScene(engine) {
    const scene = new Scene(engine);
    const light = new HemisphericLight('light', new Vector3(0, 2, 0), scene);
    const cam = new FreeCamera('cam', new Vector3(0, 0, -2), scene);
    cam.attachControl();

    //const box = MeshBuilder.CreateBox('box', {size: .5}, scene);
    const dot = MeshBuilder.CreateSphere('dot', {size: .05}, scene);

    const xr = await scene.createDefaultXRExperienceAsync({
        uiOptions: {
            sessionMode: 'immersive-ar',
            uiProfile: 'immersive-ar',
        },
    });

    const fm = xr.baseExperience.featuresManager;
    const hitTest = fm.enableFeature(WebXRHitTest, "latest");

    hitTest.onHitTestResultObservable.add( result => {
        if (result.length) {
            result[0].transformationMatrix.decompose(dot.scale, dot.rotationQuaternion, dot.position);
        }
    });

    await scene.whenReadyAsync();

    return scene;
}