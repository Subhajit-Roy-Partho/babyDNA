function CreateSphere(r,diameter=2,color="red",segments=2){
    var sphere= BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: diameter, segments: segments}, scene);
    sphere.position.set(r[0],r[1],r[2]);
    const sphereMaterial = new BABYLON.StandardMaterial("Sphere Material", scene);
    sphereMaterial.diffuseColor = BABYLON.Color3.Red();
    sphere.material = sphereMaterial;
}

var canvas = document.getElementById("renderCanvas");//obtain the canvas from HTML

//Render loop
var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };

//main scene function0
var createScene = function () {
    var scene = new BABYLON.Scene(engine);//Scene starting point
    
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);//placed a camera
    camera.setTarget(BABYLON.Vector3.Zero());// Position the camera to 0
    camera.attachControl(canvas, true); // Camera control to the canvas
    camera.invertRotation=true;
    
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);//light, aiming 0,1,0 - to the sky (non-mesh)
    light.intensity = 0.7; // Default intensity is 1. Let's dim the light a small amount
    
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 4}, scene);//Draw a shpere
    sphere.position.y = 1;//Move the sphere up

    // var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);//Draw a ground

    return scene;
};

//all the async calls
window.initFunction = async function() {
    
    
    
    var asyncEngineCreation = async function() {
        try {
        return createDefaultEngine();
        } catch(e) {
        console.log("the available createEngine function failed. Creating the default engine instead");
        return createDefaultEngine();
        }
    }

    window.engine = await asyncEngineCreation();
    if (!engine) throw 'engine should not be null.';
    startRenderLoop(engine, canvas);
    window.scene = createScene();
};
initFunction().then(() => {sceneToRender = scene});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});4