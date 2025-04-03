import { Canvas, Gate, Input, mouse, Output } from "./";

export default class Wire {
  links: { x: number; y: number }[] = [];
  parent: any;
  child: any = null;
  state = false;
  constructor(master: Input | Output | Gate) {
    if (master instanceof Input) {
      this.parent = master;
    } else if (master instanceof Output) {
      this.child = master;
    } else if (master instanceof Gate) {
      this.parent = master;
    }
    this.links.push(master.pos);
  }
  create() {
    if (mouse.click) {
      this.links.push({ x: mouse.pos.x, y: mouse.pos.y });
    }
  }
  get isFullyAttached() {
    if (this.parent === null || this.child === null) return false;
    return true;
  }
  draw(canvas: Canvas) {
    if (!this.isFullyAttached) {
      if (this.links.length < 2) {
        canvas.line(this.links[0].x, this.links[0].y, mouse.pos.x, mouse.pos.y);
      } else {
        for (let i = 0; i < this.links.length - 1; i++) {
          canvas.line(
            this.links[i].x,
            this.links[i].y,
            this.links[i + 1].x,
            this.links[i + 1].y,
          );
        }
        canvas.line(
          this.links[this.links.length - 1].x,
          this.links[this.links.length - 1].y,
          mouse.pos.x,
          mouse.pos.y,
        );
      }
    } else {
      for (let i = 0; i < this.links.length - 1; i++) {
        canvas.line(
          this.links[i].x,
          this.links[i].y,
          this.links[i + 1].x,
          this.links[i + 1].y,
        );
      }
    }
  }
}
