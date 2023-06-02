import * as THREE from "three";
import InitInterface from "../initInterface";
import GUI from "lil-gui";
import GASP from "gsap";
import router from "@/router";
import EmitBus from "@/untils/emitBus.js";

export default class AddModel {
    constructor() {
        this.initInterface = new InitInterface();
        this.canvas = this.initInterface.canvas;
        this.scene = this.initInterface.scene;
        this.camera = this.initInterface.camera;
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
        this.resources = this.initInterface.resources;
        this.gui = new GUI({ container: document.getElementById("g_ui") });
        this.cubep = {
            x: 4,
            y: 0.5,
            z: 0
        };
        this.activeModel = null;

        this.setModels();
    }

    setModels() {
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.2));

        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(10, 5, 0);
        dirLight.castShadow = true;
        dirLight.shadow.camera.near = 1;
        dirLight.shadow.camera.far = 20;
        // dirLight.shadow.camera.right = 1;
        // dirLight.shadow.camera.left = - 1;
        // dirLight.shadow.camera.top = 1;
        // dirLight.shadow.camera.bottom = - 1;
        // dirLight.shadow.mapSize.width = 1024;
        // dirLight.shadow.mapSize.height = 1024;
        this.scene.add(dirLight);
        // const helper = new THREE.CameraHelper(dirLight.shadow.camera);
        // this.scene.add(helper);

        this.cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0x00ffff }));
        this.cube.castShadow = true;
        this.cube.name = 'cube';
        this.cube.position.set(this.cubep.x, this.cubep.y, this.cubep.z);
        this.scene.add(this.cube);

        const ground = new THREE.Mesh(new THREE.BoxGeometry(10, 0.1, 10), new THREE.MeshStandardMaterial({ color: 0x00ffff }));
        ground.receiveShadow = true;
        ground.name = 'ground'
        this.scene.add(ground);

        // const axes = new THREE.AxesHelper(10);
        // this.scene.add(axes);
        // const gridHelper = new THREE.GridHelper(10, 10);
        // this.scene.add(gridHelper)

        this.gui.add(this.cubep, 'x', 0, 40).onChange(() => {
            this.cube.position.set(this.cubep.x, this.cubep.y, this.cubep.z);
        })
        this.gui.add(this.cubep, 'y', 0, 40).onChange(() => {
            this.cube.position.set(this.cubep.x, this.cubep.y, this.cubep.z);
        })
        this.gui.add(this.cubep, 'z', 0, 40).onChange(() => {
            this.cube.position.set(this.cubep.x, this.cubep.y, this.cubep.z);
        })

        this.canvas.addEventListener('mousedown', this.onPointerDown.bind(this));
    }

    onPointerDown(event) {
        let onPointerMove = this.onPointerMove.bind(this);
        this.canvas.addEventListener('mousemove', onPointerMove);
        document.addEventListener('mouseup', () => {
            if (onPointerMove) {
                this.canvas.removeEventListener('mousemove', onPointerMove);
                onPointerMove = null;
            }
        });
        if (this.activeModel) return;
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.pointer, this.camera.perspectiveCamera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, false);
        if (intersects.length > 0) {
            this.activeModel = this.resources.clickResources[intersects[0].object.name];

            if (intersects[0].object.name && this.activeModel) {
                EmitBus.emit("getActiveModel");
                router.push("uvEdit");
                this.activeModel.animation = true;
                GASP.to(this.camera.controls.target, {
                    x: intersects[0].object.position.x,
                    y: intersects[0].object.position.y,
                    z: intersects[0].object.position.z,
                    duration: 1, ease: 'power1.out'
                })
                GASP.to(this.camera.perspectiveCamera.position, {
                    x: intersects[0].object.position.x,
                    y: intersects[0].object.position.y + 4,
                    z: intersects[0].object.position.z + 6,
                    duration: 1, ease: 'power1.out'
                })
            }

        }
    }

    onPointerMove(event) {
        if (this.camera.controls && !this.camera.controls.enabled) {
            this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.pointer, this.camera.perspectiveCamera);
            const intersects = this.raycaster.intersectObjects(this.scene.children, false);
            if (intersects.length > 0) {
                const activeModel = this.activeModel;
                if (intersects[0].object.name === activeModel.name) {
                    const uv = intersects[0].uv;
                    intersects[0].object.material.map.transformUv(uv);
                    EmitBus.emit("drawModelTexture", uv);
                }
            }
        }
    }
}