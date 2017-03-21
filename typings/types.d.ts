/**
 * A list element. By default the head and the tail are set to `null` since they don't exist yet.
 * @class ListElement
 * @param {*} value - The value to set.
 * @returns {void}
 */
export declare class ListElement {
   /**
    * A list element. By default the head and the tail are set to `null` since they don't exist yet.
    * @class ListElement
    * @param {*} value - The value to set.
    * @returns {void}
    */
   constructor(value: any);

   /**
    * The previous element.
    *  _______    _______
    * |*|**|*|   | |  | |
    * |*|**|*<---- |  | |
    * |_|__|_|   |_|__|_|
    * previous   current
    * @type {*}
    */
   prev: any;

   /**
    * The next element.
    *  _______    _______
    * | |  | |   |*|**|*|
    * | |  | ---->*|**|*|
    * |_|__|_|   |_|__|_|
    * current      next
    * @type {*}
    */
   next: any;

   /**
    * The value which the element should contain.
    * @type {*}
    */
   value: any;

   /**
    * Returns the next element.
    * @returns {ListElement} - The next element. `null` otherwise.
    */
   getNext(): ListElement;

   /**
    * Returns the previous element.
    * @returns {ListElement} - The previous element. `null` otherwise.
    */
   getPrev(): ListElement;

   /**
    * Returns the value.
    * @returns {*} - The value.
    */
   getValue(): any;

   /**
    * Sets the next element.
    * @param {!ListElement} next - The element to set.
    * @returns {void}
    * @throws {TypeError} - When `next` is not a ListElement
    */
   setNext(next: ListElement): void;

   /**
    * Sets the previous element.
    * @param {ListElement} prev - The element to set.
    * @returns {void}
    * @throws {TypeError} - When `prev` is `null` or `undefined`
    */
   setPrev(prev: ListElement): void;

   /**
    * Sets the value.
    * @param {*} value - The value to set.
    * @returns {void}
    * @throws {TypeError} - When `value` is `null` or `undefined`
    */
   setValue(value: any): void;

   /**
    * Returns the value readable and enclosed by array-like brackets.
    * @returns {string} - The value with array-like brackets.
    */
   toString(): string;

}

/**
 * The linked list. By default the head and the tail are set to `null` since they don't exist yet.
 * Also the size is set to 0 because the list doesn't contain any elements yet.
 * @class LinkedList
 * @returns {void}
 */
export declare class LinkedList {
   /**
    * The linked list. By default the head and the tail are set to `null` since they don't exist yet.
    * Also the size is set to 0 because the list doesn't contain any elements yet.
    * @class LinkedList
    * @returns {void}
    */
   constructor();

   /**
    * The current head (first element).
    *  _______    _______
    * |*|**|*|   | |  | |
    * |*|**|*<---> |  | |
    * |_|__|_|   |_|__|_|
    *   head       next
    * @type {*}
    */
   head: any;

   /**
    * The current tail (last element).
    *  _______    _______
    * | |  | |   |*|**|*|
    * | |  | <--->*|**|*|
    * |_|__|_|   |_|__|_|
    *   prev       tail
    * @type {*}
    */
   tail: any;

   /**
    * The size of the list.
    * @type {number}
    */
   size: number;

   /**
    * Returns a ListElement at a certain position.
    * @param {!number} index - The position to find the element at.
    * @returns {ListElement} - The found object.
    * @throws {TypeError} - When `index` is not a number
    */
   getElementAtIndex(index: number): ListElement;

   /**
    * Returns a ListElement with a certain value.
    * @param {*} value - The value to find in the list.
    * @returns {ListElement} - The first found ListElement. `null` otherwise.
    */
   getFirstElement(value: any): ListElement;

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
   removeElement(currentElement: ListElement): void;

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
   add(args: (number|any)): void;

   /**
    * Searches the list for an element with a certain value.
    * @param {*} value - The value to search for.
    * @returns {*} - The first found element's value. `null` otherwise.
    */
   contains(value: any): any;

   /**
    * Returns the value of an element at a certain position.
    * @param {!number} index - The position to look at.
    * @returns {*} - The found value. `null` otherwise.
    * @throws {Error} - If the passed index is not within the bounds of the list.
    * @throws {TypeError} - If the index is `null`.
    * @returns {void}
    */
   get(index: number): any;

   /**
    * Returns the current head's value (first element) of the list
    * @returns {*} - The head's value (first element) of the list
    */
   getHead(): any;

   /**
    * Returns the list's size.
    * @returns {number} - The list's size.
    */
   getSize(): number;

   /**
    * Returns the current tail's value (last element) of the list
    * @returns {*} - The tail's value (last element) of the list
    */
   getTail(): any;

   /**
    * Returns the index of the first found element with a certain value.
    * @param {*} value - The value to search for.
    * @returns {number} - The position of the found element. -1 otherwise.
    * @throws {TypeError} - If the value is `null` or `undefined`.
    */
   indexOf(value: any): number;

   /**
    * An iterator for the double-linked list with the
    * help of generators.
    * @returns {ListIterator} - The new generator as iterator.
    */
   iterator(): ListIterator;

   /**
    * Removes an element at a certain position from the list.
    * @param {!(string|number)} arg - The position to look at or the value to find.
    * @returns {*} - The removed element's value. `null` otherwise.
    * @throws {Error} - If the passed index is not within the bounds of the list.
    * @throws {TypeError} - If the argument is not a `string` or a `number`.
    */
   remove(arg: (string|number)): any;

   /**
    * Returns the whole list as a readable string, enclosed by brackets.
    * @returns {string} - The whole list enclosed by brackets.
    */
   toString(): string;

   /**
    * Returns the whole list as a detailed string, enclosed by brackets.
    * @returns {string} - The whole list enclosed by brackets.
    */
   toDetailedString(): string;

}

