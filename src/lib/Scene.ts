import { Canvas, Gate, Input, Output, Wire, keyboard, mouse } from ".";
import { AND, OR } from "./Gate";

export default class Scene {
  background: string = "rgb(52,52,52)";
  menu = [];
  gates: Gate[] = [];
  wires: Wire[] = [];
  inputs: Input[] = [];
  outputs: Output[] = [];
  offset = 50;
  mode: "none" | "gate" | "wire" = "none";
  currentWire: Wire | null = null;
  gateSelections = ["AND", "OR"];
  constructor() {
    this.gates.push(new AND());
    this.gates.push(new OR());
  }
  mouseLocation() {
    if (
      mouse.pos.x < this.offset &&
      mouse.pos.y > this.offset &&
      mouse.pos.y < window.innerHeight - this.offset
    ) {
      return 0;
    }
    if (
      mouse.pos.y < this.offset &&
      mouse.pos.x > this.offset &&
      mouse.pos.x < window.innerWidth - this.offset
    ) {
      return 1;
    }
    if (
      mouse.pos.x > window.innerWidth - this.offset &&
      mouse.pos.y > this.offset &&
      mouse.pos.y < window.innerHeight - this.offset
    ) {
      return 2;
    }
    if (
      mouse.pos.y > window.innerHeight - this.offset * 2 &&
      mouse.pos.x > this.offset &&
      mouse.pos.x < window.innerWidth - this.offset
    ) {
      return 3;
    }
    return -1;
  }
  isfMouseOnTopOfInputs() {
    if (this.inputs.length == 0) return false; // if no input exists
    for (let i = 0; i < this.inputs.length; i++) {
      if (this.inputs[i].isMouseOnTop()) {
        return i;
      }
    }
    return false;
  }
  isMouseOnTopOfOutputs(canvas: Canvas) {
    if (this.outputs.length == 0) return false; // if no input exists
    for (let i = 0; i < this.outputs.length; i++) {
      if (this.outputs[i].isMouseOnTop(canvas)) {
        return i;
      }
    }
    return false;
  }
  drawAndHandleLeftPanel(location: number, canvas: Canvas) {
    if (location === 0) {
      // when the mouse is on the left panel(input panel)
      let x = this.offset / 2;
      let y = mouse.pos.y;
      Input.drawShadow(canvas, this.offset);
      if (mouse.click) {
        if (this.inputs.length == 0) {
          this.inputs.push(new Input(x, y));
        } else {
          const index = this.isfMouseOnTopOfInputs();
          if (typeof index === "boolean" && index == false) {
            this.inputs.push(new Input(x, y));
          } else if (index && typeof index === "number") {
            this.inputs[index].toggle();
          }
        }
      }
    }
  }
  drawAndHandleRightPanel(location: number, canvas: Canvas) {
    if (location === 2) {
      // when the mouse is on the right panel(output panel)
      Output.drawShadow(canvas, this.offset);
      let x = canvas.dom.width - this.offset / 2;
      let y = mouse.pos.y;
      
      const index = this.isMouseOnTopOfOutputs(canvas);
      if (!!!index && mouse.click) {
        setTimeout(() => {
          this.outputs.push(new Output(x, y));
          console.log("ADD", this.outputs);
        }, 1);
      }
    }
  }
  drawAndHandleMainPanel(location: number, canvas: Canvas) {
    if (location === -1) {
      // when the mouse is on the main panel
    }
  }
  drawAndHandleBottomPanel(location: number, canvas: Canvas) {
    for (let i = 0; i < this.gateSelections.length; i++) {

    }
    if (location === 3) {

    }
  }
  isInputNodeClicked() {
    if (this.inputs.length == 0) return false; // if no input exists
    for (let i = 0; i < this.inputs.length; i++) {
      // check if the mouse is on top of any input return index
      if (this.inputs[i].isMouseOnTopOfNode && mouse.click) {
        return i;
      }
    }
    return false;
  }
  isOutputNodeClicked() {
    if (this.outputs.length == 0) return false; // if no input exists
    for (let i = 0; i < this.outputs.length; i++) {
      // check if the mouse is on top of any input return index
      if (this.outputs[i].isMouseOnTopOfNode && mouse.click) {
        return i;
      }
    }
    return false;
  }
  isGateNodeClicked() {
    return false;
  }
  startWire(startNode: Input | Output | Gate) {
    this.mode = "wire";
    const wire = new Wire(startNode);
    this.wires.push(wire);
    console.log("STARTED WIRE", this.wires);
    return wire;
  }
  layAWire(canvas: Canvas) {
    if (this.mode !== "wire") return false;
    if (keyboard.key == "Escape") {
      this.wires = this.wires.filter((wire) => wire !== this.currentWire);
      console.log("ENDED WIRE", this.wires);
      this.endWire();
    }
    if (this.currentWire && this.currentWire.child === null) {
      const outputNodeClicked = this.isOutputNodeClicked();
      const gateNodeClicked = this.isGateNodeClicked();
      if (outputNodeClicked) {
        console.log("outputNodeClicked", outputNodeClicked);
        this.currentWire.links.push(this.outputs[outputNodeClicked].nodePos);
        this.currentWire.child = this.outputs[outputNodeClicked];
        this.endWire();
      } else if (gateNodeClicked) {
        console.log("gateNodeClicked", gateNodeClicked);
      }
    } else if (this.currentWire && this.currentWire.parent === null) {
      const inputNodeClicked = this.isInputNodeClicked();
      const gateNodeClicked = this.isGateNodeClicked();
      if (inputNodeClicked) {
        this.currentWire.links.push(this.inputs[inputNodeClicked].nodePos);
        this.currentWire.parent = this.inputs[inputNodeClicked];
        this.endWire();
      } else if (gateNodeClicked) {
        console.log("gateNodeClicked", gateNodeClicked);
      }
    }
    this.currentWire?.create();
  }
  endWire() {
    this.mode = "none";
    this.currentWire = null;
  }
  _drawBG(canvas: Canvas) {
    canvas.fillRect(
      this.offset,
      this.offset,
      canvas.dom.width - this.offset * 2,
      canvas.dom.height - this.offset * 2,
      this.background,
    );
  }
  _drawComponents(canvas: Canvas) {
    this.wires.length > 0 && this.wires.forEach((wire) => wire.draw(canvas));
    this.gates.length > 0 && this.gates.forEach((gate) => gate.draw(canvas));
    this.inputs.length > 0 &&
      this.inputs.forEach((input) => input.draw(canvas));
    this.outputs.length > 0 &&
      this.outputs.forEach((output) => output.draw(canvas));
  }
  _handleNoneMode() {
    const inputNodeClicked = this.isInputNodeClicked();
    const outputNodeClicked = this.isOutputNodeClicked();
    if (inputNodeClicked) {
      console.log("inputNodeClicked", inputNodeClicked);
      this.mode = "wire";
      this.currentWire = this.startWire(this.inputs[inputNodeClicked]);
      return inputNodeClicked;
    }
    if (outputNodeClicked) {
      console.log("outputNodeClicked", outputNodeClicked);
      this.mode = "wire";
      this.currentWire = this.startWire(this.outputs[outputNodeClicked]);
      return outputNodeClicked;
    }
    return false;
  }
  _handleWireMode(canvas: Canvas) {
    if (this.mode != "wire") return false;
    const handler = this.layAWire(canvas);
    return handler;
  }
  _handleGateMode() {
    if (this.mode !== "gate") return false
    mouse.pos
  }
  draw(canvas: Canvas) {
    this._drawBG(canvas);

    const location = this.mouseLocation();
    this.drawAndHandleLeftPanel(location, canvas);
    this.drawAndHandleRightPanel(location, canvas);
    this.drawAndHandleBottomPanel(location, canvas);
    this.drawAndHandleMainPanel(location, canvas);
    this._drawComponents(canvas);

    const inputNodeClicked = this.isInputNodeClicked();
    const outputNodeClicked = this.isOutputNodeClicked();
    if (this.mode != "wire" && inputNodeClicked) {
      this.mode = "wire";
      this.currentWire = this.startWire(this.inputs[inputNodeClicked]);
    }
    if (this.mode != "wire" && outputNodeClicked) {
      this.mode = "wire";
      this.currentWire = this.startWire(this.outputs[outputNodeClicked]);
    }
    if (this.mode == "wire" && this.currentWire) {
      this.layAWire(canvas);
    }
  }
}
