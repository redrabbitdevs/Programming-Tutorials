class Button {
  constructor(label) {
    this.label = label;
  }

  press() {
    return `pressed ${this.label}`;
  }

  click = () => `clicked ${this.label}`;
}

const save = new Button("save");
const other = new Button("open");
console.log(save.press === other.press, save.click === other.click);

const { press, click } = save;
console.log(click());
try {
  press();
} catch (error) {
  console.log(error.name);
}
