const queue: number[] = [];

function first(): number {
  return queue[0];
}

queue.push(1);
console.log(first());
