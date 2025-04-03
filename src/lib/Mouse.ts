export class Mouse {
  pos = { x: 0, y: 0 };
  down = false;
  click = false;
  rightClick = false;
  constructor() {
    window.addEventListener("mousemove", (e) => {
      this.pos.x = e.clientX;
      this.pos.y = e.clientY;
    });
    window.addEventListener("mousedown", () => {
      this.down = true;
    });
    window.addEventListener("mouseup", () => {
      this.down = false;
      this.click = false;
    });
    window.addEventListener("click", (e: MouseEvent) => {
      if (this.click == true) return;
      this.click = true;
      this.pos.x = e.clientX;
      this.pos.y = e.clientY;
      setTimeout(() => (this.click = false), 2);
    });
    window.addEventListener("contextmenu", (e: MouseEvent) => {
      e.preventDefault();
      this.rightClick = true;
      setTimeout(() => (this.rightClick = false), 1);
    });
  }
}

export const mouse = new Mouse();
