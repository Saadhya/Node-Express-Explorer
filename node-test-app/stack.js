export default class Stack {
  #s = [];
  #defaultMax=100;
  constructor(item) {
    if (item) this.push(item);
  }
  get stack() {
    return [...this.#s];
  }
  canPush() {
    return this.#s.length<this.#defaultMax;
  }
  push(item) {
    // this.#s.push(item);
    if(this.canPush()) this.#s = [...this.#s, item];
    else throw new RangeError('Stack at max capacity');
  }
  peek() {
    // return this.#s[this.#s.length-1];
    return this.#s.at(-1);
  }
  pop() {
    let item = this.peek();
    this.#s = [...this.#s.slice(0, -1)];
    return item;
  }
}
