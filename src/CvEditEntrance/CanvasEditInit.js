import { Application } from "pixi.js";

import Rectangle from "./geometrys/rectangle.js"
import AssetsLoader from "./untils/assetsLoader.js"

export default class CanvasEditInit {
    static instance;
    constructor(options) {
        if (CanvasEditInit.instance) {
            return CanvasEditInit.instance;
        }
        CanvasEditInit.instance = this;
        this.options = options;
        this.app = null
        this.setCanvas();
        this.assetsLoader = new AssetsLoader();
        this.setOperateType = 'addRectangle';
        this.setOperateName = '';
        this.eventInfo = null;
        this.geomtrysArr = []

        this.assetsLoader.on("loadersOver", (file) => {
            this.assetsLoaderFile = file;
            // new Rectangle('add', { name: 'rect01' })
        })

        this.setResize()
    }

    setCanvas() {
        const app = new Application({
            resizeTo: this.options.element,
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
        app.stage.eventMode = 'static';
        this.app = app;
        this.eventListener();
    }

    setResize() {
        // window.addEventListener("resize", () =>{
        //     this.app.renderer.resize( this.options.element.offsetWidth, this.options.element.offsetHeight)
        //     console.log(this.options.element.offsetWidth, this.options.element.offsetHeight);
        // })
        document.getElementById('editResize').addEventListener("mousemove", () =>{
            this.app.renderer.resize( this.options.element.offsetWidth, this.options.element.offsetHeight);
        })
    }

    eventListener() {
        const ctx = this.options.element.getElementsByTagName("canvas")[0];
        ctx.addEventListener("mousedown", e =>{
            console.log(e,'xxxxxxxxx---mousedown');
            this.setOperateName = 'geomtrys' + this.geomtrysArr.length;
            this.geomtrysArr.push(this.setOperateName);
            this.addGeometrys(e, this.setOperateName);
            ctx.addEventListener("mousemove", this.editGeometrys);
            ctx.addEventListener("mouseup", (e) =>{
                console.log('-----------------mouseup----------------------------');
                ctx.removeEventListener("mousemove", this.editGeometrys);
            })
        })
        // console.log(this.options.element.getElementsByTagName("canvas")[0]);
        // console.log(this.app);
        // this.app.stage.on("pointerdown", (e) =>{
        //     console.log(e);
        // })
        // window.addEventListener("mousedown", (e) => {
        //     if (this.options.width > e.pageX && this.options.height > e.pageY) {
        //         this.eventInfo = e
        //         let name = 'geomtrys' + this.geomtrysArr.length
        //         this.addGeometrys(e, name)
        //         console.log(e, e.pageX, e.pageY, e.target.localName, this.options.width, this.options.height);
        //         window.addEventListener("mousemove", this.editGeometrys)

        //         window.addEventListener("mouseup", this.reviseGeometrys)


        //     }
        // })
    }

    addGeometrys(e, name) {
        console.log(e, name,'-----------------addGeometrys----------------------------');
        if (this.operateType = "addRectangle") {
            new Rectangle('add', {
                name: name,
                x: e.pageX,
                y: e.pageY
            })
        }
    }

    editGeometrys(e, name) {
        console.log('-----------------editGeometrys----------------------------');
        // console.log(e, e.pageX, e.pageX, 'mousemove');
        // let width = this.eventInfo - pageX
    }

    reviseGeometrys(e, name) {
        console.log('-----------------mouseup----------------------------');
        window.removeEventListener("mousemove", this.editGeometrys)
    }
}