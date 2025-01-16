import assert from "node:assert";
import { password } from "./pw.js";

// more complex assertions
assert.match(password, /[a-z]/, 'password must contain at least one lowercase letter')
assert.match(password, /[A-Z]/, 'password must contain at least one uppercase letter')
assert.match(password, /[0-9]/, 'password must contain at least one number')
// assert.match(password, /[!@#$%^&*(),.?":{}|<>]/, 'password must contain at least one special character')
assert.match(password, /^.{8,}$/, 'password must be at least 8 characters long')
// /^.{8,}$/.test(password)
assert.doesNotMatch(password, /^[0-9a-z]+$/i, 'password must have atleast one special character')
