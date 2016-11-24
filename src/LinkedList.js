'use strict';

import ListElement from './ListElement';

export default class LinkedList {
    constructor () {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    getFirstObject (arg) {
        if (typeof arg === 'string') {
            const value = arg;
            let output = null;
            let element = this.head;
            for (let i = 0; i <= this.getSize(); i++) {
                if (element != null) {
                    if (element.getValue() == value) {
                        output = element;
                        break;
                    } else {
                        element = element.getNext();
                    }
                }
            }
            return output;
        } else if (typeof arg === 'number') {
            const index = arg;
            let element = this.head;
            for (let i = 1; i <= index; i++) {
                element = element.getNext();
            }
            return element;
        } else {
            throw new Error('Invalid argument!');
        }
    }

    removeObject (currentElement) {
        if (!(currentElement instanceof ListElement)) {
            throw new Error('Invalid next element!');
        }
        const prevElement = currentElement.getPrev();
        const nextElement = currentElement.getNext();

        prevElement.setNext(nextElement);
        nextElement.setPrev(prevElement);

        currentElement = null;
        this.size--;
    }

    add (...args) {
        if (args.length === 0) {
            throw new Error('No arguments given!');
        }
        if (typeof args[0] === 'number' && typeof args[1] === 'string') {
            const index = args[0];
            const value = args[1];
            if (index < 0 || index >= this.size) {
                throw new Error(`Index ${index} is out of bounds!`);
            }

            let newElement = new ListElement(value);

            if (this.tail == null && this.head == null) {
                this.head = newElement;
                this.tail = newElement;
            } else if ((this.tail == null && this.head != null) || (this.head == null && this.tail != null)) {
                throw new Error(`We've made a terrible mistake! Head: ${this.head}, tail: ${this.tail}`);
            } else {
                let nextElement = this.getFirstObject(index);
                let prevElement = nextElement.getPrev();

                newElement.setPrev(prevElement);
                newElement.setNext(nextElement);
                prevElement.setNext(newElement);
                nextElement.setPrev(newElement);
            }
            this.size++;
            return;
        } else if (typeof args[0] === 'string') {
            const value = args[0];
            let prevElement;
            let newElement = new ListElement(value);

            if (this.tail == null && this.head == null) {
                this.head = newElement;
                this.tail = newElement;
            } else if ((this.tail == null && this.head != null) || (this.head == null && this.tail != null)) {
                throw new Error(`We've made a terrible mistake! Head: ${this.head}, tail: ${this.tail}`);
            } else {
                prevElement = this.tail;
                prevElement.setNext(newElement);
                newElement.setPrev(prevElement);
                this.tail = newElement;
            }
            this.size++;
            return;
        } else {
            throw new Error('Invalid argument!');
        }
    }

    contains (value) {
        if (this.getFirstObject(value) !== null) {
            return this.getFirstObject(value).getValue();
        }
        return null;
    }

    get (index) {
        if (index < 0 || index >= this.getSize()) {
            throw new Error(`Index ${index} is out of bounds!`);
        }

        if (this.getFirstObject(index) != null) {
            return this.getFirstObject(index).getValue();
        }
        return null;
    }

    getHead () {
        if (this.head !== null) {
            return this.head.getValue();
        }
        return null;
    }

    getSize () {
        return this.size;
    }

    getTail () {
        if (this.tail !== null) {
            return this.tail.getValue();
        }
        return null;
    }

    indexOf (value) {
        let index = -1;
        let element = this.head;
        for (let i = 0; i <= this.getSize(); i++) {
            if (element != null) {
                if (element.getValue() == value) {
                    index = i;
                    break;
                } else {
                    element = element.getNext();
                }
            }
        }
        return index;
    }

    iterator () {
        return new ListIterator(this);
    }

    remove (arg) {
        if (typeof arg === 'string') {
            const value = arg;
            let element = this.getFirstObject(value);
            if (element !== null) {
                this.removeObject(element);
                return value;
            }
            return null;
        } else if (typeof arg === 'number') {
            const index = arg;
            if (index < 0 || index >= this.getSize()) {
                throw new Error(`Index ${index} is out of bounds!`);
            }
            const value = this.get(index);
            let element = this.getFirstObject(index);
            this.removeObject(element);
            return value;
        } else {
            throw new Error('Invalid argument!');
        }
    }

    toString () {
       let index = this.head;
       let output = "[ ";
       let seperator = ", ";

       while (index !== null) {
           if (index.getNext() === null) {
               seperator = "";
           }
           output += index.getValue() + seperator;
           index = index.getNext();
       }
       return output + " ]";
    }
}

class ListIterator {
    constructor () {
        this.currentElement = currentList.head;
    }

    hasNext () {
        return currentElement != null;
    }

    next () {
        if (hasNext()) {
            const value = currentElement.getValue();
            this.currentElement = currentElement.getNext();
            return value;
        }
        return null;
    }
}
