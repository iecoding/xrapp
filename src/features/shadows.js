import { ShadowGenerator } from 'babylonjs';

let shadowGenerator = undefined;
export function createShadowGenerator(scene, directionalLight) {
    if (!directionalLight) {
        console.warn('Cannot create shadow generator: directionalLight is null');
        return null;
    }
    shadowGenerator = new ShadowGenerator(1000, directionalLight);
    shadowGenerator.useBlurExponentialShadowMap = true;
    return shadowGenerator;
}

export function applyShadow(mesh){
    if(shadowGenerator) {
        shadowGenerator.getShadowMap().renderList.push(mesh);
    }

}