interface Sink {
  write(text: string): void;
  flush(): string;
}

class BufferSink implements Sink {
  parts: string[] = [];

  write(text: string): void {
    this.parts.push(text);
  }

  flush(): string {
    const all = this.parts.join("");
    this.parts = [];
    return all;
  }
}

const sink = new BufferSink();
sink.write("a");
sink.write("b");
console.log(sink.flush(), sink.parts.length);
