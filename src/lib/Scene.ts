import { Gate, Wire, Input, Output, mouse, Canvas } from ".";

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
  constructor() {}
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
      mouse.pos.x > window.innerWidth - this.offset * 2 &&
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
      // check if the mouse is on top of any input return index
      if (this.inputs[i].isMouseOnTop()) {
        return i;
      }
    }
    return false;
  }
  isMouseOnTopOfOutputs() {
    if (this.outputs.length == 0) return false; // if no input exists
    for (let i = 0; i < this.outputs.length; i++) {
      // check if the mouse is on top of any input return index
      if (this.outputs[i].isMouseOnTop()) {
        return i;
      }
    }
    return false;
  }
  drawAndHandleLeftPanel(location: number, canvas: Canvas) {
    if (location === 0) {
      // when the mouse is on the left panel(input panel)
      canvas.fillRect(
        0,
        this.offset,
        this.offset - 2,
        canvas.dom.height - this.offset * 2,
        "rgb(62,62,62)",
      );
      let x = this.offset / 2;
      let y = mouse.pos.y;
      canvas.line(x, y, x + 25 + 15, y, "rgb(72,72,72)");
      canvas.fillArc(x, y, 25, "rgb(72,72,72)");
      canvas.fillArc(x, y, 20, "rgb(62,62,62)");
      canvas.fillArc(x + 25 + 15, y, 10, "rgb(72,72,72)");
      const index = this.isfMouseOnTopOfInputs();
      if (!!!index && mouse.click) {
        setTimeout(() => {
          this.inputs.push(new Input(x, y));
        }, 1);
      } else if (typeof index === "number" && index && mouse.click) {
        setTimeout(() => {
          this.inputs[index].toggle();
        }, 1);
      }
    }
  }
  drawAndHandleRightPanel(location: number, canvas: Canvas) {
    if (location === 2) {
      // when the mouse is on the right panel(output panel)
      canvas.fillRect(
        canvas.dom.width - this.offset,
        this.offset,
        this.offset - 2,
        canvas.dom.height - this.offset * 2,
        "rgb(62,62,62)",
      );
      let x = canvas.dom.width - this.offset / 2;
      let y = mouse.pos.y;
      canvas.line(x, y, x - 25 - 15, y, "rgb(72,72,72)");
      canvas.fillArc(x, y, 25, "rgb(72,72,72)");
      canvas.fillArc(x, y, 20, "rgb(62,62,62)");
      canvas.fillArc(x - 25 - 15, y, 10, "rgb(72,72,72)");
      const index = this.isMouseOnTopOfOutputs();
      if (!!!index && mouse.click) {
        setTimeout(() => {
          this.outputs.push(new Output(x, y));
        }, 1);
      } else if (typeof index === "number" && index && mouse.click) {
        setTimeout(() => {
          this.outputs[index].toggle();
        }, 1);
      }
    }
  }
  drawAndHandleMainPanel(location: number, canvas: Canvas) {
    if (location === -1) {
      // when the mouse is on the main panel
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
  startWire(startNode: Input) {
    this.mode = "wire";
    const wire = new Wire(startNode);
    this.wires.push(wire);
    return wire;
  }
  layAWire(canvas: Canvas) {
    if (!this.currentWire) return;
    const outputNodeClicked = this.isOutputNodeClicked();
    if (this.currentWire.links.length < 2) {
      console.log("LINKING");
      if (mouse.click) {
        if (outputNodeClicked) {
          this.currentWire.child = this.outputs[outputNodeClicked];
          this.endWire();
        } else {
          this.currentWire.links.push(mouse.pos);
          console.log(this.currentWire.links);
        }
      }
    }
  }
  endWire() {
    this.mode = "none";
  }
  draw(canvas: Canvas) {
    canvas.fillRect(
      this.offset,
      this.offset,
      canvas.dom.width - this.offset * 2,
      canvas.dom.height - this.offset * 2,
      this.background,
    );
    const location = this.mouseLocation();
    this.drawAndHandleLeftPanel(location, canvas);
    this.drawAndHandleRightPanel(location, canvas);
    this.drawAndHandleMainPanel(location, canvas);
    this.gates.length > 0 && this.gates.forEach((gate) => gate.draw(canvas));
    this.inputs.length > 0 &&
      this.inputs.forEach((input) => input.draw(canvas));
    this.outputs.length > 0 &&
      this.outputs.forEach((output) => output.draw(canvas));
    this.wires.length > 0 && this.wires.forEach((wire) => wire.draw(canvas));
    const inputNodeClicked = this.isInputNodeClicked();

    if (inputNodeClicked) {
      this.mode = "wire";
      this.currentWire = this.startWire(this.inputs[inputNodeClicked]);
    }
    if (this.mode == "wire" && this.currentWire) {
      this.layAWire(canvas);
    }
  }
}
