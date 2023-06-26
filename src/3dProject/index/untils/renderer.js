import * as THREE from "three"
import InitInterface from "../initInterface";
import Status from "three/examples/jsm/libs/stats.module.js";

export default class Renderer {
    constructor() {
        this.initInterface = new InitInterface();
        this.sizes = this.initInterface.sizes;
        this.scene = this.initInterface.scene;
        this.canvas = this.initInterface.canvas;
        this.camera = this.initInterface.camera;
        this.status = new Status()

        this.setRenderer();
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            logarithmicDepthBuffer: true
        });
        this.renderer.useLegacyLights = true;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRation);
        this.renderer.setClearColor("#dab46d", 1)

        this.status.domElement.style.position = "fixed";
        this.status.domElement.style.left = "0px";
        this.status.domElement.style.top = "0px";
        document.body.appendChild(this.status.domElement);
    }

    resize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRation);
    }

    update() {
        this.renderer.render(this.scene, this.camera.perspectiveCamera);
        this.status.update();
    }
}