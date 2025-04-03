export default class Keyboard {
  key = "";
  constructor() {
    window.addEventListener("keydown", (e) => {
      this.key = e.key;
      setTimeout(() => (this.key = ""), 2);
    });
  }
}

export const keyboard = new Keyboard();
