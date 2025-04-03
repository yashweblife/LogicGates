import { Canvas, Scene } from "./";

export default class World {
  currentScene = new Scene();
  canvas = new Canvas(document.querySelector("#app") as HTMLElement);
  constructor() {}
  draw() {
    this.canvas.clear();
    this.currentScene.draw(this.canvas);
    // this.canvas.fillArc(mouse.pos.x, mouse.pos.y, 5)
  }
  update() {}
  addGate() {}
}
