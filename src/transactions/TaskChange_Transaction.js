'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class TaskChange_Transaction extends jsTPS_Transaction {
    constructor(initModel, oldTask, newTask, index) {
        super();
        this.model = initModel;
        this.oldTask = oldTask;
        this.newTask = newTask;
        this.itemID = index;
        console.log("Transaction made: \n" + "oldTask: " + this.oldTask + "\n newTask:" + this.newTask + "\n itemID: " + this.itemID);
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.model.changeTask(this.newTask, this.itemID);
    }

    undoTransaction() {
        this.model.changeTask(this.oldTask, this.itemID);
    }
}