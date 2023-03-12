import * as THREE from "three"
import Entrance from "../entrance.js";
import GASP from "gsap"

export default class Room {
    constructor() {
        this.entrance = new Entrance();
        this.scene = this.entrance.scene;
        this.resources = this.entrance.recources;
        this.room = this.resources.items.tree;
        this.acctualRoom = this.room.scene

        this.setModel();
        this.onMouseMove();
    }

    setModel() {
        this.scene.add(this.acctualRoom);
        this.acctualRoom.scale.set(0.5, 0.5, 0.5);
        // this.acctualRoom.rotation.y = Math.PI;

    }

    onMouseMove() {
        // window.addEventListener("mousemove", e => {
        //     this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
        // })
    }

    resize() {
    }

    updated() {
        // if (this.rotation) {
        //     let a = GASP.utils.interpolate(
        //         0,
        //         this.rotation,
        //         0.5
        //     )
        //     this.acctualRoom.rotation.y = a
        // }

    }
}