import * as THREE from "three"
import Entrance from "../entrance.js";

import Room from "./room.js";
import EnvironMent from "./environMent.js";

export default class World {
    constructor() {
        this.entrance = new Entrance();
        this.sizes = this.entrance.sizes;
        this.scene = this.entrance.scene;
        this.canvas = this.entrance.canvas;
        this.camera = this.entrance.camera;
        this.resources = this.entrance.recources

        this.resources.on("ready", () =>{
            this.environMent = new EnvironMent();
            this.room = new Room();
        })

        
    }

    resize() {
    }

    updated() {
        if(this.room) {
            this.room.updated()
        }
    } 
}