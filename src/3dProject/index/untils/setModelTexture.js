import * as THREE from "three";
import InitInterface from "../initInterface";
import EmitBus from "@/untils/emitBus.js";

export default class SetModelTexture {
    constructor() {
        this.initInterface = new InitInterface();
        this.scene = this.initInterface.scene;
        this.resources = this.initInterface.resources;
        this.uveditCanvas = null;
        this.uveditCanvasContext2D = null;
        this.activeModel = null;
        this.uveditCanvasWH = {
            w: 0,
            h: 0
        }
    }

    setTexture(model) {
        const activeResource = this.resources.clickResources[model.name];
        this.uveditCanvas = document.getElementById("uveditCanvas");
        if(!this.uveditCanvas) return;
        this.uveditCanvasContext2D = this.uveditCanvas.getContext('2d');

        const uvtexture = document.createElement('img');
        uvtexture.crossOrigin = '';
        uvtexture.src = activeResource.uvtexture;
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
            texture.flipY = false;
            this.activeModel.material = new THREE.MeshStandardMaterial({map: texture});
        })
    }

    updete() {
        this.activeModel.material.map.needsUpdate = true;
    }
}