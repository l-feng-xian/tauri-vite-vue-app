import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { EventEmitter } from "events";
import Entrance from "../entrance.js";

export default class Recources extends EventEmitter {
    constructor(assets) {
        super();
        this.entrance = new Entrance();
        this.renderer = this.entrance.renderer;

        this.assets = assets;

        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader();
    }

    startLoading() {
        for (const assets of this.assets) {
            if(assets.type === "gltfModel") {
                this.loaders.gltfLoader.load(assets.path, (file) =>{
                    this.singleAssetLoaded(assets, file);
                })
            }
        }
    }

    singleAssetLoaded(assets, file) {
        this.items[assets.name] = file;
        this.loaded ++;
        if(this.loaded === this.queue) {
            this.emit("ready")
            console.log(this.items, 'ready');
        }
    }
}