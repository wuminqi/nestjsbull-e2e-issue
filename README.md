#README

### How to reproduce the issue

- run `npm i` to install dependencies.
- Setup your mysql and redis server instances, keep your configuration in .env.test.
- run `npm run test:e2e`, you can see
  - e2e test failed
  - e2e test not quit gracefully
  
```
> nestjsbull-e2e-issue@0.0.1 test:e2e /Users/minqi/workspace/2070/_github/nestjsbull-e2e-issue
> jest --config ./test/jest-e2e.json

[Nest] 93790   - 01/02/2021, 4:11:40 PM   [ExceptionHandler] Cannot execute operation on "default" connection because connection is not yet established.
[Nest] 93790   - 01/02/2021, 4:11:40 PM   [ExceptionHandler] Cannot execute operation on "default" connection because connection is not yet established. +50ms
 FAIL  test/app.e2e-spec.ts
  AppController (e2e)
    ✓ / (GET) (422 ms)
    ✕ /issues (GET) (41 ms)

  ● AppController (e2e) › /issues (GET)

    Connection is closed.

      at close (../node_modules/ioredis/built/redis/event_handler.js:179:25)
      at Socket.<anonymous> (../node_modules/ioredis/built/redis/event_handler.js:146:20)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   0 total
Time:        3.117 s, estimated 4 s
Ran all test suites.
Jest did not exit one second after the test run has completed.

This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.

```
    
If you run `npm run e2e`, things are all fine.

```
> jest --runInBand --detectOpenHandles --forceExit --config ./test/jest-e2e.json 

 PASS  test/app.e2e-spec.ts
  AppController (e2e)
    ✓ / (GET) (692 ms)
    ✓ /issues (GET) (141 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        4.202 s, estimated 5 s
Ran all test suites.

```

### Besides

Edit ./node_modules/.bin/jest 

```javascript
#!/usr/bin/env node
/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/////=> start
const log = require('why-is-node-running') // should be your first require

setInterval(function () {
  console.log('WILL PRINT ACTIVE HANDLES');
  log() // logs out active handles that are keeping node running
}, 3000)
/////=> end

const importLocal = require('import-local');

if (!importLocal(__filename)) {
  require('jest-cli/bin/jest');
}
```

Run `npm run test:e2e` again, you can see what is not exit.
