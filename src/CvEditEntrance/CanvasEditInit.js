import { Application } from "pixi.js";

// import Rectangle from "./geometrys/rectangle.js"
import AssetsLoader from "./untils/AssetsLoader.js"

export default class CanvasEditInit {
    static instance;
    constructor(options) {
        if(CanvasEditInit.instance) {
            return CanvasEditInit.instance;
        }
        CanvasEditInit.instance = this;
        this.options = options;
        // this.treeModel = options.treeModel;
        this.app = this.setCanvas();
        this.assetsLoader = new AssetsLoader();

        // this.rectangle = new Rectangle()

        this.updataSize()
        
    }

    setCanvas() {
        const app = new Application({
            width: this.options.width,
            height: this.options.height,
            antialias: true,
            autoDensity: true,
            backgroundAlpha: 1,
            backgroundColor: '0x000000',
            clearBeforeRender: true,
            context: null,
            hello: true,
            powerPreference: 'default',
            premultipliedAlpha: true,
            preserveDrawingBuffer: false,
            resolution: Math.min(window.devicePixelRatio, 2)
        })
        
        this.options.element.appendChild(app.view);
        return app;
    }

    updataSize() {
        window.addEventListener("resize", () =>{
            this.app.renderer.resize( this.options.element.offsetWidth, this.options.element.offsetHeight) 
            // console.log(this.app);
        })
    }
}