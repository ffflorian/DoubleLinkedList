## DoubleLinkedList [![Greenkeeper badge](https://badges.greenkeeper.io/ffflorian/DoubleLinkedList.js.svg)](https://greenkeeper.io/) ![build status](https://api.travis-ci.org/ffflorian/DoubleLinkedList.js.svg?branch=master)

A linked list in which every element knows about its predecessor and its successor.
```
 ______     ______     ______
| |  | |   | |  | |   | |  | |
| |  | <---> |  | <---> |  | |
|_|__|_|   |_|__|_|   |_|__|_|
  prev        n         next
```

### Usage

```ts
import {LinkedList} from '@ffflorian/doublelinkedlist';

const list = new LinkedList();
list.add('one');
list.add('two');
list.add('three');
list.get(0); // 'one'
```

### Testing

First, install the npm packages for testing:
```
$ yarn
```

Now run the tests:
```
$ yarn test
```
