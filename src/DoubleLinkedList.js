'use strict';


/**
 * A single element in a double-linked list.
 *
 * Date: 2016-11-18
 * @author Florian Keller <github@floriankeller.de>
 */

/**
 * A list element. By default the head and the tail are set to `null` since they don't exist yet.
 * @class ListElement
 * @param {*} value - The value to set.
 * @returns {void}
 */
class ListElement {
    constructor (value) {
        if (value === null || typeof value === 'undefined') {
            throw new TypeError('Invalid value!');
        }

        /**
         * The previous element.
         *  _______    _______
         * |*|**|*|   | |  | |
         * |*|**|*<---- |  | |
         * |_|__|_|   |_|__|_|
         * previous   current
         * @type {*}
         */
        this.prev = null;

        /**
         * The next element.
         *  _______    _______
         * | |  | |   |*|**|*|
         * | |  | ---->*|**|*|
         * |_|__|_|   |_|__|_|
         * current      next
         * @type {*}
         */
        this.next = null;

        /**
         * The value which the element should contain.
         * @type {*}
         */
        this.value = value;
    }

    /**
     * Returns the next element.
     * @returns {ListElement} - The next element. `null` otherwise.
     */
    getNext () {
        return this.next;
    }

    /**
     * Returns the previous element.
     * @returns {ListElement} - The previous element. `null` otherwise.
     */
    getPrev () {
        return this.prev;
    }

    /**
     * Returns the value.
     * @returns {*} - The value.
     */
    getValue () {
        return this.value;
    }

    /**
     * Sets the next element.
     * @param {!ListElement} next - The element to set.
     * @returns {void}
     * @throws {TypeError} - When `next` is not a ListElement
     */
    setNext (next) {
        if (!(next instanceof ListElement)) {
            throw new TypeError('Invalid next element!');
        }
        this.next = next;
    }

    /**
     * Sets the previous element.
     * @param {ListElement} prev - The element to set.
     * @returns {void}
     * @throws {TypeError} - When `prev` is `null` or `undefined`
     */
    setPrev (prev) {
        if (!(prev instanceof ListElement)) {
            throw new TypeError('Invalid previous element!');
        }
        this.prev = prev;
    }

    /**
     * Sets the value.
     * @param {*} value - The value to set.
     * @returns {void}
     * @throws {TypeError} - When `value` is `null` or `undefined`
     */
    setValue (value) {
        if (value === null || typeof value === 'undefined') {
            throw new TypeError('Invalid value!');
        }
        this.value = value;
    }

    /**
     * Returns the value readable and enclosed by array-like brackets.
     * @returns {string} - The value with array-like brackets.
     */
    toString () {
        return `[ ${this.getValue()} ]`;
    }
}

/**
 * The linked list. By default the head and the tail are set to `null` since they don't exist yet.
 * Also the size is set to 0 because the list doesn't contain any elements yet.
 * @class LinkedList
 * @returns {void}
 */
class LinkedList {
    constructor () {
        /**
         * The current head (first element).
         *  _______    _______
         * |*|**|*|   | |  | |
         * |*|**|*<---> |  | |
         * |_|__|_|   |_|__|_|
         *   head       next
         * @type {*}
         */
        this.head = null;

        /**
         * The current tail (last element).
         *  _______    _______
         * | |  | |   |*|**|*|
         * | |  | <--->*|**|*|
         * |_|__|_|   |_|__|_|
         *   prev       tail
         * @type {*}
         */
        this.tail = null;

        /**
         * The size of the list.
         * @type {number}
         */
        this.size = 0;
    }

    /**
     * Returns a ListElement at a certain position.
     * @param {!number} index - The position to find the element at.
     * @returns {ListElement} - The found object.
     * @throws {TypeError} - When `index` is not a number
     */
    getElementAtIndex (index) {
        if (typeof index !== 'number') {
            throw new TypeError('Invalid argument!');
        }
        let element = this.head;
        for (let i = 1; i <= index; i++) {
            element = (element !== null ? element.getNext() : null);
        }
        return element;
    }

    /**
     * Returns a ListElement with a certain value.
     * @param {*} value - The value to find in the list.
     * @returns {ListElement} - The first found ListElement. `null` otherwise.
     */
    getFirstElement (value) {
        let output = null;
        let element = this.head;
        for (let i = 0; i <= this.getSize(); i++) {
            if (element !== null) {
                if (element.getValue() === value) {
                    output = element;
                    break;
                } else {
                    element = (element !== null ? element.getNext() : null);
                }
            }
        }
        return output;
    }

