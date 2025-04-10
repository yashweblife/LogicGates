import { Canvas, mouse } from ".";

export default class Input {
  state: boolean = false;
  pos = { x: 0, y: 0 };
  constructor(x: number, y: number) {
    this.pos.x = x;
    this.pos.y = y;
  }
  get nodePos() {
    return { x: this.pos.x + 25 + 15, y: this.pos.y };
  }
  isMouseOnTop() {
    if (
      mouse.pos.x > this.pos.x - 25 - 15 &&
      mouse.pos.x < this.pos.x + 25 &&
      mouse.pos.y > this.pos.y - 25 - 15 &&
      mouse.pos.y < this.pos.y + 25 + 15
    ) {
      return true;
    }
    return false;
  }
  get isMouseOnTopOfNode() {
    const nodeRad = 10;
    const nodePadding = 5;
    const nodeClickableArea = {
      x: this.nodePos.x - nodeRad - nodePadding,
      y: this.nodePos.y - nodeRad - nodePadding,
      w: nodeRad * 2 + nodePadding * 2,
      h: nodeRad * 2 + nodePadding * 2,
    };
    if (
      mouse.pos.x > nodeClickableArea.x &&
      mouse.pos.x < nodeClickableArea.x + nodeClickableArea.w &&
      mouse.pos.y > nodeClickableArea.y &&
      mouse.pos.y < nodeClickableArea.y + nodeClickableArea.h
    ) {
      return true;
    }
    return false;
  }
  draw(canvas: Canvas) {
    const stateColor = this.state ? "rgb(255,0,0)" : "rgb(10,10,10)";
    const mouseOverButtonColor = this.isMouseOnTop()
      ? "rgb(42,42,42)"
      : "rgb(22,22,22)";
    canvas.line(
      this.pos.x,
      this.pos.y,
      this.pos.x + 25 + 15,
      this.pos.y,
      mouseOverButtonColor,
    );
    canvas.fillArc(this.pos.x, this.pos.y, 25);
    canvas.fillArc(this.pos.x, this.pos.y, 20, stateColor);
    canvas.fillArc(
      this.pos.x + 25 + 15,
      this.pos.y,
      10,
      this.isMouseOnTopOfNode ? "rgb(72,72,72)" : stateColor,
    );
  }
  toggle() {
    this.state = !this.state;
  }
  static drawShadow(canvas: Canvas, offset: number) {
    canvas.fillRect(
      0,
      offset,
      offset - 2,
      canvas.dom.height - offset * 2,
      "rgb(62,62,62)",
    );
    let x = offset / 2;
    let y = mouse.pos.y;
    canvas.line(x, y, x + 25 + 15, y, "rgb(72,72,72)");
    canvas.fillArc(x, y, 25, "rgb(72,72,72)");
    canvas.fillArc(x, y, 20, "rgb(62,62,62)");
    canvas.fillArc(x + 25 + 15, y, 10, "rgb(72,72,72)");
  }
}
