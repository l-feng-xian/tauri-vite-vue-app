import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { AmmoPhysics } from 'three/examples/jsm/physics/AmmoPhysics.js';

export default class Entrance {
    static instance
    constructor(canvas) {
        if (Entrance.instance) {
            return Entrance.instance;
        }
        Entrance.instance = this;

        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.gui = new GUI({ container: document.getElementById("g_ui") });
        this.loopPosition = {
            x: 0,
            y: 0,
            z: 0
        }
        this.set();
        
        this.setPhysics()
    }
    async setPhysics() {
        // Ammo().then((ammo) =>{
        //     console.log(ammo);
        // })
        this.physics = await AmmoPhysics();


        const floorGeometry = new THREE.BoxGeometry(20, 1, 20);
        const floorMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.receiveShadow = true;
        this.scene.add(floor);
        this.physics.addMesh(floor);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.y = 4
        cube.castShadow = true;
        this.scene.add(cube);

        this.physics.addMesh( cube, 1);

        const floor2 = new THREE.Mesh(floorGeometry, floorMaterial);
        floor2.position.set(0, 0, -5);
        floor2.rotation.set(-160, 0, 0);
        floor2.castShadow = true;
        this.scene.add(floor2);

        this.physics.addMesh( floor2);
        console.log(this.physics);
        
    }

    set() {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        this.camera.position.set(this.loopPosition.x, this.loopPosition.y + 4.5, this.loopPosition.z + 20);
        this.camera.aspect = window.innerWidth / window.innerHeight;

        this.gui.add(this.loopPosition, 'x', 0, 40).onChange(() =>{
            this.camera.position.set(this.loopPosition.x, this.loopPosition.y, this.loopPosition.z);
        })
        this.gui.add(this.loopPosition, 'y', 0, 40).onChange(() =>{
            this.camera.position.set(this.loopPosition.x, this.loopPosition.y, this.loopPosition.z);
        })
        this.gui.add(this.loopPosition, 'z', 0, 40).onChange(() =>{
            this.camera.position.set(this.loopPosition.x, this.loopPosition.y, this.loopPosition.z);
        })

        const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(10, 10, 0);
        const d = 5;
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.left = - d;
        directionalLight.shadow.camera.right = d;
        directionalLight.shadow.camera.top = d;
        directionalLight.shadow.camera.bottom = - d;
        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 20;
        directionalLight.shadow.mapSize.x = 1024;
        directionalLight.shadow.mapSize.y = 1024;
        this.scene.add(directionalLight);
        const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
        this.scene.add(helper);


        const controls = new OrbitControls(this.camera, this.canvas);
        controls.minDistance = 1;
        controls.maxDistance = 25;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.render();
    }

    updated() {

    }

    render() {
        window.requestAnimationFrame(() => {
            this.render()
        })
        this.renderer.render(this.scene, this.camera);
    }
}