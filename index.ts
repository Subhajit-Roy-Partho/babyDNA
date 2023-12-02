import { Engine, Scene, ArcRotateCamera, HemisphericLight, MeshBuilder, Vector3 } from 'babylonjs';


const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const engine = new Engine(canvas, true);
const createScene = (): Scene => {
    const scene = new Scene(engine);
    const camera = new ArcRotateCamera('camera1', Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), scene);
    camera.attachControl(canvas, false);
    new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
    MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 2 }, scene);

    return scene;
};
const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});
window.addEventListener('resize', () => {
    engine.resize();
});
