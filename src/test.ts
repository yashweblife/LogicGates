class Canvas {
  public dom: HTMLCanvasElement = document.createElement('canvas');
  public ctx: CanvasRenderingContext2D = this.dom.getContext('2d')!;
  constructor(parent: HTMLElement = document.body) {
    parent.appendChild(this.dom);
  }
  public setSize(x: number, y: number) {
    this.dom.width = x;
    this.dom.height = y;
  }
  public clear() {
    this.ctx.clearRect(0, 0, this.dom.width, this.dom.height);
  }
  public strokeArc(x: number, y: number, r: number, color: string = 'black') {
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
  public strokeRect(x: number, y: number, w: number, h: number, color: string = 'black') {
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.rect(x, y, w, h);
    this.ctx.stroke();
  }
  public fillRect(x: number, y: number, w: number, h: number, color: string = 'black') {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.rect(x, y, w, h);
    this.ctx.fill();
  }
  public fillArc(x: number, y: number, r: number, color: string = 'black') {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.fill();
  }
  public text(text: string, x: number, y: number, color: string = 'black') {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, x, y);
  }
}


