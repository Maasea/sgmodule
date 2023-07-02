export default class PromiseQueue {
  constructor (t) {
    this.concurrency = t;
    this.queue = [];
    this.currentlyRunning = 0;
  }

  add (t) {
    this.queue.push(t);
    this.run();
  }

  run () {
    while (this.currentlyRunning < this.concurrency && this.queue.length > 0) {
      this.currentlyRunning++;
      const promiseGenerator = this.queue.shift();
      promiseGenerator().finally(() => {
        this.currentlyRunning--;
        this.run();
      });
    }
  }
}
