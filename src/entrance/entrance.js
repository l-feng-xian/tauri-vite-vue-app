import * as THREE from "three";

import Sizes from "./untils/sizes.js";
import Time from "./untils/time.js";
import Recources from "./untils/resources.js";
import assets from "./untils/assets.js";

import Camera from "./camera.js";
import Renderer from "./renderer.js";

import World from "./untils/world.js";

export default class Entrance {
    static instance
    constructor(canvas) {
        if(Entrance.instance) {
            return Entrance.instance;
        }
        Entrance.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene()
        this.sizes = new Sizes();
        this.time = new Time();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.recources = new Recources(assets);
        this.World = new World();

        this.sizes.on("resize", () =>{
            this.resize()
        })

        this.time.on("updated", () =>{
            this.updete()
        })
        
    }

    resize() {
        this.camera.resize();
        this.renderer.resize()
    }

    updete() {
        this.camera.updete();
        this.World.updated()
        this.renderer.updated()
    }
    
}