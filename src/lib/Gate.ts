import { Canvas } from ".";

export default class Gate {
  inputs = [];
  outputs = [];
  pos = { x: 0, y: 0 };
  size = { w: 0, h: 0 };
  constructor(public name: string) {}
  draw(canvas: Canvas) {
    canvas.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
    canvas.text(this.name, this.pos.x, this.pos.y);
  }
}

export const AND = new Gate("AND");
export const OR = new Gate("OR");
export const NOT = new Gate("NOT");
