import { Vector3,Color3 } from "@babylonjs/core";
import { sphereCreator,colorProfiler } from "./basic";
// import { scene } from "../main";

export class BaseParticle{
    sphere=[];
    constructor(strand=0,radius=1,color=0,realColor=Color3.White(),r=Vector3.Zero(),a1=Vector3.Zero(),a3=Vector3.Zero()){
        this.strand=strand;
        this.radius=radius;
        this.color=color;
        this.realColor=realColor;
        this.r=r;
        this.a1=a1;
        this.a3=a3;
        if(color!==0 && realColor=== Color3.White()) realColor= colorProfiler(color);
    }

    cloneTop(strand,radius,color){
        this.strand=strand;
        this.radius=radius;
        this.color=color;
    }
    cloneTraj(r,a1,a3){
        this.r=r;
        this.a1=a1;
        this.a3=a3;
    }
}

export class Environment{
    particles=[]; // This stores all the particles
    read=false;
    t=0;
    box=Vector3.Zero();
    energy=Vector3.Zero();

    constructor(totPar=0,strands=0){
        this.totPar=totPar;
        this.strands=strands;
    }

    createParticles(){
        for(let i=0;i<this.totPar;i++){
            this.particles[i]=new BaseParticle();
        }
    }
}