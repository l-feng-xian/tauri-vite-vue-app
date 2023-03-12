import * as THREE from "three"
import Entrance from "./entrance.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

export default class Camera {
    constructor() {
        this.entrance = new Entrance();
        this.sizes = this.entrance.sizes;
        this.scene = this.entrance.scene;
        this.canvas = this.entrance.canvas;

        this.createPerspectiveCamera(); //透视相机
        this.createOrthographicCamera(); //正交相机
        this.setOrbitControls();
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.1, 1000);
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.z = 30
        this.perspectiveCamera.position.x = 10
        this.perspectiveCamera.position.y = 10
    }

    createOrthographicCamera() {
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -100,
            100
        );
        this.scene.add(this.orthographicCamera);

        const axes = new THREE.AxesHelper(10);
        this.scene.add(axes)
        
        const size = 10;
        const divisions = 10;
        const gridHelper = new THREE.GridHelper(size, divisions);
        this.scene.add(gridHelper)
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
    }

    resize() {
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum)/2
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum)/2
        this.orthographicCamera.top = this.sizes.frustrum/2
        this.orthographicCamera.bottom = -this.sizes.frustrum/2
        this.orthographicCamera.updateProjectionMatrix()
    }

    updete() {
        this.controls.update()
    }
}