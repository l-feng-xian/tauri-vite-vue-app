import * as THREE from "three";
import InitInterface from "../initInterface";
import EmitBus from "@/untils/emitBus.js";

export default class SetModelTexture {
    constructor() {
        this.initInterface = new InitInterface();
        this.scene = this.initInterface.scene;
        this.uveditCanvas = null;
        this.uveditCanvasContext2D = null;
        this.activeModel = null;
        this.uveditCanvasWH = {
            w: 0,
            h: 0
        }
    }

    setTexture(model) {
        console.log(model, '----SetModelTexture-------');
        this.uveditCanvas = document.getElementById("uveditCanvas");
        if(!this.uveditCanvas) return;
        this.uveditCanvasContext2D = this.uveditCanvas.getContext('2d');

        const uvtexture = document.createElement('img');
        uvtexture.crossOrigin = '';
        uvtexture.src = model.uvtexture;
        uvtexture.addEventListener('load', () => {
            this.uveditCanvasWH.w = uvtexture.naturalWidth;
            this.uveditCanvasWH.h = uvtexture.naturalHeight;
            this.uveditCanvas.width = uvtexture.naturalWidth;
            this.uveditCanvas.height = uvtexture.naturalHeight;
            this.uveditCanvasContext2D.drawImage(uvtexture, 0, 0);
            this.uveditCanvas.style.width = uvtexture.naturalWidth;
            this.uveditCanvas.style.height = uvtexture.naturalHeight;
            this.uveditCanvas.parentNode.style.transform = `scale(${340 / uvtexture.naturalWidth})`;
            
            this.activeModel = this.scene.getObjectByName(model.name);
            const texture = new THREE.Texture(this.uveditCanvas, THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping);
            texture.needsUpdate = true;
            this.activeModel.material = new THREE.MeshBasicMaterial({map: texture});
        })
    }

    updete() {
        this.activeModel.material.map.needsUpdate = true;
        // console.log( this.activeModel.material.map.needsUpdate = true);
    }
}