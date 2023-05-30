import { EventEmitter } from "events";

export default class Time extends EventEmitter {
    constructor() {
        super();

        this.updated()
    }

    updated() {
        this.emit("updated")
        window.requestAnimationFrame(() => this.updated());
    }
}