import { canvas } from "./canvas";
import Gate from "./Gate";
import Input from "./Input";
import Output from "./Output";
import Wire from "./Wire";
export default class Scene {
  gates: Gate[] = [];
  wires: Wire[] = [];
  outputs: Output[] = [];
  inputs: Input[] = [];
  boundary:{x: number, y: number} = {x: 50, y: 50};
  constructor(){}
  drawWorkspace(){
    canvas.fillRect(this.boundary.x, this.boundary.y, canvas.w - this.boundary.x * 2, canvas.h - this.boundary.y * 2, 'white');
  }
  drawInputsBar(){
    canvas.fillRect(
      0,this.boundary.y,
      this.boundary.x,
      canvas.h - this.boundary.y * 2,
      "rgb(52,52,52)"
    )
  }
  drawOutputsBar(){
    canvas.fillRect(
      canvas.w - this.boundary.x,
      this.boundary.y,
      this.boundary.x,
      canvas.h - this.boundary.y * 2,
      "rgb(52,52,52)"
    )
  }
  drawGatesBar(){
    canvas.fillRect(
      this.boundary.x,
      canvas.h - this.boundary.y,
      canvas.w - this.boundary.x * 2,
      this.boundary.y,
      "rgb(52,52,52)"
    )
  }
  drawTitleBar(){
    canvas.fillRect(
      this.boundary.x,
      0,
      canvas.w-this.boundary.x*2, 
      this.boundary.y,
      "rgb(52,52,52)"
    )
  }
  draw(){
    canvas.fillRect(0,0,canvas.dom.width, canvas.dom.height, 'rgb(22,22,22)');
    this.drawWorkspace();
    this.drawInputsBar();
    this.drawOutputsBar();
    this.drawGatesBar();
    this.drawTitleBar();
  }
}