'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class StatusChange_Transaction extends jsTPS_Transaction {
    constructor(initModel, formerStatus, newStatus, index) {
        super();
        this.model = initModel;
        this.formerStatus = formerStatus;
        this.newStatus = newStatus;
        this.listIndex = index;
    }

    doTransaction() {
        this.model.changeStatus(this.newStatus, this.listIndex);
    }

    undoTransaction() {
        this.model.changeStatus(this.formerStatus, this.listIndex);
    }
}