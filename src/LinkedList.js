'use strict';

/**
 * A double-linked list.
 *
 * Date: 2016-11-18
 * @author Florian Keller <github@floriankeller.de>
 */

import ListElement from './ListElement';

export default class LinkedList {
    /**
     * The constructor. Sets the head and the tail
     *  to null since they don't exist yet.
     * Also sets the size to 0 because the
     *  list doesn't contain any elements yet.
     * @constructor
     */
    constructor () {
        /**
         * The current head (first element).
         *  _______    _______
         * |*|**|*|   | |  | |
         * |*|**|*<---> |  | |
         * |_|__|_|   |_|__|_|
         *   head       next
         */
        this.head = null;

        /**
         * The current tail (last element).
         *  _______    _______
         * | |  | |   |*|**|*|
         * | |  | <--->*|**|*|
         * |_|__|_|   |_|__|_|
         *   prev       tail
         */
        this.tail = null;

        /**
         * The size of the list.
         */
        this.size = 0;
    }

    /**
     * Returns a ListElement at a certain position.
     * @param {index} The position to find the element at.
     * @return {ListElement} The found object.
     */
    getElementAtIndex (index) {
        if (typeof index !== 'number') {
            throw new Error('Invalid argument!');
        }
        let element = this.head;
        for (let i = 1; i <= index; i++) {
            element = element.getNext();
        }
        return element;
    }

