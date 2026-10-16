class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

function fromArray(values) {
  let head = null;
  for (const value of [...values].reverse()) {
    head = new ListNode(value, head);
  }
  return head;
}

function toArray(head) {
  const values = [];
  for (let node = head; node !== null; node = node.next) {
    values.push(node.value);
  }
  return values;
}

function reverse(head) {
  let previous = null;
  let current = head;
  while (current !== null) {
    const next = current.next;
    current.next = previous;
    previous = current;
    current = next;
  }
  return previous;
}

console.log(toArray(reverse(fromArray([1, 2, 3, 4]))));
console.log(toArray(reverse(fromArray([7]))), reverse(null));
