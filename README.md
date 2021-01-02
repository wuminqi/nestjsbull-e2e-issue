#README

### How to reproduce the issue

- run `npm i` to install dependencies.
- Setup your mysql and redis server instances, keep your configuration in .env.test.
- run `npm run test:e2e`, you can see
  - e2e test failed
  - e2e test not quit gracefully
    
If you run `npm run e2e`, things are all fine.

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
