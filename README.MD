## DoubleLinkedList.js

A linked list in which every element knows about its predecessor and its successor.
```
 ______     ______     ______
| |  | |   | |  | |   | |  | |
| |  | <---> |  | <---> |  | |
|_|__|_|   |_|__|_|   |_|__|_|
  prev        n         next
```

### Setup

To use the project in Node.js, first install the npm packages:
```bash
$ npm install
```

To use this project in Node.js, you need to convert it to ES5 first:
(because `import` is [not implemented yet](https://github.com/nodejs/help/issues/53).)
```bash
$ npm run babel
```

Now you could use it like this:
```js
'use strict';

import LinkedList from './LinkedList';

const linkedList = new LinkedList();
linkedList.add('zero');
linkedList.add('one');
linkedList.add('two');
linkedList.add('three');
```

You can also run a few tests:
```bash
$ npm test
```

Have fun!
