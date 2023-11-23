import { Vector3 } from "@babylonjs/core";
import { environment } from "../main";


export function readSubho(file = new FileList(),type="top"){
    const reader = new FileReader();
    reader.onload=(e)=>{
        var lines = e.target.result;
        lines = lines.split(/\r\n|\n/);
        var j=0;
        for (let i = 0; i < lines.length; i++) {
            if(lines[i].trim()=='') continue;
            let words = lines[i].split(" ");
            if(words[0].includes("#")) continue;
            if(words[0].includes('i')) continue;
            if(type==="top"){
                if(i==0){
                    environment.totPar=Number(words[0]);
                    environment.strands=Number(words[1]);
                    environment.createParticles();
                    environment.read=true;
                    continue;
                }
                environment.particles[j].cloneTop(Number(words[1]),Number(words[3]),Number(words[2]));
                j++;
            }
            if(type=="dat"){
                if(i==0)environment.t=words[2];
                if(i==1)environment.box.set(Number(words[2]),Number(words[3]),Number(words[4]));
                if(i==2)environment.energy.set(Number(words[2]),Number(words[3]),Number(words[4]));
                if(i>2){
                    environment.particles[j].r.set(Number(words[0]),Number(words[1]),Number(words[2]));
                    environment.particles[j].a1.set(Number(words[3]),Number(words[4]),Number(words[5]));
                    environment.particles[j].a3.set(Number(words[6]),Number(words[7]),Number(words[8]));
                    j++;
                }
            }
        }
    }


    reader.readAsText(file);
    return environment;
}