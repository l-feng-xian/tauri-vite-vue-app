import CanvasEditInit from "../CanvasEditInit.js"
import { Container, Graphics, Sprite } from "pixi.js"

export default class Rectangle {
    constructor(type, options) {
        this.canvasEditInit = new CanvasEditInit();
        this.appStage = this.canvasEditInit.app.stage;
        this.assetsLoader = this.canvasEditInit.assetsLoader;
        this.type = type;
        this.options = options;



        // console.log(this.canvasEditInit, 'this.canvasEditInit');

        if (type && type === 'add') {
            this.addRectangle()
        }
    }

    addRectangle() {
        const container = new Container();
        container.name = this.options.name;
        // container.position.set(10, 0);

        // container.scale.set(1,1);
        // container.anchor(0.5)

        const rectangle = new Graphics();
        rectangle.name = this.options.name + 'Graphics';
        rectangle.lineStyle(0, 0xFF00FF, 1);
        rectangle.beginFill(0x650A5A, 1);
        rectangle.drawRoundedRect(0, 0, 100, 100, 0);
        // rectangle.x = 0;
        // rectangle.y = 0;
        rectangle.endFill();

        console.log(this.canvasEditInit.assetsLoaderFile, '[');
        const fd = new Sprite(this.assetsLoader.assetsFile['fd'])
        rectangle.name = this.options.name + 'fd';
        fd.anchor.set(0.5);
        fd.x = 0;
        fd.y = 0;
        fd.width = 20;
        fd.height = 20;
        fd.eventMode = 'dynamic';
        fd.cursor = 'ne-resize';

        container.addChild(rectangle);

        const containerBounds = container.getBounds();
        console.log(containerBounds, (containerBounds.width + -containerBounds.x) / 2);
        container.pivot.set(containerBounds.width / 2, containerBounds.height / 2);
        container.position.set(this.options.x+(containerBounds.width/2), this.options.y+(containerBounds.height/2))
        // container.rotation = 0.1;
        // container.addChild(fd);

        this.appStage.addChild(container);

        // container.position.set(50, 50)
        // container.position.set(this.canvasEditInit.app.view.clientWidth/2, this.canvasEditInit.app.view.clientHeight/2);
        // console.log(container);
        this.canvasEditInit.app.ticker.add((delta) => {
            // rotate the container!
            // use delta to create frame-independent transform
            // container.rotation -= 0.01 * delta;
            // container.scale.set(1+ (0.01 * delta),1+ (0.01 * delta));
            // container.scale.x = container.scale.x+ (0.01 * delta)
        });
    }
}