"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const babylonjs_1 = require("babylonjs");
const canvas = document.getElementById('canvas');
const engine = new babylonjs_1.Engine(canvas, true);
const createScene = () => {
    const scene = new babylonjs_1.Scene(engine);
    const camera = new babylonjs_1.ArcRotateCamera('camera1', Math.PI / 2, Math.PI / 2, 10, babylonjs_1.Vector3.Zero(), scene);
    camera.attachControl(canvas, false);
    new babylonjs_1.HemisphericLight('light1', new babylonjs_1.Vector3(0, 1, 0), scene);
    babylonjs_1.MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 2 }, scene);
    return scene;
};
const scene = createScene();
engine.runRenderLoop(() => {
    scene.render();
});
window.addEventListener('resize', () => {
    engine.resize();
});
