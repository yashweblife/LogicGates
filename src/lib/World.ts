import Scene from "./Scene";

export default class World {
  scene: Scene = new Scene();
  constructor() { }
  update() {
    this.scene.draw();
  }
}