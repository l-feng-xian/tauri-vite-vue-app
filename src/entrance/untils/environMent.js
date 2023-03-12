import * as THREE from "three"
import Entrance from "../entrance.js";

import GUI from "lil-gui"

export default class EnvironMent {
    constructor() {
        this.entrance = new Entrance();
        this.scene = this.entrance.scene;
        this.resources = this.entrance.recources;
        this.gui = new GUI({container: document.getElementById("g_ui")});
        this.obj = {
            colorObj: {r:0, g: 0, b: 0},
            intensity: 3
        };
        this.thremeButton = document.getElementById("threm_chackbox")

        this.setSunLight();
        this.setGui();
        this.setTheme()
    }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 2);
        // this.sunLight.castShadow = true; //投射动态阴影
        // this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(1024, 1024);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(10, 7, 1);
        this.scene.add(this.sunLight)

        this.wordlight = new THREE.AmbientLight("#ffffff", 1);
        this.scene.add(this.wordlight);

        // const helper = new THREE.DirectionalLightHelper(this.sunLight, 5);
        // this.scene.add(helper);

    }

    setGui() {
        this.gui.addColor(this.obj, "colorObj").onChange(() =>{
            this.sunLight.color.copy(this.obj.colorObj);
            this.wordlight.color.copy(this.obj.colorObj);
            console.log(this.resources.renderer.renderer);
            this.resources.renderer.renderer.setClearColor(`rgb(${this.obj.colorObj.r*255}, ${this.obj.colorObj.g*255}, ${this.obj.colorObj.b*255})`)
        })
        this.gui.add(this.obj, "intensity", 0, 10).onChange(() =>{
            this.sunLight.intensity = this.obj.intensity;
            this.wordlight.intensity = this.obj.intensity;
        })
    }

    setTheme() {
        this.thremeButton.addEventListener("change", (e) =>{
            // console.log(e.target.checked);
            document.body.classList.toggle("dark-theme");
        })
    }

    resize() {
    }

    updated() {
    }
}