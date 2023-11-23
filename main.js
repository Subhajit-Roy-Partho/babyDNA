import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
// import { dropZone } from './functions/triggers';
import { Environment } from './functions/particles';
import { render } from "./functions/basic";
import { readSubho } from "./functions/file";
import { trigger } from './functions/triggers';

// Get the canvas element
const canvas = document.getElementById('canvas');

const engine = new BABYLON.Engine(canvas, true);
export var scene = new BABYLON.Scene(engine);
export var environment = new Environment();
//add a vr camera
// const vrCamera = new BABYLON.WebVRFreeCamera("vrCamera", new BABYLON.Vector3(0, 1.6, 0), scene);


// Add a camera
const camera = new FreeCamera("freeCamera", new BABYLON.Vector3(0,0,0), scene);
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
// const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2}, scene);

// BABYLON.WebXRDefaultExperience.CreateAsync(scene).then((xrExperience) => {
//   // Switch to the WebXR camera
//   scene.activeCamera = xrExperience.baseExperience.camera;

//   // Dispose of the initial ArcRotateCamera
//   camera.dispose();
// });


// Render loop
engine.runRenderLoop(() => {
  scene.render();
});

// Resize the engine on window resize
window.addEventListener('resize', function() {
  engine.resize();
});

// Drop Listner DOM

// document.addEventListener('DOMContentLoaded',()=>{
//   dropZone();
// })

window.addEventListener('dragover',(event)=>{
  // event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect='copy';
});

window.addEventListener('drop',(event)=>{
  event.stopPropagation();
  event.preventDefault();
  
  const files=event.dataTransfer.files;
  console.log("Total Number of files received = ",files.length);

  for(let i=0;i<files.length;i++){
      let name= files[i].name;
      name = name.split(".");
      if(name[name.length-1]=="top"){
          readSubho(files[i]);
      }
  }
  for(let i=0;i<files.length;i++){
      let name= files[i].name;
      name = name.split(".");
      if(name[name.length-1]=="dat"){
          readSubho(files[i],"dat");
      }
  }
  render();

});

export default {scene,environment};