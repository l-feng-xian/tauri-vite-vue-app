import CanvasEditInit from "../CanvasEditInit.js"
import { Container, Graphics, Sprite } from "pixi.js"

export default class Rectangle {
    constructor() {
        this.canvasEditInit = new CanvasEditInit();
        this.appStage = this.canvasEditInit.app.stage;
        this.assetsLoader = this.canvasEditInit.assetsLoader;
    }

    /**
     * @param x e.pageX-number
     */
    addRectangle(x, y, name) {
        // console.log('xx');
        const container = new Container();
        container.name = name;
        // container.position.set(10, 0);

        // container.scale.set(1,1);
        // container.anchor(0.5)

        const rectangle = new Graphics();
        rectangle.name = name + 'Graphics';
        rectangle.lineStyle(1, '#fff', 1);
        rectangle.beginFill('#000', 0);
        rectangle.drawRoundedRect(0, 0, 0, 0, 0);
        rectangle.endFill();

        // console.log(this.canvasEditInit.assetsLoaderFile, '[');
        // const fd = new Sprite(this.assetsLoader.assetsFile['fd'])
        // fd.name = name + 'fd';
        // fd.anchor.set(0.5);
        // fd.width = 20;
        // fd.height = 20;
        // fd.eventMode = 'dynamic';
        // fd.cursor = 'ne-resize';
        // fd.visible = false;

        container.addChild(rectangle);

        const containerBounds = container.getBounds();
        console.log(containerBounds, (containerBounds.width + -containerBounds.x) / 2);
        
        container.position.set(x, y)
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

    editRectangle(startEvent, endEvent, name) {
        let drawRect = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        }
        let width = startEvent.pageX - endEvent.pageX;
        let height = startEvent.pageY - endEvent.pageY;
        drawRect.width = Math.abs(width);
        drawRect.height = Math.abs(height);
        if (width > 0 && height > 0) {
            drawRect.x = endEvent.pageX;
            drawRect.y = endEvent.pageY;
        } else if (width > 0 && height < 0) {
            drawRect.x = endEvent.pageX;
            drawRect.y = endEvent.pageY - drawRect.height;
        } else if (width < 0 && height < 0) {
            drawRect.x = startEvent.pageX;
            drawRect.y = startEvent.pageY;
        } else if (width < 0 && height > 0) {
            drawRect.x = endEvent.pageX - drawRect.width;
            drawRect.y = endEvent.pageY;
        }
        const container = this.appStage.getChildByName(name, true);
        const containerBounds = container.getBounds();
        const child = this.appStage.getChildByName(name + 'Graphics', true);

        child.clear();
        child.lineStyle(1, '#fff', 1);
        child.beginFill('#000', 0);
        child.drawRoundedRect(0, 0,  drawRect.width, drawRect.height, 0);
        child.endFill();

        container.position.set(drawRect.x, drawRect.y)

        child.width = drawRect.width;
        child.height = drawRect.height;

        // childfd.x = 100;
        // childfd.y = 100;
        console.log(containerBounds, '--container--child');
    }

    selectRectangle(name) {
        const container = this.appStage.getChildByName(name, true);
        const containerBounds = container.getBounds();

        container.pivot.set(containerBounds.width / 2, containerBounds.height / 2);
        container.position.set(container.x+(containerBounds.width/2), container.y+(containerBounds.height/2));
        console.log(containerBounds, container.x, container.y,'--container--child-selectRectangle');
        // this.canvasEditInit.app.ticker.add((delta) => {
        //     container.rotation -= 0.01 * delta;
        // })
    }
}