'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class RemoveItem_Transaction extends jsTPS_Transaction {
    constructor(initModel, item, index) {
        super();
        this.model = initModel;
        this.removedItem = item;
        this.itemIndex = index;
    }

    doTransaction() {
        this.model.removeItem(this.itemIndex);
    }

    undoTransaction() {
        this.model.addRemovedItem(this.removedItem, this.itemIndex);
    }
}