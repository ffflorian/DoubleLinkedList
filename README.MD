## DoubleLinkedList.js

A linked list in which every element knows about its predecessor and its successor.
```
 ______     ______     ______
| |  | |   | |  | |   | |  | |
| |  | <---> |  | <---> |  | |
|_|__|_|   |_|__|_|   |_|__|_|
  prev        n         next
```

### ES6 usage

```js
'use strict';

import LinkedList from './LinkedList';

const list = new LinkedList();
list.add('one');
list.add('two');
list.add('three');
list.get(0); // 'one'
```

### Setup for Node.js

To use the project in Node.js, first install the npm packages:
```bash
$ npm install
```

Next you'll need to convert it to ES5 (because `import` is [not implemented yet](https://github.com/nodejs/help/issues/53)):
```bash
$ npm run babel
```

Now you could use it like this:
```js
'use strict';

const LinkedList = require('./LinkedList');

const list = new LinkedList();
list.add('one');
list.add('two');
list.add('three');
list.get(0); // 'one'
```

### Testing

If you didn't install the npm packages yet, do it first:
```bash
$ npm install
```

Now run the tests:
```bash
$ npm test
```

Have fun!
