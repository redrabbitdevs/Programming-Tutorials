let data: any = "text";

try {
  console.log(data.toFixed(2));
} catch (error) {
  console.log(String(error));
}
