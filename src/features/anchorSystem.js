import { WebXRAnchorSystem, PointerEventTypes } from 'babylonjs';
import { getLastHit } from "./hitTest.js";
import { createShpere } from "../tools.js";
import { applyShadow } from './shadows.js';

let enabled = false;
export function enableAnchorSystem(fm, scene) {
    try {
        const anchorSystem = fm.enableFeature(WebXRAnchorSystem, "latest");

        anchorSystem.onAnchorAddedObservable.add(anchor => {
            const sphere = createShpere(scene, {diameter: .06});
            applyShadow(sphere);
            anchor.attachedNode = sphere;
        });
        enabled = true;

        scene.onPointerObservable.add(event => {
            const lastHit = getLastHit();
            if(lastHit && anchorSystem) anchorSystem.addAnchorPointUsingHitTestResultAsync(lastHit);        
        }, PointerEventTypes.POINTERDOWN);

        return anchorSystem;
    }
    catch (error) {
        console.error(error);
        enabled = false;
        return error;
    }
}