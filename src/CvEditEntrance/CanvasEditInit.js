import { Application } from "pixi.js";

import AssetsLoader from "./untils/assetsLoader.js"
import Rectangle from "./geometrys/rectangle.js"

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
        this.rectangle = new Rectangle();
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
            backgroundColor: '#000000',
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
        app.stage.sortableChildren = true;
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
            console.log(e,this.geomtrysArr,'xxxxxxxxx---mousedown');
            this.geomtrysArr.map(m =>{
                const geomtryHelp = this.app.stage.getChildByName(m + 'help', true);
                geomtryHelp.visible = false;
            })
            this.eventInfo = e;
            this.setOperateName = 'geomtrys' + this.geomtrysArr.length;
            this.geomtrysArr.push(this.setOperateName);
            this.addGeometrys(e, this.setOperateName);
            const editGeometrys = this.editGeometrys.bind(this);
            let mouseupCount = 0

            ctx.addEventListener("mousemove", editGeometrys);

            ctx.addEventListener("mouseup", (e) =>{
                if(mouseupCount === 0) {
                    console.log(this.setOperateName,'-----------------mouseup----------------------------');
                    ctx.removeEventListener("mousemove", editGeometrys);
                    this.reviseGeometrys(e)
                }
                
                mouseupCount += 1;
                
            })
        })
    }

    addGeometrys(e, name) {
        console.log(e, name, this.rectangle, '-----------------addGeometrys----------------------------');
        if (this.operateType = "addRectangle") {
            this.rectangle.addRectangle(e.pageX, e.pageY, name)
        }
    }
    editGeometrys(e) {
        // console.log(e, this.setOperateName,e.pageX,e.pageY, '-----------------editGeometrys----------------------------');
        if (this.operateType = "addRectangle") {
           this.rectangle.editRectangle(this.eventInfo, e, this.setOperateName)
        }
    }

    reviseGeometrys(e) {
        let width = this.eventInfo.pageX - e.pageX;
        let height = this.eventInfo.pageY - e.pageY;
        if(width === 0 || height === 0) {
            const container = this.app.stage.getChildByName(this.setOperateName, true);
            this.app.stage.removeChild(container);
            console.log(this.app.stage,'remove');
            let index = this.geomtrysArr.indexOf(this.setOperateName);
            this.geomtrysArr.splice(index, 1);
        } else {
            this.rectangle.selectRectangle(this.setOperateName)
        }
    }
}