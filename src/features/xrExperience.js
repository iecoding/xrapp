import { enableHitTest } from './hitTest.js';
import { enableAnchorSystem } from './anchorSystem.js';
import { enableLightEstimation } from './lightEstimation.js';

export async function enableXrExperience(scene) {
    try {
        const xr = await scene.createDefaultXRExperienceAsync({
            uiOptions: {
                sessionMode: 'immersive-ar',
                optinalfeatures: true
            },
        });
    
        const fm = xr.baseExperience.featuresManager;

        enableHitTest(fm, scene);
        enableAnchorSystem(fm, scene);
        enableLightEstimation(fm, scene);
    

    }
    catch (error) {
        console.error(error);
    }
}