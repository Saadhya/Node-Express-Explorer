import assert from "node:assert";
import { object } from "./obj.js";

assert.notDeepStrictEqual(object, { x: [1, 2, { y: [3, '4'] }] });//pass
assert.deepStrictEqual(object, { x: [1, 2, { y: [3, '4'] }] });//fail
assert.deepStrictEqual(object, { x: [1, 2, { y: [3, 4] }] });//pass
