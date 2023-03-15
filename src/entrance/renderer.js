import * as THREE from "three"
import Entrance from "./entrance.js";
import Status from "three/examples/jsm/libs/stats.module.js"

export default class Renderer {
    constructor() {
        this.entrance = new Entrance();
        this.sizes = this.entrance.sizes;
        this.scene = this.entrance.scene;
        this.canvas = this.entrance.canvas;
        this.camera = this.entrance.camera;
        this.status = new Status()

        this.setRenderer();
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });

        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRation);
        this.renderer.setClearColor("#eaccd4", 1)

        this.status.domElement.style.position = "fixed";
        this.status.domElement.style.left = "0px";
        this.status.domElement.style.top = "0px";
        document.body.appendChild(this.status.domElement)
    }

    resize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRation);
    }

    updated() {
        this.renderer.render(this.scene, this.camera.perspectiveCamera);
        this.status.update();
    }
}