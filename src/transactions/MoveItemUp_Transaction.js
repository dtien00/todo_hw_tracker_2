'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class MoveItemUp_Transaction extends jsTPS_Transaction {
    constructor(initModel, index) {
        super();
        this.model = initModel;
        this.formerIndex = index;
    }

    doTransaction() {
        this.model.moveItemUp(this.formerIndex);
    }

    undoTransaction() {
        this.model.moveItemDown(this.formerIndex-1);
    }
}