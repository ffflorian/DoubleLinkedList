## DoubleLinkedList.js

A linked list in which every element knows about its predecessor and its successor.
```
 ______     ______     ______
| |  | |   | |  | |   | |  | |
| |  | <---> |  | <---> |  | |
|_|__|_|   |_|__|_|   |_|__|_|
  prev        n         next
```

### Usage

To use the project in Node.js:
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

First, install the npm packages for testing:
```bash
$ npm install
```

Now run the tests:
```bash
$ npm test
```

Have fun!
