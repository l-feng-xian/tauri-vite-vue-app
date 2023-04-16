import CanvasEditInit from "../CanvasEditInit.js"
import { Container, Graphics, Sprite } from "pixi.js"

export default class Rectangle {
    constructor() {
        this.canvasEditInit = new CanvasEditInit();
        this.appStage = this.canvasEditInit.app.stage;
        this.assetsLoader = this.canvasEditInit.assetsLoader;
        this.dragTarget = null;
    }

    /**
     * @param x e.pageX-number
     */
    addRectangle(x, y, name) {
        // console.log('xx');
        const container = new Container();
        container.name = name;
        container.sortableChildren = true;
        container.eventMode = 'static';
        container.on("pointerdown",(() => this.onDragStart(container)), container);

        const rectangle = new Graphics();
        rectangle.name = name + 'Graphics';
        rectangle.lineStyle(0, '#fff', 1);
        rectangle.beginFill('#000', 0);
        rectangle.drawRoundedRect(0, 0, 0, 0, 0);
        rectangle.endFill();
        rectangle.zIndex = 0;
        container.addChild(rectangle);

        const containerHelp = new Container();
        containerHelp.name = name + "help";
        containerHelp.sortableChildren = true;
        containerHelp.zIndex = 1;
        containerHelp.visible = false;

        const containerHelpDrag1 = new Graphics();
        containerHelpDrag1.name = name + 'containerHelpDrag1';
        containerHelpDrag1.lineStyle(2, '#4F81FF', 1);
        containerHelpDrag1.beginFill('#fff', 1);
        containerHelpDrag1.drawRect(0, 0, 7, 7, 0);
        containerHelpDrag1.endFill();
        containerHelpDrag1.pivot.set(4, 4);
        containerHelpDrag1.zIndex = 2;
        containerHelpDrag1.eventMode = 'static';
        containerHelpDrag1.on("pointerdown",(() => this.onDragHelpStart(containerHelpDrag1, '1')), container);
        containerHelp.addChild(containerHelpDrag1);

        const containerHelpDrag2 = new Graphics();
        containerHelpDrag2.name = name + 'containerHelpDrag2';
        containerHelpDrag2.lineStyle(2, '#4F81FF', 1);
        containerHelpDrag2.beginFill('#fff', 1);
        containerHelpDrag2.drawRect(0, 0, 7, 7, 0);
        containerHelpDrag2.endFill();
        containerHelpDrag2.pivot.set(4, 4);
        containerHelpDrag2.zIndex = 2;
        containerHelp.addChild(containerHelpDrag2);

        const containerHelpDrag3 = new Graphics();
        containerHelpDrag3.name = name + 'containerHelpDrag3';
        containerHelpDrag3.lineStyle(2, '#4F81FF', 1);
        containerHelpDrag3.beginFill('#fff', 1);
        containerHelpDrag3.drawRect(0, 0, 7, 7, 0);
        containerHelpDrag3.endFill();
        containerHelpDrag3.pivot.set(4, 4);
        containerHelpDrag3.zIndex = 2;
        containerHelp.addChild(containerHelpDrag3);

        const containerHelpDrag4 = new Graphics();
        containerHelpDrag4.name = name + 'containerHelpDrag4';
        containerHelpDrag4.lineStyle(2, '#4F81FF', 1);
        containerHelpDrag4.beginFill('#fff', 1);
        containerHelpDrag4.drawRect(0, 0, 7, 7, 0);
        containerHelpDrag4.endFill();
        containerHelpDrag4.pivot.set(4, 4);
        containerHelpDrag4.zIndex = 2;
        containerHelp.addChild(containerHelpDrag4);

        const containerHelpLine = new Graphics();
        containerHelpLine.name = name + 'containerHelpLine';
        containerHelpLine.lineStyle(2, '#4F81FF', 1);
        containerHelpLine.beginFill('#fff', 0);
        containerHelpLine.drawRect(0, 0, 0, 0, 0);
        containerHelpLine.endFill();
        containerHelpLine.zIndex = 1;
        containerHelp.addChild(containerHelpLine);
        
        container.addChild(containerHelp)
       

        

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
        // const containerBounds = container.getBounds();
        container.position.set(drawRect.x, drawRect.y);
        
        const rectangle = this.appStage.getChildByName(name + 'Graphics', true);
        rectangle.clear();
        rectangle.lineStyle(0, '#fff', 1);
        rectangle.beginFill('#cccccc', 1);
        rectangle.drawRoundedRect(0, 0,  drawRect.width, drawRect.height, 0);
        rectangle.endFill();

        const containerHelp = this.appStage.getChildByName(name + 'help', true);
        containerHelp.visible = true;

        const containerHelpLine =  this.appStage.getChildByName(name + 'containerHelpLine', true);
        containerHelpLine.clear();
        containerHelpLine.lineStyle(1, '#4F81FF', 1);
        containerHelpLine.beginFill('#000', 0);
        containerHelpLine.drawRoundedRect(0, 0, drawRect.width, drawRect.height, 0);
        containerHelpLine.endFill();

        const containerHelpDrag1 =  this.appStage.getChildByName(name + 'containerHelpDrag1', true);
        containerHelpDrag1.x = 0;
        containerHelpDrag1.y = 0;

        const containerHelpDrag2 =  this.appStage.getChildByName(name + 'containerHelpDrag2', true);
        containerHelpDrag2.x = drawRect.width;
        containerHelpDrag2.y = 0;

        const containerHelpDrag3 =  this.appStage.getChildByName(name + 'containerHelpDrag3', true);
        containerHelpDrag3.x = drawRect.width;
        containerHelpDrag3.y = drawRect.height;

        const containerHelpDrag4 =  this.appStage.getChildByName(name + 'containerHelpDrag4', true);
        containerHelpDrag4.x = 0;
        containerHelpDrag4.y = drawRect.height;
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

    onDragStart(dragTarget) {
        console.log(this.canvasEditInit.geomtrysArr,dragTarget, "-----------this.appStage------------------")
        this.canvasEditInit.geomtrysArr.map(m =>{
            if(m !== dragTarget.name) {
                const geomtryHelp = this.appStage.getChildByName(m + 'help', true);
                geomtryHelp.visible = false;
            } else {
                const geomtryHelp = this.appStage.getChildByName(m + 'help', true);
                geomtryHelp.visible = true;
            }
        })
        dragTarget.alpha = 0.5;
        this.dragTarget = dragTarget;
        const onDragMoveF = this.onDragMove;
        dragTarget.on("pointermove", onDragMoveF.bind(this));
        dragTarget.on("pointerup", (() => this.onDragEnd(onDragMoveF)));
        dragTarget.on("pointerupoutside", (() => this.onDragEnd(onDragMoveF)));
       
        console.log(dragTarget, '-------onDragStart----------');
    }

    onDragMove(e) {
        if(this.dragTarget) {
            console.log(this.dragTarget.position, '-----------this.dragTarget');
            const body = document.querySelector("body")
            body.style.cursor= "move"
        
            this.dragTarget.parent.toLocal(e.global, null, this.dragTarget.position);
            console.log(e, '----onDragMove-------');
        }
    }

    onDragEnd(onDragMoveF) {
        if (this.dragTarget) {
            const body = document.querySelector("body")
            body.style.cursor= "default"
            console.log('-----onDragEnd------------');
            this.dragTarget.off("pointermove", onDragMoveF);
            this.dragTarget.alpha = 1;
            this.dragTarget = null;
        }
    }

    onDragHelpStart(target, i) {
        console.log(target, i);
    }
}