'use strict';

export default class ListElement {
    constructor (value) {
        this.prev = null;
        this.next = null;
        this.value = value;
    }

    getNext () {
        return this.next;
    }

    getPrev () {
        return this.prev;
    }

    getValue () {
        return this.value;
    }

    setNext (next) {
        if (!(next instanceof ListElement)) {
            throw 'Invalid next element!';
        }
        this.next = next;
    }

    setPrev (prev) {
        if (!(prev instanceof ListElement)) {
            throw 'Invalid next element!';
        }
        this.prev = prev;
    }

    setValue (value) {
        if (!(prev instanceof ListElement)) {
            throw 'Invalid next element!';
        }
        this.value = value;
    }

    toString () {
        return "[ " + this.getValue() + " ]";
    }
}
