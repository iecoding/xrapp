import {Scene, HemisphericLight, FreeCamera, Vector3, MeshBuilder, WebXRHitTest, WebXRAnchorSystem, WebXRState} from 'babylonjs';
const log = console.log;


export async function startScene(engine) {
    const scene = new Scene(engine);
    const light = new HemisphericLight('light', new Vector3(0, 2, 0), scene);
    const cam = new FreeCamera('cam', new Vector3(0, 0, -2), scene);
    cam.attachControl();

    //const box = MeshBuilder.CreateBox('box', {size: .5}, scene);
    const dot = MeshBuilder.CreateSphere('dot', {diameter: .05}, scene);

    const xr = await scene.createDefaultXRExperienceAsync({
        uiOptions: {
            sessionMode: 'immersive-ar',
            referenceSpaceType: 'unbounded',
        },
    });

    // Enable hit test feature - try to access it immediately or wait for session
    const enableHitTest = () => {
        const baseExp = xr.baseExperience;
        if (!baseExp) {
            log('baseExperience not available yet');
            return;
        }

        // Try featuresManager first (newer API), then frameManager (older API)
        const fm = baseExp.featuresManager || baseExp.frameManager;
        if (!fm) {
            log('frameManager/featuresManager not available yet');
            return;
        }

        try {
            const hitTest = fm.enableFeature(WebXRHitTest, "latest");
            if (hitTest) {
                hitTest.onHitTestResultObservable.add((result) => {
                    // Safety check: ensure result array has elements and transformationMatrix exists
                    if (result && Array.isArray(result) && result.length > 0 && result[0] && result[0].transformationMatrix) {
                        result[0].transformationMatrix.decompose(dot.scaling, dot.rotationQuaternion, dot.position);
                    }
                });
                log('Hit test feature enabled');
            }
        } catch (error) {
            log('Error enabling hit test:', error);
        }
    };

    // Try to enable immediately
    enableHitTest();

    // Also listen for when XR session starts
    xr.baseExperience.onStateChangedObservable.add((state) => {
        if (state === WebXRState.IN_XR) {
            enableHitTest();
        }
    });

    
    await scene.whenReadyAsync();
    return scene;
}