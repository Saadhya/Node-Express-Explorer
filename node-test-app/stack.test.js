import assert from "node:assert/strict";
import {
  after,
  afterEach,
  before,
  beforeEach,
  describe,
  mock,
  suite,
  test,
} from "node:test";
import Stack from "./stack.js";

describe("Stack instantiation", () => {
  test("can instantiate a new stack", () => {
    const s = new Stack();
    assert.equal(typeof s, "object");
    assert.ok(s instanceof Stack);
  });
  test("can instantiate without argument value", () => {
    const s = new Stack();
    assert.deepEqual(s.stack, []);
  });
  test("can instantiate with argument value", () => {
    const value = "123";
    const s = new Stack(value);
    assert.deepEqual(s.stack, [value]);
  });
});

suite("stack methods", () => {
  before(() => console.log("before"));
  beforeEach(() => console.log("before each"));
  after(() => console.log("before"));
  afterEach(() => console.log("after each"));

  test("can push", () => {
    const s = new Stack();
    const item = "abc";
    s.push(item);
    assert.deepEqual(s.stack, [item]);
  });

  test("can peek", async (t) => {
    await t.test("can peek with an item in the stack", () => {
      const s = new Stack();
      const item = "xyz";
      s.push(item);
      assert.equal(s.peek(), item);
    });
    await t.test("can peek with nothing in the stack", () => {
      const s = new Stack();
      assert.equal(s.peek(), undefined);
    });
    // const s = new Stack();
    // const item = "xyz";
    // s.push("xyz");
    // assert.equal(s.peek(), item);
  });
  test("can pop", async (t) => {
    await t.test("can pop with an item in the stack", () => {
      const s = new Stack();
      const item = "lmnp";
      s.push(item);
      assert.equal(s.pop(), item);
      assert.deepEqual(s.stack, []);
    });
    await t.test("can pop with nothing in the stack", () => {
      const s = new Stack();
      assert.equal(s.pop(), undefined);
      assert.deepEqual(s.stack, []);
    });
  });
});

suite("Stack max capacity", () => {
  let s;
  beforeEach(() => {
    s = new Stack();
    Array.from({ length: 99 }).forEach((_, i) => s.push(i + 1));
  });

  test("canPush returns true when not full", () => {
    assert.equal(s.canPush(), true);
  });
  test("canPush returns false when full", () => {
    s.push(100);
    assert.equal(s.canPush(), false);
  });
  test("push throws rangeError when full", () => {
    s.push(100);
    assert.throws(() => s.push(101), RangeError);
  });
});

suite.only("Stack push isolation", () => {
  let s;
  beforeEach(() => {
    s = new Stack();
  });
  test("push calls canpush", () => {
    mock.method(s, "canPush");
    assert.equal(s.canPush.mock.calls.length, 0);
    s.push("item");
    assert.equal(s.canPush.mock.calls.length, 1);
  });
  test("push throws range error when mock canPush returns false", () => {
    mock.method(s, "canPush", () => false);
    assert.throws(() => s.push("item"), RangeError);
  });
});
