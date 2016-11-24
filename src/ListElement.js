'use strict';

/**
 * A single element in a double-linked list.
 *
 * Date: 2016-11-18
 * @author Florian Keller <github@floriankeller.de>
 */

export default class ListElement {

    /**
     * The constructor. Sets the head and the tail
     *  to null since they are not known yet.
     * @constructor
     * @param {Object} value The value to set.
     */
    constructor (value) {
        if (value === null || typeof value === 'undefined') {
            throw new Error('Invalid value!');
        }

        /**
         * The previous element.
         *  _______    _______
         * |*|**|*|   | |  | |
         * |*|**|*<---- |  | |
         * |_|__|_|   |_|__|_|
         * previous   current
         */
        this.prev = null;

        /**
         * The next element.
         *  _______    _______
         * | |  | |   |*|**|*|
         * | |  | ---->*|**|*|
         * |_|__|_|   |_|__|_|
         * current      next
         */
        this.next = null;

        /**
         * The value which the element should contain.
         */
        this.value = value;
    }

    /**
     * Returns the next element.
     * @return {ListElement} The next element. null otherwise.
     */
    getNext () {
        return this.next;
    }

    /**
     * Returns the previous element.
     * @return {ListElement} The previous element. null otherwise.
     */
    getPrev () {
        return this.prev;
    }

    /**
     * Returns the value.
     * @return {Object} The value.
     */
    getValue () {
        return this.value;
    }

    /**
     * Sets the next element.
     * @param {ListElement} next The element to set.
     */
    setNext (next) {
        if (!(next instanceof ListElement)) {
            throw new Error('Invalid next element!');
        }
        this.next = next;
    }

    /**
     * Sets the previous element.
     * @param {ListElement} prev The element to set.
     */
    setPrev (prev) {
        if (!(prev instanceof ListElement)) {
            throw new Error('Invalid previous element!');
        }
        this.prev = prev;
    }

    /**
     * Sets the value.
     * @param {Object} value The value to set.
     */
    setValue (value) {
        if (value === null || typeof value === 'undefined') {
            throw new Error('Invalid value!');
        }
        this.value = value;
    }

    /**
     * Returns the value readable and enclosed by array-like brackets.
     * @return The value with array-like brackets.
     */
    toString () {
        return `[ ${this.getValue()} ]`;
    }
}
