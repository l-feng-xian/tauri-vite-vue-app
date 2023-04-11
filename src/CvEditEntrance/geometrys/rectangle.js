import CanvasEditInit from "../CanvasEditInit.js"
import { Container, Graphics } from "pixi.js"

export default class Rectangle {
    constructor(type, options) {
        this.canvasEditInit = new CanvasEditInit();
        this.appStage = this.canvasEditInit.app.stage
        this.type = type

        console.log(this.canvasEditInit, 'this.canvasEditInit');

        if (type && type === 'add') {
            this.addRectangle()
        }
    }

    addRectangle() {
        const container = new Container();
        
        const rectangle = new Graphics();
        rectangle.lineStyle(2, 0xFF00FF, 1);
        rectangle.beginFill(0x650A5A, 1);
        rectangle.drawRoundedRect(50, 50, 100, 100, 10);
        rectangle.endFill();

        container.addChild(rectangle);
        this.appStage.addChild(container);
    }
}