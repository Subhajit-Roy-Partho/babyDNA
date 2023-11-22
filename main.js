import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';

// Get the canvas element
const canvas = document.getElementById('canvas');

// Create a Babylon.js engine
const engine = new BABYLON.Engine(canvas, true);

// Create a scene
const scene = new BABYLON.Scene(engine);

//add a vr camera
// const vrCamera = new BABYLON.WebVRFreeCamera("vrCamera", new BABYLON.Vector3(0, 1.6, 0), scene);


// Add a camera
const camera = new FreeCamera("freeCamera", new BABYLON.Vector3(0, 5, -10), scene);
camera.attachControl(canvas, true);
camera.invertRotation=true;
camera.speed=5;

// Set the control keys
camera.keysUp.push(87);    // W
camera.keysDown.push(83);  // S
camera.keysLeft.push(65);  // A
camera.keysRight.push(68); // D

// scene.activeCamera = camera; //set vr to be active camera



// Add a light
const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

// Add a sphere
const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2}, scene);

// Render loop
engine.runRenderLoop(() => {
  scene.render();
});

// Resize the engine on window resize
window.addEventListener('resize', function() {
  engine.resize();
});
