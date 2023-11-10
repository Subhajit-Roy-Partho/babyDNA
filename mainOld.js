Particles=[]


function CreateSphere(scene,r,diameter,color,segments=2){
    var sphere= BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: diameter, segments: segments}, scene);
    sphere.position.clone(r);
    const sphereMaterial = new BABYLON.StandardMaterial("Sphere Material", scene);
    sphereMaterial.diffuseColor = color;
    sphere.material = sphereMaterial;
}
class Particle{
    radius;
    color;
    strand;
    r;
    constructor(radius,color,strand){
        this.radius=radius;
        this.color=color;
        this.strand=strand;
        this.r=new BABYLON.Vector3.Zero();
    }
}

class Particles{
    particles=[];
    constructor(){
        this.particles=[]
    }
    newParticle(strand=0,color=20,radius=2){
        if(!color.includes("#")){
            switch(Number(color)){
                case 20:
                    color=BABYLON.Color3.Red();
                    break;
                case -20:
                    color=BABYLON.Color3.Red();
                    break;
                case 25:
                    color=BABYLON.Color3.Blue();
                    break;
                case -25:
                    color=BABYLON.Color3.Blue();
                    break;
                case 30:
                    color=BABYLON.Color3.Yellow();
                    break;
                case -30:
                    color=BABYLON.Color3.Yellow();
                    break;
                case 35:
                    color=BABYLON.Color3.Green();
                    break;
                case -35:
                    color=BABYLON.Color3.Green();
                    break;
                case 40:
                    color=BABYLON.Color3.Purple();
                    break;
                case -40:
                    color=BABYLON.Color3.Purple();
                    break;
                default:
                    break;
            }
        }
        // console.log(color);
        let p = new Particle(radius,color,strand);
        this.particles.push(p);
        return p;
    }

    totalParticles(){
        return this.particles.length;
    }
    getProperties(index){
        return this.particles[index].getProperties();
    }
}

function dropHandler(env){
    // console.log("Detected a file drop");
    scene=createScene();
    if(env.dataTransfer.items){
        [...env.dataTransfer.items].forEach((item,i)=>{
            if(item.kind === "file"){
                const file = item.getAsFile();
                let name = file.name;
                // console.log(name.split("."));
                if(name.split(".")[1]=="top"){
                    reader = new FileReader();
                    reader.onload=function(event){
                        let fileContentArray= this.result.split(/\r\n|\n/);
                        for(let i=1;i<fileContentArray.length;i++){
                            words = fileContentArray[i].split(" ");
                            if(words[0].includes("#")) continue;
                            dict={r:BABYLON.Vector3.Zero()};
                            Par.newParticle(words[1],words[2],words[3]);
                        }
                    }
                    reader.readAsText(file);
                };
            }
        });

        [...env.dataTransfer.items].forEach((item,i)=>{
            if(item.kind==="file"){
                const file = item.getAsFile();let name = file.name;
                if(name.split(".")[1]=="dat"){
                    console.log(Par.particles);
                    reader=new FileReader();
                    reader.onload=function(event2){
                        let fileContentArray2= this.result.split(/\r\n|\n/);
                        let j=0;
                        for(let i=1;i<fileContentArray2.length;i++){
                            words = fileContentArray2[i].split(" ");
                            if(words[0].includes("#")||words[0].includes("t")||words[0].includes("b")||words[0].includes("E")){
                                continue;
                            };
                            Par.particles[j].r.set(Number(words[0]),Number(words[1]),Number(words[2]));

                            j++;
                        }
                    }
                    reader.readAsText(file);
                    // for(let i=0;i<Par.totalParticles();i++){
                    //     CreateSphere(Par.getProperties(i));
                    // }
                }
            }
        });
    }
    env.preventDefault();
}

function onDragOverHandler(env){
    // console.log("Detected on drag over");
    env.preventDefault();
}

function Draw(){
    // let scene=createScene();
    for(let i=0;i<Par.totalParticles();i++){
        CreateSphere();

    }
}

// Good variables

Par= new Particles();


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
    light.intensity = 5; // Default intensity is 1. Let's dim the light a small amount
    
    // var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 4}, scene);//Draw a shpere
    // sphere.position.y = 1;//Move the sphere up

    // var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);//Draw a ground

    // All common variables

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
});