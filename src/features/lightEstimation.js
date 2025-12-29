import { WebXRLightEstimation } from 'babylonjs';
import { createShadowGenerator } from './shadows.js';

export function enableLightEstimation(fm, scene) {
    try {
        const le = fm.enableFeature(WebXRLightEstimation, "latest", {
        setSceneEnvironmentTexture: true,
        createDirectionalLightSource: true
        });
        
        // The directional light might not be available immediately
        // Wait for it to be created or check if it exists
        if (le.directionalLight) {
            createShadowGenerator(scene, le.directionalLight);
        } else {
            // Listen for when the directional light becomes available
            const checkLight = () => {
                if (le.directionalLight) {
                    createShadowGenerator(scene, le.directionalLight);
                } else {
                    // Retry after a short delay
                    setTimeout(checkLight, 100);
                }
            };
            checkLight();
        }
    }
    catch (error) {
        console.error(error);
    }
}