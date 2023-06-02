import * as THREE from "three"
import InitInterface from "../initInterface";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GASP from "gsap"

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
        this.perspectiveCamera.position.set(0, 10, 16);
        this.scene.add(this.perspectiveCamera);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
        // controls.minDistance = 1;
        // controls.maxDistance = 25;
    }

    resetControls() {
        GASP.to(this.controls.target, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1, ease: 'power1.out'
        })
        GASP.to(this.perspectiveCamera.position, {
            x: 0,
            y: 10,
            z: 16,
            duration: 1, ease: 'power1.out'
        })
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