import * as THREE from "three"
import InitInterface from "../initInterface";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
    constructor() {
        this.initInterface = new InitInterface();
        this.sizes = this.initInterface.sizes;
        this.scene = this.initInterface.scene;
        this.canvas = this.initInterface.canvas;

        this.createPerspectiveCamera(); //透视相机
        this.setOrbitControls();
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.1, 1000);
        this.perspectiveCamera.position.set(10, 10, 18);
        this.scene.add(this.perspectiveCamera);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
        this.controls.minDistance = 1;
        this.controls.maxDistance = 25;
    }

    setControlsLock(viewLock) {
        if(viewLock) {
            this.controls.enabled = true
        } else {
            this.controls.enabled = false
        }
    }

    resize() {
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();
    }

    updete() {
        this.controls.update()
    }
}