    /**
     * Removes a certain ListElement from the list by
     *  connecting the elements before and after the
     *  old element.
     *  _______    _______    _______
     * |*|**|*|   | |  | |   |*|**|*|
     * |*|**|*<-------------->*|**|*|
     * |_|__|_|   |_|__|_|   |_|__|_|
     *   prev     current      next
     * @param {!ListElement} currentElement - The element to remove.
     * @throws {TypeError} - When `currentElement` is not a ListElement
     */
    removeElement (currentElement) {
        if (!(currentElement instanceof ListElement)) {
            throw new TypeError('Invalid next element!');
        }
        const prevElement = currentElement.getPrev();
        const nextElement = currentElement.getNext();

        if (prevElement !== null) {
            prevElement.setNext(nextElement);
        } else {
            this.head = nextElement;
        }
        if (nextElement !== null) {
            nextElement.setPrev(prevElement);
        } else {
            this.tail = prevElement;
        }
        // Set the old element to null so the garbage collector can remove it.
        currentElement = null;
        this.size--;
    }

    /**
     * Adds an element to the end of the list by inserting
     *  the new element at the end of the list.
     *  _______    _______    _______
     * | |  | |   | |  | |   |*|**|*|
     * | |  | <---> |  | <--->*|**|*|
     * |_|__|_|   |_|__|_|   |_|__|_|
     *    n         tail       new
     * @param {...(number|*)} args - The value which the element should contain.
     * And possibly the index where the element should be inserted.
     * @throws {TypeError} - If the value is null.
     * @throws {Error} - If both head and tail are null.
     * @returns {void}
     */
    add (...args) {
        if (args.length === 0) {
            throw new TypeError('No arguments given!');
        }
        if (typeof args[0] === 'number' && (args[1] !== null && typeof args[1] !== 'undefined')) {
            const index = args[0];
            const value = args[1];
            if (index < 0 || index >= this.getSize()) {
                throw new Error(`Index ${index} is out of bounds!`);
            }

            const newElement = new ListElement(value);

            if (this.tail === null && this.head === null) {
                // Set head and tail both to be the new element
                //  because they don't exist yet and thus
                //  the new element is both head and tail (empty list).
                this.head = newElement;
                this.tail = newElement;
                this.size++;
            } else if ((this.tail === null && this.head !== null) || (this.head === null && this.tail !== null)) {
                // Something went wrong and they are not both null.
                throw new Error(`We\'ve made a terrible mistake! Head: ${(this.head !== null ? this.head.toString() : 'null')} , tail: ${(this.tail !== null ? this.tail.toString() : 'null')}`);
            } else {
                // nextElement points to the object behind
                //  which the new element should be added.
                let nextElement = this.getElementAtIndex(index);
                // prevElement points to the position
                // behind which the new element should be added.
                let prevElement = (nextElement !== null ? nextElement.getPrev() : null);

                // Insert the new element between prev and next.
                newElement.setPrev(prevElement);
                newElement.setNext(nextElement);
                if (prevElement !== null) {
                    prevElement.setNext(newElement);
                } else {
                    // if there is no previous element we have a new head
                    this.head = newElement;
                }
                if (nextElement !== null) {
                    nextElement.setPrev(newElement);
                }
                this.size++;
            }
            return;
        } else if (typeof args[0] === 'string') {
            const value = args[0];
            const newElement = new ListElement(value);
            let prevElement;

            if (this.tail === null && this.head === null) {
                // Set head and tail both to be the new element
                //  because they don't exist yet and thus
                //  the new element is both head and tail.
                this.head = newElement;
                this.tail = newElement;
                this.size++;
            } else if ((this.tail === null && this.head !== null) || (this.head === null && this.tail !== null)) {
                throw new Error(`We\'ve made a terrible mistake! Head: ${(this.head !== null ? this.head.toString() : 'null')} , tail: ${(this.tail !== null ? this.tail.toString() : 'null')}`);
            } else {
                // Insert the new element at the end of the list.
                prevElement = this.tail;
                if (prevElement !== null) {
                    prevElement.setNext(newElement);
                }
                newElement.setPrev(prevElement);
                this.tail = newElement;
                this.size++;
            }
            return;
        } else {
            throw new TypeError('Invalid argument!');
        }
    }

    /**
     * Searches the list for an element with a certain value.
     * @param {*} value - The value to search for.
     * @returns {*} - The first found element's value. `null` otherwise.
     */
    contains (value) {
        if (value === null || typeof value === 'undefined') {
            throw new TypeError('Invalid argument!');
        }
        const firstElement = this.getFirstElement(value);
        if (firstElement !== null) {
            return firstElement.getValue();
        }
        return null;
    }

