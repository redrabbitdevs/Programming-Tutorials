class User {
  readonly id: number;

  constructor(id: number) {
    this.id = id;
  }

  rename(): void {
    this.id = 0;
  }
}

console.log(new User(1).id);
