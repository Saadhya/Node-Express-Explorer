# to run the test file
node --test

# throw new Error()
- will fail the test

# type of filenames can be used to create test files
**/*.test.js
**/*-test.js
**/*_test.js
**/test-*.js
**/test.?js
**/test/**/*.js

which results while runing **node --test**:-
✔ any_test.js (273.6553ms)
✔ test-any.js (217.0581ms)
✔ test.js (180.1994ms)
✔ test\any.js (163.6234ms)
✔ test\any.test.js (157.3234ms)

coz any-test.js can have some issue
it can be run by explicitly calling its name like:-
- node --test any-test.js

# assertions:
It tests:
actual value == expected
is correct data type?
does it match another value?
is it within an acceptable range?

# good assertion using -ve number
- use node keyword to switch to node-env in terminal and run
- -5 %2 
- It will return -1
- And .exit makes it exit
- TO RUN SPECIFIC TEST FILE:- node --test obj.test.js

# tests and grouping into one suite
- test('', ()=>{})
- suite("Suite instantiation", ()=>{})
- suite.only()= to mark only this test-suite
- cmd for running only suite= node --test-only .\stack.test.js
- test.skip("can push", () => {})= to skip this test()
- test.todo("can pop", () => {})= to make it todo()
- node --test-only --test = to run the current file

# --test
- it means to run all test files

# to run only methods suite in cmd
- node --test-name-pattern="methods" stack.test.js

# to run only test in cmd
- node --test-name-pattern="push" stack.test.js/--test
- node --test-name-pattern="/ee/" stack.test.js/--test

# to skip the suite
- node --test-skip-pattern="methods" stack.test.js
- node --test-skip-pattern="instantiate" stack.test.js

# isolate what you are testing
- mock.method(s, "canPush");

# produce reports
- node --test --test-reporter=spec 
- node --test --test-reporter=tap 
- node --test --test-reporter=junit stack.test.js
- node --test --test-reporter=dot
- node --test --test-reporter=lcov --experimental-test-coverage  stack.test.js

