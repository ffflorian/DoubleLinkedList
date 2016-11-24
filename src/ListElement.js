'use strict';

export default class ListElement {
    constructor (value) {
        if (value === null || typeof value === 'undefined') {
            throw new Error('Invalid value!');
        }
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
            throw new Error('Invalid next element!');
        }
        this.next = next;
    }

    setPrev (prev) {
        if (!(prev instanceof ListElement)) {
            throw new Error('Invalid previous element!');
        }
        this.prev = prev;
    }

    setValue (value) {
        if (value === null || typeof value === 'undefined') {
            throw new Error('Invalid value!');
        }
        this.value = value;
    }

    toString () {
        return "[ " + this.getValue() + " ]";
    }
}
