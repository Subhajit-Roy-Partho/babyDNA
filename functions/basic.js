import { Vector3,CreateSphere, Color3, StandardMaterial } from "@babylonjs/core";
import { environment, scene } from "../main";
export function inboxing(r=Vector3.Zero(),box=Vector3.Zero()){
    r._x=r._x%box._x;
    r._y=r._y%box._y;
    r._z=r._z%box._z;
    if(r._x<0) r._x+=box._x;
    if(r._y<0) r._y+=box._y;
    if(r._z<0) r._z+=box._z;
}

export async function sphereCreator(r=Vector3.Zero(),radius=1,color=Color3.Red(),segments=4){
    var sphere=new CreateSphere("sphere", {diameter: radius*2, segments: segments}, scene);
    sphere.position.clone(r);
    const sphereMaterial = new StandardMaterial("Sphere Material", scene);
    sphereMaterial.diffuseColor = color;
    sphere.material = sphereMaterial;
    console.log("called");
    return sphere;
}

export async function render(){
    environment.particles.forEach(particle=>{
        console.log(particle);
    })
}















export function colorProfiler(color=0){
    switch(Number(color)){
        case 20:
            color=new Color3.Red();
            break;
        case -20:
            color=new Color3.Red();
            break;
        case 25:
            color=new Color3.Blue();
            break;
        case -25:
            color=new Color3.Blue();
            break;
        case 30:
            color=new Color3.Yellow();
            break;
        case -30:
            color=new Color3.Yellow();
            break;
        case 35:
            color=new Color3.Green();
            break;
        case -35:
            color=new Color3.Green();
            break;
        case 40:
            color=new Color3.Purple();
            break;
        case -40:
            color=new Color3.Purple();
            break;
        case 0:
            color=new Color3.White();

        case 100:
            color=new Color3(87,118,121);
        default:
            color=new Color3.Random();
            break;
    }
    return color;
}