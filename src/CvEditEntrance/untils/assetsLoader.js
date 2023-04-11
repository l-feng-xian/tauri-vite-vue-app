import { Assets, Sprite } from "pixi.js"
import CanvasEditInit from "../CanvasEditInit.js"

export default class AssetsLoader {
    constructor() {
        this.assetsFile = {};
        this.canvasEditInit = new CanvasEditInit();
        this.appStage = this.canvasEditInit.app.stage

        this.loaders();
    }

    async loaders() {
        const fd = await Assets.load("/image/fd.png");
        // const fd = await Assets.load("/棱角球花贴图.png")
        this.assetsFile['fd'] = fd

        const character = new Sprite(fd);
        character.anchor.set(0.5);
        character.x = 0;
        character.y = 0;
        character.eventMode = 'dynamic';
        character.cursor = 'ne-resize';
    
        this.appStage.addChild(character);

        // console.log(character);
    }
}