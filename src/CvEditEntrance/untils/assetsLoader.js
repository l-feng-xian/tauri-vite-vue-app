import { Assets, Sprite } from "pixi.js"
import CanvasEditInit from "../CanvasEditInit.js"
import { EventEmitter } from "events";

export default class AssetsLoader extends EventEmitter {
    constructor() {
        super();
        this.assetsFile = {};
        this.canvasEditInit = new CanvasEditInit();
        this.appStage = this.canvasEditInit.app.stage

        this.loaders();
    }

    async loaders() {
        // const fd = await Assets.load("/image/fd.png");
        const fd = await Assets.load("/棱角球花贴图.png")
        this.assetsFile['fd'] = fd;
        this.emit("loadersOver", this.assetsFile)
    }
}