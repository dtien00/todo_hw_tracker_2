'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeDate_Transaction extends jsTPS_Transaction {
    constructor(initModel, formerDate, newDate, index) {
        super();
        this.model = initModel;
        this.previousDate = formerDate;
        this.newDate = newDate;
        this.itemID = index;
    }

    doTransaction() {
        this.model.changeDate(this.newDate, this.itemID);
    }

    undoTransaction() {
        this.model.changeDate(this.previousDate, this.itemID);
    }
}