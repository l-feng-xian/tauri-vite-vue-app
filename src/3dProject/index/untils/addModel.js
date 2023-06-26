import * as THREE from "three";
import InitInterface from "../initInterface";
// import GUI from "lil-gui";
import GASP from "gsap";
import router from "@/router";
import EmitBus from "@/untils/emitBus.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class AddModel {
    constructor() {
        this.initInterface = new InitInterface();
        this.canvas = this.initInterface.canvas;
        this.scene = this.initInterface.scene;
        this.camera = this.initInterface.camera;
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
        this.resources = this.initInterface.resources;
        // this.gui = new GUI({ container: document.getElementById("g_ui") });
        this.activeModel = null;
        this.loaded = 0;
        this.items = {};
        this.mixer = null;
        this.actions = {};

        // this.setModels();
        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader();
    }

    startLoading() {
        this.scene.add(new THREE.AmbientLight("#ffffff", 1));

        this.sunLight = new THREE.DirectionalLight("#ffffff", 1);
        this.scene.add(this.sunLight);
        for (const assets of this.resources.loadResources) {
            if (assets.type === "gltf") {
                this.loaders.gltfLoader.load(assets.path, (file) => {
                    file.scene.scale.set(0.5, 0.5, 0.5);
                    file.scene.name = assets.name;
                    this.scene.add(file.scene);
                    this.singleAssetLoaded(assets, file);
                }, (xhr) => {
                    EmitBus.emit("singleAssetLoadedEmit", (xhr.loaded / xhr.total) * 100)
                })
            }
        }
    }

    singleAssetLoaded(assets, file) {
        this.items[assets.name] = file;
        this.loaded++;
        if (this.loaded === this.resources.loadResources.length) {
            this.createdAnimation();
        }
    }

    createdAnimation() {
        for (let i = 0; i < this.scene.children.length; i++) {
            if (this.scene.children[i].name === "InitialIsland") {
                GASP.to(this.scene.children[i].scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 1, ease: 'power1.out'
                })
                GASP.to(this.scene.children[i].rotation, {
                    y: Math.PI * 2,
                    duration: 1, ease: 'power1.out'
                })
                return;
            }
        }
    }

    setAnimation(file) {
        this.mixer = new THREE.AnimationMixer(file.scene);
        for (var i = 0; i < file.animations.length; i++) {
            this.actions[file.animations[i].name] = this.mixer.clipAction(file.animations[i]);
        }
    }

    setModels() {
        const mashs = this.items['InitialIsland'].scene.children
        for (let i = 0; i < mashs.length; i++) {
            if (mashs[i].name === "画板") {
                this.activeModel = mashs[i];
                EmitBus.emit("getActiveModel");
                router.push("uvEdit");
                document.addEventListener('mousedown', this.canvasMousemove.bind(this))
                return;
            }

        }
    }

    canvasMousemove() {
        let onPointerMove = this.onPointerMove.bind(this);
        this.canvas.addEventListener('mousemove', onPointerMove);
        document.addEventListener('mouseup', () => {
            if (onPointerMove) {
                this.canvas.removeEventListener('mousemove', onPointerMove);
                onPointerMove = null;
            }
        });
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
            const intersects = this.raycaster.intersectObjects(this.scene.children, true);
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

    update(delta) {
        if (this.mixer) {
            this.mixer.update(delta);
        }
    }
}