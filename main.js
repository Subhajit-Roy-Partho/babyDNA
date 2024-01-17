particles=[];
color=[];
radius=[];
strand=[];
box=[10,10,10];
// dict={r:BABYLON.Vector3.Zero(),radius:-1,color:BABYLON.Color3.White(),strand:-1};
// dict=[];

function inboxing(x,y,z){
    x =x%box[0];
    if(x<0){
        x+=box[0];
    }
    y=y%box[1];
    if(y<0){
        y+=box[1];
    }
    z=z%box[2];
    if(z<0){
        z+=box[2];
    }
    return [x,y,z];
}

function generateRandomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
}

function onDragOverHandler(env){
    // console.log("Detected on drag over");
    env.preventDefault();
}

async function CreateSphere(x,y,z,radius=1,color=BABYLON.Color3.Red(),segments=4){
    let diameter=2*radius;
    let name = generateRandomString(5);
    var sphere= BABYLON.MeshBuilder.CreateSphere(name, {diameter: diameter, segments: segments}, scene);
    sphere.position.x=x;
    sphere.position.y=y;
    sphere.position.z=z;
    const sphereMaterial = new BABYLON.StandardMaterial("Sphere Material", scene);
    sphereMaterial.diffuseColor = color;
    sphere.material = sphereMaterial;
}

function colorFromInteger(color){
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
        case 0:
            color=BABYLON.Color3.Brown();
        case 100:
            color=BABYLON.Color3.White();
        default:
            break;
    }
    return color;
}


function dropHandler(env){
    // console.log("Detected a file drop");
    // scene=createScene();
    if(env.dataTransfer.items){
        [...env.dataTransfer.items].forEach((item,i)=>{
            if(item.kind === "file"){
                const file = item.getAsFile();
                let name = file.name;
                if(name.split(".")[1]=="top"){
                    reader = new FileReader();
                    reader.onload=function(event){
                        let fileContentArray= this.result.split(/\r\n|\n/);
                        j=0;
                        for(let i=1;i<fileContentArray.length;i++){
                            words = fileContentArray[i].split(" ");
                            if(words[0].includes("#")||words.includes("#")) continue;
                            console.log("Math"+Math.random());
                            strand[j]=words[1];
                            color[j]=colorFromInteger(words[2]);
                            radius[j]=words[3];
                            dict=[BABYLON.Vector3.Zero(),words[3],colorFromInteger(words[2]),words[1]];
                            particles[j]=dict;
                            j+=1;
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
                    reader=new FileReader();
                    reader.onload=function(event2){
                        let fileContentArray2= this.result.split(/\r\n|\n/);
                        let j=0;
                        for(let i=0;i<fileContentArray2.length;i++){
                            words = fileContentArray2[i].split(" ");
                            if(words[0].includes('b')){
                                box[0]=Number(words[2]);box[1]=Number(words[3]);box[2]=Number(words[4]);
                                camera.position.set(Number(words[2])/3.0,Number(words[3])/3.0,-Number(words[4]));
                            };
                            if(words[0].includes("#")||words[0].includes("t")||words[0].includes("b")||words[0].includes("E")){
                                continue;
                            };
                            // particles[j][0]=new BABYLON.Vector3(Number(words[0]),Number(words[1]),Number(words[2]));
                            inboxedDim = inboxing(Number(words[0]),Number(words[1]),Number(words[2]))
                            CreateSphere(inboxedDim[0],inboxedDim[1],inboxedDim[2],radius[j],color[j]);
                            j+=1;
                        }
                    }
                    reader.readAsText(file);
                    // for(let i=0;i<Par.totalparticles();i++){
                    //     CreateSphere(Par.getProperties(i));
                    // }
                }
            }
        });
    }
    env.preventDefault();
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
var camera=null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };

//main scene function0
var createScene = function () {
    scene= new BABYLON.Scene(engine);
    scene.clearColor= BABYLON.Color3.Gray();
    camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);//placed a camera

    camera.setTarget(BABYLON.Vector3.Zero());// Position the camera to 0
    camera.attachControl(canvas, true); // Camera control to the canvas
    camera.invertRotation=true;
    camera.speed=7;
    // camera.cameraAcceleration = 0.005
    camera.maxCameraSpeed = 20;
    
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