import * as THREE from "three";
import Sizes from "./untils/sizes";
import Camera from "./untils/camera";
import Renderer from "./untils/renderer";
import Time from "./untils/time";
import AddModel from "./untils/addModel";
import resources from "./untils/resources";
import SetModelTexture from "./untils/setModelTexture";

export default class InitInterface {
    static instance;
    constructor(canvas) {
        if (InitInterface.instance) {
            return InitInterface.instance;
        }
        InitInterface.instance = this;

        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.sizes = new Sizes();
        this.resources = resources;
        this.camera = new Camera();
        this.setModelTexture = new SetModelTexture();
        this.addModel = new AddModel();
        this.renderer = new Renderer();
        this.time = new Time();
        
        this.sizes.on("resize", () =>{
            this.resize();
        });
        this.time.on("updated", () =>{
            this.updete()
        });
    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

    updete() {
        this.camera.updete();
        this.renderer.update();
    }
}