    /**
     * Returns the value of an element at a certain position.
     * @param {!number} index - The position to look at.
     * @returns {*} - The found value. `null` otherwise.
     * @throws {Error} - If the passed index is not within the bounds of the list.
     * @throws {TypeError} - If the index is `null`.
     * @returns {void}
     */
    get (index) {
        if (typeof index !== 'number') {
            throw new TypeError('Invalid index type!');
        }

        if (index < 0 || index >= this.getSize()) {
            throw new Error(`Index ${index} is out of bounds!`);
        }

        const elementAtIndex = this.getElementAtIndex(index);
        if (elementAtIndex !== null) {
            return elementAtIndex.getValue();
        }
        return null;
    }

    /**
     * Returns the current head's value (first element) of the list
     * @returns {*} - The head's value (first element) of the list
     */
    getHead () {
        if (this.head !== null) {
            return this.head.getValue();
        }
        return null;
    }

    /**
     * Returns the list's size.
     * @returns {number} - The list's size.
     */
    getSize () {
        return this.size;
    }

    /**
     * Returns the current tail's value (last element) of the list
     * @returns {*} - The tail's value (last element) of the list
     */
    getTail () {
        if (this.tail !== null) {
            return this.tail.getValue();
        }
        return null;
    }

    /**
     * Returns the index of the first found element with a certain value.
     * @param {*} value - The value to search for.
     * @returns {number} - The position of the found element. -1 otherwise.
     * @throws {TypeError} - If the value is `null` or `undefined`.
     */
    indexOf (value) {
        if (value === null || typeof value === 'undefined') {
            throw new TypeError('Invalid argument!');
        }
        let index = -1;
        let element = this.head;
        for (let i = 0; i <= this.getSize(); i++) {
            if (element !== null) {
                if (element.getValue() === value) {
                    index = i;
                    break;
                } else {
                    element = element.getNext();
                }
            }
        }
        return index;
    }

    /**
     * An iterator for the double-linked list with the
     * help of generators.
     * @returns {ListIterator} - The new generator as iterator.
     */
    * iterator () {
        let currentElement = this.head;
        let atHead = true;
        // needs to check if currentElement is null
        // otherwise we get a NullPointerException if
        // we iterate over an empty list.
        while (currentElement !== null && currentElement.getNext() !== null) {
            if (atHead === true) {
                atHead = false;
            } else {
                currentElement = currentElement.getNext();
            }
            yield (currentElement !== null ? currentElement.getValue() : null);
        }
    }

    /**
     * Removes an element at a certain position from the list.
     * @param {!(string|number)} arg - The position to look at or the value to find.
     * @returns {*} - The removed element's value. `null` otherwise.
     * @throws {Error} - If the passed index is not within the bounds of the list.
     * @throws {TypeError} - If the argument is not a `string` or a `number`.
     */
    remove (arg) {
        if (typeof arg === 'string') {
            const value = arg;
            const element = this.getFirstElement(value);
            if (element !== null) {
                const val = element.getValue();
                this.removeElement(element);
                return val;
            }
            return null;
        } else if (typeof arg === 'number') {
            const index = arg;
            if (index < 0 || index >= this.getSize()) {
                throw new Error(`Index ${index} is out of bounds!`);
            }
            let element = this.getElementAtIndex(index);
            const value = (element !== null ? element.getValue() : '');
            this.removeElement(element);
            return value;
        } else {
            throw new TypeError('Invalid argument!');
        }
    }

    /**
     * Returns the whole list as a readable string, enclosed by brackets.
     * @returns {string} - The whole list enclosed by brackets.
     */
    toString () {
        let index = this.head;
        let output = '[ ';
        let seperator = ', ';

        while (index !== null) {
            if (index.getNext() === null) {
                seperator = '';
            }
            output += index.getValue() + seperator;
            index = index.getNext();
        }
        return `${output} ]`;
    }

    /**
     * Returns the whole list as a detailed string, enclosed by brackets.
     * @returns {string} - The whole list enclosed by brackets.
     */
    toDetailedString () {
        let index = this.head;
        let output = '[ ';
        let seperator = ', ';

        while (index !== null) {
            if (index.getNext() === null) {
                seperator = '';
            }
            output += (index.getPrev() || 'null').toString()
                   + '<-*'
                   + (index.getValue() || 'null').toString()
                   + '*->' +
                   + (index.getNext() || 'null').toString()
                   + seperator;
            index = index.getNext();
        }
        return `${output} ]`;
    }
}

module.exports = { ListElement, LinkedList };
