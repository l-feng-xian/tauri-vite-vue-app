import * as THREE from "three"
import InitInterface from "../initInterface";
import GUI from "lil-gui";
import GASP from "gsap";

export default class AddModel {
    constructor() {
        this.initInterface = new InitInterface();
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
        this._xCross = 0;
        this._yCross = 0;
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
        // this.setCanvas();

        this.cubeTexture = new THREE.Texture(undefined, THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping);
        this.cubeTexture.colorSpace = THREE.SRGBColorSpace;
        // this.__pcanvas = new CanvasTexture(this.cubeTexture);
        const cubeMaterial = new THREE.MeshBasicMaterial({ map: this.cubeTexture });
        this.cubeBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
        let uvs = this.cubeBoxGeometry.attributes.uv.array;
        // Set a specific texture mapping.
        // for (let i = 0; i < uvs.length; i++) {

        //     uvs[i] *= 2;

        // }
        this.cube = new THREE.Mesh(this.cubeBoxGeometry, cubeMaterial);
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

        document.addEventListener('mousedown', this.onPointerDown.bind(this));
    }

    setCanvas() {
        this._canvas = document.createElement('canvas');
        this._canvas.width = this._canvas.height = 1024;
        this._context2D = this._canvas.getContext('2d');
        this._canvas.style.transform = 'scale(0.5)'
        this._canvas.style.position = 'fixed';
        this._canvas.style.bottom = '-25%';
        this._canvas.style.left = '-25%';

        document.body.appendChild(this._canvas)

        const bgimg = document.createElement('img');
        bgimg.crossOrigin = '';
        bgimg.src = './uv_grid_opengl.jpg';
        bgimg.addEventListener('load', () => {
            console.log('img----load');
            this._canvas.width = bgimg.naturalWidth;
            this._canvas.height = bgimg.naturalHeight;
            this._context2D.drawImage(bgimg, 0, 0);

            this.cubeTexture.image = this._canvas;
            this.cubeTexture.needsUpdate = true;
        })
    }

    onPointerDown(event) {
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.pointer, this.camera.perspectiveCamera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, false);
        if (intersects.length > 0) {
            const model = this.resources.clickResources.find(f => f.name === intersects[0].object.name)
            if (intersects[0].object.name && model) {
                // const uv = intersects[0].uv;
                // intersects[0].object.material.map.transformUv(uv);
                // this.setCrossPosition( uv.x, uv.y );
                // console.log(uv);
                // return;
                console.log(model, intersects[0], intersects[0].object.position, this.camera);


                if (!model.animation) {
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
                    this.resources.clickResources.map(m => {
                        if (m.name === model.name) {
                            m.animation = true
                        }
                    })
                }
            }

        }
    }

    setCrossPosition(x,y) {

        this._xCross = x * this._canvas.width;
        this._yCross = y * this._canvas.height;

        console.log(this._xCross, this._yCross, 'setCrossPosition');

        this._context2D.fillStyle = "rgba(0,0,0)"

        this._context2D.rect(this._xCross,this._yCross,30,30);
        this._context2D.fill();
        this.cubeTexture.needsUpdate = true;
    }
}