    /**
     * Returns a ListElement with a certain value.
     * @param {value} The value to find in the list.
     * @return {ListElement} The first found ListElement.
               null otherwise.
     */
    getFirstElement (value) {
        let output = null;
        let element = this.head;
        for (let i = 0; i <= this.getSize(); i++) {
            if (element != null) {
                if (element.getValue() === value) {
                    output = element;
                    break;
                } else {
                    element = element.getNext();
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
     * @param {ListElement} currentElement The element to remove.
     */
    removeElement (currentElement) {
        if (!(currentElement instanceof ListElement)) {
            throw new Error('Invalid next element!');
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
        // Set the old element to null so the garbage collector
        //  can remove it.
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
     * @param {Object} args The value which the element should contain.
     * And possibly the index where the element should be inserted.
     * @throws IllegalArgumentException if the value is null.
     * @throws NullPointerException if both head and tail are null.
     */
    add (...args) {
        if (args.length === 0) {
            throw new Error('No arguments given!');
        }
        if (typeof args[0] === 'number' && (args[1] !== null && typeof args[1] !== 'undefined')) {
            const index = args[0];
            const value = args[1];
            if (index < 0 || index >= this.getSize()) {
                throw new Error(`Index ${index} is out of bounds!`);
            }

            const newElement = new ListElement(value);

            if (this.tail == null && this.head == null) {
                // Set head and tail both to be the new element
                //  because they don't exist yet and thus
                //  the new element is both head and tail (empty list).
                this.head = newElement;
                this.tail = newElement;
                this.size++;
            } else if ((this.tail == null && this.head != null) || (this.head == null && this.tail != null)) {
                // Something went wrong and they are not both null.
                throw new Error(`We've made a terrible mistake! Head: ${this.head}, tail: ${this.tail}`);
            } else {
                // nextElement points to the object behind
                //  which the new element should be added.
                let nextElement = this.getElementAtIndex(index);
                // prevElement points to the position
                // behind which the new element should be added.
                let prevElement = nextElement.getPrev();

                // Insert the new element between prev and next.
                newElement.setPrev(prevElement);
                newElement.setNext(nextElement);
                if (prevElement != null) {
                    prevElement.setNext(newElement);
                } else {
                    // if there is no previous element we have a new head
                    this.head = newElement;
                }
                nextElement.setPrev(newElement);
                this.size++;
            }
            return;
        } else if (typeof args[0] === 'string') {
            const value = args[0];
            const newElement = new ListElement(value);
            let prevElement;

            if (this.tail == null && this.head == null) {
                // Set head and tail both to be the new element
                //  because they don't exist yet and thus
                //  the new element is both head and tail.
                this.head = newElement;
                this.tail = newElement;
                this.size++;
            } else if ((this.tail == null && this.head != null) || (this.head == null && this.tail != null)) {
                throw new Error(`We've made a terrible mistake! Head: ${this.head}, tail: ${this.tail}`);
            } else {
                // Insert the new element at the end of the list.
                prevElement = this.tail;
                prevElement.setNext(newElement);
                newElement.setPrev(prevElement);
                this.tail = newElement;
                this.size++;
            }
            return;
        } else {
            throw new Error('Invalid argument!');
        }
    }

    /**
     * Searches the list for an element with a certain value.
     * @param {Object} value The value to search for.
     * @return {Object} The first found element's value. <code>null</code> otherwise.
     */
    contains (value) {
        if (value === null || typeof value === 'undefined') {
            throw new Error('Invalid argument!');
        }
        const firstElement = this.getFirstElement(value);
        if (firstElement !== null) {
            return firstElement.getValue();
        }
        return null;
    }

    /**
     * Returns the value of an element at a certain position.
     * @param {Integer} index The position to look at.
     * @return {Object} The found value. Null otherwise.
     * @throws IndexOutOfBoundsException if the passed index
     *         is not within the bounds of the list.
     */
    get (index) {
        if (typeof index !== 'number') {
            throw new Error('Invalid index type!');
        }

        if (index < 0 || index >= this.getSize()) {
            throw new Error(`Index ${index} is out of bounds!`);
        }

        const elementAtIndex = this.getElementAtIndex(index);
        if (elementAtIndex != null) {
            return elementAtIndex.getValue();
        }
        return null;
    }

    /**
     * Returns the current head's value (first element) of the list
     * @return {Object} The head's value (first element) of the list
     */
    getHead () {
        if (this.head !== null) {
            return this.head.getValue();
        }
        return null;
    }

    /**
     * Returns the list's size.
     * @return {Integer} The list's size.
     */
    getSize () {
        return this.size;
    }

    /**
     * Returns the current tail's value (last element) of the list
     * @return {Object} The tail's value (last element) of the list
     */
    getTail () {
        if (this.tail !== null) {
            return this.tail.getValue();
        }
        return null;
    }

    /**
     * Returns the index of the first found element with a certain value.
     * @param {Object} value The value to search for.
     * @return {Integer} The position of the found element. -1 otherwise.
     */
    indexOf (value) {
        if (value === null || typeof value === 'undefined') {
            throw new Error('Invalid argument!');
        }
        let index = -1;
        let element = this.head;
        for (let i = 0; i <= this.getSize(); i++) {
            if (element != null) {
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
     * @return {ListIterator} The new generator as iterator.
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
            yield currentElement.getValue();
        }
    }

    /**
     * Removes an element at a certain position from the list.
     * @param index The position to look at or the value to find.
     * @return The removed element's value. null otherwise.
     * @throws IndexOutOfBoundsException if the passed index
     *         is not within the bounds of the list.
     */
    remove (arg) {
        if (typeof arg === 'string') {
            const value = arg;
            const element = this.getFirstElement(value);
            if (element !== null) {
                this.removeElement(element);
                return value;
            }
            return null;
        } else if (typeof arg === 'number') {
            const index = arg;
            if (index < 0 || index >= this.getSize()) {
                throw new Error(`Index ${index} is out of bounds!`);
            }
            let element = this.getElementAtIndex(index);
            if (element !== null) {
                this.removeElement(element);
                return element.getValue();
            }
            return null;
        } else {
            throw new Error('Invalid argument!');
        }
    }

    /**
     * Returns the whole list as a readable string, enclosed by brackets.
     * @return {String} The whole list enclosed by brackets.
     */
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

    /**
     * Returns the whole list as a detailed string, enclosed by brackets.
     * @return The whole list enclosed by brackets.
     */
    toDetailedString () {
        let index = this.head;
        let output = "[ ";
        let seperator = ", ";

        while (index !== null) {
           if (index.getNext() === null) {
               seperator = "";
           }
           output += `${index.getPrev()}<-*${index.getValue()}*->${index.getNext()}${seperator}`;
           index = index.getNext();
        }
        return `${output} ]`;
    }
}
