function log(message: string): void {
  console.log(message);
}

const result = log("saved");
if (result) {
  console.log("truthy");
}
